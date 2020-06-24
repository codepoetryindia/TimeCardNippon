import { Component, ViewChild, ElementRef } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  Platform,
  Events
} from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { appService } from "../../app/app.service";
import { Storage } from "@ionic/storage";
import { HomeMapService } from "./home-map.service";
import { LocationAccuracy } from "@ionic-native/location-accuracy";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage({
  name: "HomeMap"
})
@Component({
  selector: "page-home-map",
  templateUrl: "home-map.html"
})
export class HomeMapPage {
  @ViewChild("map") mapElement: ElementRef;
  map: any;
  usersLocation: any = {};
  markers = [];
  image = {
    url: "assets/imgs/LocationImage.png",
    size: {
      width: 20,
      height: 20
    }
  };

  IsPunchedIn = false;
  IsPunchedOut = false;
  IsInternational = false;
  IsNonWorkingDay = false;
  IsLeave = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private geolocation: Geolocation,
    private menu: MenuController,
    private _storage: Storage,
    private locationAccuracy: LocationAccuracy,
    private service: HomeMapService,
    public appservice: appService,

    public events: Events
  ) {}

  ionViewWillEnter() {
    console.log("ionViewWillEnter HomeMapPage");
    console.log(this.image);

    this.menu.enable(true, "sideMenu");

    this._storage.get("UserDetail").then(
      UserDetail => {
        console.log(UserDetail);
        this.events.publish("functionCall:ionViewWillEnter", UserDetail);

        this.service
          .GetTodayPunchedInDetail(UserDetail.EMP_CODE)
          .then(success => {
            console.log(success);
            this.appservice.dismissLoader();
            if (success && success.IsPunchedIn) {
              this.IsPunchedIn = success.IsPunchedIn;
              this.IsPunchedOut = success.IsPunchedOut;
              this.IsInternational = success.IsInternational;
              this.IsLeave = success.IsLeave;
            }

            this.IsNonWorkingDay = success.IsNonWorking;
            this.IsLeave = success.IsLeave;
            this.appservice.setWorkingDate(this.IsNonWorkingDay);
            let latLng = new google.maps.LatLng(
              this.appservice.latitude,
              this.appservice.longitude
            );
            let mapOptions = {
              center: latLng,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            this.map = new google.maps.Map(
              this.mapElement.nativeElement,
              mapOptions
            );

            google.maps.event.trigger(this.map, "resize");

            this.map.setCenter(latLng);
            this.addMarker(latLng, {
              url: "assets/imgs/LocationImage.png",
              size: {
                width: 20,
                height: 20
              }
            });

            this.loadMap();
            if (this.IsNonWorkingDay) {
              alert("Today is holiday");
            }
          });
      },
      error => {
        console.log(error);
        this.appservice.dismissLoader();
      }
    );

    // this.DoIonicWillEnter(User);
    // this.service.getLocalUserObject().then((sunccess)=>{
    //   console.log(sunccess);
    //   this.DoIonicWillEnter(sunccess);
    // })
  }

  DoIonicWillEnter(UserDetail: any) {
    this.service.GetTodayPunchedInDetail(UserDetail.EMP_CODE).then(success => {
      console.log(success);
      this.appservice.dismissLoader();
      if (success && success.IsPunchedIn) {
        this.IsPunchedIn = success.IsPunchedIn;
        this.IsPunchedOut = success.IsPunchedOut;
        this.IsInternational = success.IsInternational;
        this.IsLeave = success.IsLeave;
      }
      this.IsNonWorkingDay = success.IsNonWorking;
      this.IsLeave = success.IsLeave;
      let latLng = new google.maps.LatLng(
        this.appservice.latitude,
        this.appservice.longitude
      );
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      google.maps.event.trigger(this.map, "resize");

      this.map.setCenter(latLng);
      this.addMarker(latLng, {
        url: "assets/imgs/LocationImage.png",
        size: {
          width: 20,
          height: 20
        }
      });

      this.loadMap();
    });
  }

  loadMap() {
    this.geolocation
      .getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      })
      .then(
        position => {
          console.log("Initial Location | lat ", position.coords.latitude);
          console.log("Initial Location | lang", position.coords.longitude);

          this.appservice.latitude = position.coords.latitude;
          this.appservice.longitude = position.coords.longitude;

          let latLng = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          console.log(latLng);
          let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          this.map = new google.maps.Map(
            this.mapElement.nativeElement,
            mapOptions
          );
          google.maps.event.trigger(this.mapElement.nativeElement, "resize");

          this.map.setCenter(latLng);
        },
        err => {
          console.log(err);
        }
      );

    let watch = this.geolocation.watchPosition({
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    });
    watch.subscribe(data => {
      if (data && data.coords.latitude) {
        this.deleteMarkers();
      }
      let updatelocation = new google.maps.LatLng(
        data.coords.latitude,
        data.coords.longitude
      );

      this.appservice.latitude = data.coords.latitude;
      this.appservice.longitude = data.coords.longitude;

      console.log("new Location | lat ", data.coords.latitude);
      console.log("new Location | lang", data.coords.longitude);

      this.addMarker(updatelocation, this.image);
      this.setMapOnAll(this.map);
    });
  }

  // {
  //   'url': 'assets/imgs/LocationImage.png',
  //   'size': {
  //     width: 20,
  //     height: 20,
  //   }
  // }

  addMarker(location, image) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: ""
    });
    this.markers.push(marker);
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  PunchIn() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      console.log(canRequest);
      if (canRequest) {
        //
        // the accuracy option will be ignored by iOS
        this.locationAccuracy
          .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
          .then(
            () => {
              // alert('Request successful')
              this._storage.set(
                "punchInTime",
                new Date().toLocaleString("en-KR")
              );

              this.appservice.presentLoading();
              this._storage.get("UserDetail").then(UserDetail => {
                console.log(UserDetail);

                let Obj = {
                  Longitude: this.appservice.longitude,
                  Latitude: this.appservice.latitude,
                  EmpCode: UserDetail.EMP_CODE,
                  IsNonWorking: this.IsNonWorkingDay
                };
                this.appservice.MobileExceptionLog(Obj).then(succ1 => {});
                this.service.PunchIn(Obj).then(
                  succ => {
                    this.appservice.MobileLogInfo(succ).then(succ2 => {});
                    if (succ.indexOf("Success") != -1) {
                      this.appservice.presentBottomToast(succ);

                      //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                      this.navCtrl.pop();
                    } else {
                      this.appservice.dismissLoader();
                      this.appservice.presentBottomToast(
                        "could not Punch in ,try again later."
                      );
                    }
                  },
                  err => {
                    console.log(err);
                    this.appservice.MobileExceptionLog(err).then(succ1 => {});
                  }
                );
              });
            },
            error => {
              //   alert('Error requesting location permissions' + JSON.stringify(error))
              this.appservice.MobileExceptionLog(error).then(succ1 => {});
              this.platform.exitApp();
            }
          );
      }
    });
  }

  PunchOut() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      console.log(canRequest);
      this._storage.set("punchInTime", null);
      if (canRequest) {
        //the accuracy option will be ignored by iOS
        this.locationAccuracy
          .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
          .then(
            () => {
              //alert('Request successful')

              this.appservice.presentLoading();
              this._storage.get("UserDetail").then(UserDetail => {
                console.log(UserDetail);

                let Obj = {
                  Longitude: this.appservice.longitude,
                  Latitude: this.appservice.latitude,
                  EmpCode: UserDetail.EMP_CODE,
                  IsNonWorking: this.IsNonWorkingDay
                };
                this.appservice.MobileExceptionLog(Obj).then(succ1 => {});
                this.service.PunchOut(Obj).then(
                  succ => {
                    this.appservice.MobileLogInfo(succ).then(succ2 => {});
                    if (succ.indexOf("Success") != -1) {
                      this.appservice.presentBottomToast(succ);

                      //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                      this.navCtrl.pop();
                    } else {
                      this.appservice.dismissLoader();
                      this.appservice.presentBottomToast(
                        "could not Punch out ,try again later."
                      );
                    }
                  },
                  err => {
                    console.log(err);
                    this.appservice.MobileExceptionLog(err).then(succ1 => {});
                  }
                );
              });
            },
            error => {
              //   alert('Error requesting location permissions' + JSON.stringify(error))
              this.platform.exitApp();
              this.appservice.MobileExceptionLog(error).then(succ1 => {});
            }
          );
      }
    });
  }
}
