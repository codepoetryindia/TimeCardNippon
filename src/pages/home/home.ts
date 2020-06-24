import { Component } from "@angular/core";
import {
  Loading,
  IonicPage,
  NavController,
  NavParams,
  App,
  MenuController,
  Platform,
  Events,
  ToastController,
  ActionSheetController,
  LoadingController,
  AlertController
} from "ionic-angular";
import { appService } from "../../app/app.service";
import { Storage } from "@ionic/storage";
import { Http } from "@angular/http";
import { HomeService } from "./home.service";
import { FilePath } from "@ionic-native/file-path";
import { Transfer, TransferObject } from "@ionic-native/transfer";
import { Camera } from "@ionic-native/camera";
import { File } from "@ionic-native/file";
import { Base64 } from "@ionic-native/base64";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Crop } from "@ionic-native/crop";

declare var cordova: any;

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  EmployeeName;
  // @ViewChild('map') mapElement: ElementRef;
  // map: any;
  // usersLocation: any = {};
  // markers = [];
  // image = {
  //   'url': 'assets/imgs/LocationImage.png',
  //   'size': {
  //     width: 20,
  //     height: 20,
  //   }
  // }

  IsPunchedIn = false;
  IsPunchedOut = false;
  IsInternational = false;
  IsNonWorkingDay = false;
  IsLeave = false;

  lastImage: string = null;
  loading: Loading;

  isProfileImage = false;
  profileImage: string = null;
  punchInTime: string = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public service: HomeService,
    public events: Events,
    private menu: MenuController,
    public storage: Storage,
    private app: App,
    public appservice: appService,
    public _storage: Storage,
    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private base64: Base64,
    private sanitizer: DomSanitizer,
    private crop: Crop,
    private alertCtl: AlertController
  ) {}

  ionViewWillEnter() {
    //console.log('ionViewWillEnter HomePage');
    // console.log(this.image);

    this._storage.get("profile_img").then(data => {
      console.log(data);
      if (data) {
        // this.profileImage = this.sanitizer.bypassSecurityTrustResourceUrl(data);
        this.profileImage = data;
        this.isProfileImage = true;
      } else {
        this.isProfileImage = false;
      }
    });

    this._storage.get("punchInTime").then(data => {
      console.log("punchInTime", data);
      if (data) {
        this.punchInTime = data;
      } else {
        this.punchInTime = null;
      }
    });

    this.menu.enable(true, "sideMenu");
    this.appservice.dismissLoader();

    this.events.subscribe("functionCall:ionViewWillEnter", eventData => {
      console.log("coloil", eventData);
      this.EmployeeName = eventData.Emp_First_name;
    });
    this._storage.get("UserDetail").then(
      UserDetail => {
        console.log("487", UserDetail);
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
              // this.IsLeave = true;
            }

            this.IsNonWorkingDay = success.IsNonWorking;
            this.IsLeave = success.IsLeave;
            // this.IsLeave = true;

            //     this.appservice.setWorkingDate(this.IsNonWorkingDay);
            //     let latLng = new google.maps.LatLng(this.appservice.latitude, this.appservice.longitude);
            //     let mapOptions = {
            //       center: latLng,
            //       zcoom: 15,
            //       mapTypeId: google.maps.MapTypeId.ROADMAP,
            //     }

            //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            //     google.maps.event.trigger(this.map, 'resize');

            //     this.map.setCenter(latLng);
            //     this.addMarker(latLng, {
            //       'url': 'assets/imgs/LocationImage.png',
            //       'size': {
            //         width: 20,
            //         height: 20,
            //       }
            //     });

            //     this.loadMap();
            //     if(this.IsNonWorkingDay)
            //     {
            //     alert("Today is holiday");
            //     }
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

  // DoIonicWillEnter(UserDetail:any)
  // {
  //   this.service.GetTodayPunchedInDetail(UserDetail.EMP_CODE).then((success) => {

  //     console.log(success);
  //     this.appservice.dismissLoader();
  //     if (success && success.IsPunchedIn) {
  //       this.IsPunchedIn = success.IsPunchedIn;
  //       this.IsPunchedOut = success.IsPunchedOut;
  //       this.IsInternational = success.IsInternational;
  //       this.IsLeave = success.IsLeave;
  //     }
  //     this.IsNonWorkingDay=success.IsNonWorking;
  //     this.IsLeave = success.IsLeave;
  //     let latLng = new google.maps.LatLng(this.appservice.latitude, this.appservice.longitude);
  //     let mapOptions = {
  //       center: latLng,
  //       zoom: 15,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP,
  //     }

  //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  //     google.maps.event.trigger(this.map, 'resize');

  //     this.map.setCenter(latLng);
  //     this.addMarker(latLng, {
  //       'url': 'assets/imgs/LocationImage.png',
  //       'size': {
  //         width: 20,
  //         height: 20,
  //       }
  //     });

  //     this.loadMap();

  //   });
  // }

  // loadMap() {

  //   this.geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }).then((position) => {

  //     console.log("Initial Location | lat ", position.coords.latitude);
  //     console.log("Initial Location | lang", position.coords.longitude);

  //     this.appservice.latitude = position.coords.latitude;
  //     this.appservice.longitude = position.coords.longitude;

  //     let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //     console.log(latLng);
  //     let mapOptions = {
  //       center: latLng,
  //       zoom: 15,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP,
  //     }

  //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  //     google.maps.event.trigger(this.mapElement.nativeElement, 'resize');

  //     this.map.setCenter(latLng);
  //   }, (err) => {
  //     console.log(err);
  //   });

  //   let watch = this.geolocation.watchPosition({ enableHighAccuracy: true, timeout: 20000, maximumAge: 0 });
  //   watch.subscribe((data) => {

  //     if (data && data.coords.latitude) {
  //       this.deleteMarkers();
  //     }
  //     let updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);

  //     this.appservice.latitude = data.coords.latitude;
  //     this.appservice.longitude = data.coords.longitude;

  //     console.log("new Location | lat ", data.coords.latitude);
  //     console.log("new Location | lang", data.coords.longitude);

  //     this.addMarker(updatelocation, this.image);
  //     this.setMapOnAll(this.map);
  //   });

  // }

  // // {
  // //   'url': 'assets/imgs/LocationImage.png',
  // //   'size': {
  // //     width: 20,
  // //     height: 20,
  // //   }
  // // }

  // addMarker(location, image) {
  //   let marker = new google.maps.Marker({
  //     position: location,
  //     map: this.map,
  //     icon: ''
  //   });
  //   this.markers.push(marker);
  // }

  // setMapOnAll(map) {
  //   for (var i = 0; i < this.markers.length; i++) {
  //     this.markers[i].setMap(map);
  //   }
  // }

  // clearMarkers() {
  //   this.setMapOnAll(null);
  // }

  // deleteMarkers() {
  //   this.clearMarkers();
  //   this.markers = [];
  // }

  // PunchIn() {

  //  this.locationAccuracy.canRequest().then((canRequest: boolean) => {
  //    console.log(canRequest);
  //    if (canRequest) {
  //    //   the accuracy option will be ignored by iOS
  //      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
  //        //  alert('Request successful')

  //         this.appservice.presentLoading();
  //         this._storage.get('UserDetail').then((UserDetail) => {
  //           console.log(UserDetail);

  //           let Obj = {
  //             Longitude: this.appservice.longitude,
  //             Latitude: this.appservice.latitude,
  //             EmpCode: UserDetail.EMP_CODE,
  //             IsNonWorking:this.IsNonWorkingDay
  //           };
  //           this.appservice.MobileExceptionLog(Obj).then((succ1) => {});;
  //           this.service.PunchIn(Obj).then((succ) => {
  //             this.appservice.MobileLogInfo(succ).then((succ2) => {});;
  //             if (succ.indexOf("Success") != -1) {
  //               this.appservice.presentBottomToast(succ);

  //               this.navCtrl.setRoot(this.navCtrl.getActive().component);
  //             } else {
  //               this.appservice.dismissLoader();
  //               this.appservice.presentBottomToast("could not Punch in ,try again later.");
  //             }
  //           }, (err) => {
  //             console.log(err);
  //             this.appservice.MobileExceptionLog(err).then((succ1) => {});;
  //           });

  //         });

  //       }, (error) => {
  //         //   alert('Error requesting location permissions' + JSON.stringify(error))
  //         this.appservice.MobileExceptionLog(error).then((succ1) => {});;
  //         this.platform.exitApp();
  //       });
  // }

  // });
  // }

  // PunchOut() {
  //  this.locationAccuracy.canRequest().then((canRequest: boolean) => {
  //    console.log(canRequest);
  //    if (canRequest) {
  //      //the accuracy option will be ignored by iOS
  //      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
  //          //alert('Request successful')

  //         this.appservice.presentLoading();
  //         this._storage.get('UserDetail').then((UserDetail) => {
  //           console.log(UserDetail);

  //           let Obj = {
  //             Longitude: this.appservice.longitude,
  //             Latitude: this.appservice.latitude,
  //             EmpCode: UserDetail.EMP_CODE,
  //             IsNonWorking:this.IsNonWorkingDay
  //           };
  //           this.appservice.MobileExceptionLog(Obj).then((succ1) => {});
  //           this.service.PunchOut(Obj).then((succ) => {
  //             this.appservice.MobileLogInfo(succ).then((succ2) => {});
  //             if (succ.indexOf("Success") != -1) {
  //               this.appservice.presentBottomToast(succ);

  //               this.navCtrl.setRoot(this.navCtrl.getActive().component);
  //             } else {
  //               this.appservice.dismissLoader();
  //               this.appservice.presentBottomToast("could not Punch in ,try again later.");
  //             }
  //           }, (err) => {
  //             console.log(err);
  //             this.appservice.MobileExceptionLog(err).then((succ1) => {});;
  //           });

  //         });
  //       }, (error) => {
  //         //   alert('Error requesting location permissions' + JSON.stringify(error))
  //         this.platform.exitApp();
  //         this.appservice.MobileExceptionLog(error).then((succ1) => {});;
  //       });
  //    }

  //   });
  // }

  changeProfileImage() {
    /*
     let actionSheet = this.actionSheetCtrl.create({
       title: 'Select Image Source',
       buttons: [
         {
           text: 'Load from Library',
           handler: () => {
             this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
           }
         },
         {
           text: 'Use Camera',
           handler: () => {
             this.takePicture(this.camera.PictureSourceType.CAMERA);
           }
         }
       ]
     });
     actionSheet.present();*/
    let alert = this.alertCtl.create({
      title: "Select Image",
      // message: 'Do you want to buy this book?',
      buttons: [
        {
          text: "Gallery",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: "Camera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        }
      ]
    });
    alert.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      targetWidth: 600,
      targetHeight: 600,
      sourceType: sourceType,
      correctOrientatin: false,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false
    };

    // Get the data of an image
    this.camera.getPicture(options).then(
      imagePath => {
        // Special handling for Android library
        if (
          this.platform.is("android") &&
          sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
        ) {
          this.filePath.resolveNativePath(imagePath).then(filePath => {
            console.log(filePath);
            let correctPath = filePath.substr(0, filePath.lastIndexOf("/") + 1);
            let currentName = imagePath.substring(
              imagePath.lastIndexOf("/") + 1,
              imagePath.lastIndexOf("?")
            );
            this.copyFileToLocalDir(
              correctPath,
              currentName,
              this.createFileName()
            );
            // console.log('path', correctPath);
            // console.log('path', currentName);
            this.crop.crop(filePath, { quality: 85 }).then(
              newImage => {
                this.profileImage = newImage;
                this.isProfileImage = true;
                this._storage.set("profile_img", newImage);
              },
              error => console.error("Error cropping image", error)
            );
          });
        } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
          this.copyFileToLocalDir(
            correctPath,
            currentName,
            this.createFileName()
          );
          // console.log('path', correctPath);
          // console.log('path', currentName);
          // this._storage.set('profile_img', this.pathForImage(this.createFileName()))

          this.crop.crop(imagePath, { quality: 85 }).then(
            newImage => {
              this.profileImage = newImage;
              this.isProfileImage = true;
              this._storage.set("profile_img", newImage);
            },
            error => console.error("Error cropping image", error)
          );
        }
      },
      err => {
        // this.presentToast("Error while selecting image.");
      }
    );
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file
      .copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
      .then(
        success => {
          this.lastImage = newFileName;
        },
        error => {
          this.presentToast("Error while storing file.");
        }
      );
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    // console.log(img);
    if (img === null) {
      return "";
    } else {
      let image_file_path = cordova.file.dataDirectory + img;
      return image_file_path;
    }
  }

  public uploadImage() {
    // Destination URL
    var url = "http://yoururl/upload.php";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { fileName: filename }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: "Uploading..."
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(
      data => {
        this.loading.dismissAll();
        this.presentToast("Image succesful uploaded.");
      },
      err => {
        this.loading.dismissAll();
        this.presentToast("Error while uploading file.");
      }
    );
  }
  MyReports() {
    this.appservice.presentLoading();
    this.storage.get("UserDetail").then(UserDetail => {
      let obj = {
        EmpCode: UserDetail.EMP_CODE,
        EmpName: ""
        // ShowMenu: true
      };

      // this.app.getRootNav().popToRoot();
      this.navCtrl.push("PunchInOutDetail", obj);
    });
  }

  NavigateToGuideLine() {
    this.appservice.presentLoading();

    this.navCtrl.push("Guideline");
  }

  NavigateToMonthlyReport() {
    this.appservice.presentLoading();
    // this.app.getRootNav().popToRoot();

    this.storage.get("UserDetail").then(UserDetail => {
      let obj = {
        EmpCode: UserDetail.EMP_CODE,
        ShowMenu: true
      };
      this.navCtrl.push("PunchInOutSummary", obj);
    });
  }
  NavigateToDailyReport() {
    this.appservice.presentLoading();
    // this.app.getRootNav().popToRoot();
    this.navCtrl.push("dailyReport");
  }

  NavigateToInternationalPunchPage() {
    this.appservice.presentLoading();
    this.navCtrl.push("internationalPunch");
  }
  NavigateToLeavePage() {
    this.appservice.presentLoading();
    this.navCtrl.push("LeavePunch");
  }

  NavigateToHomemapPage() {
    this.appservice.presentLoading();
    this.navCtrl.push("HomeMap");
  }
}
