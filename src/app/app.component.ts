import { Component, ViewChild } from "@angular/core";
import {
  Platform,
  Nav,
  LoadingController,
  App,
  MenuController,
  AlertController,
  Events
} from "ionic-angular";

import { Geolocation } from "@ionic-native/geolocation";
import { Storage } from "@ionic/storage";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { appService } from "./app.service";
import { Diagnostic } from "@ionic-native/diagnostic";
import { LocationAccuracy } from "@ionic-native/location-accuracy";
import { FCM } from "@ionic-native/fcm";
import { Network } from "@ionic-native/network";
import { Device } from "@ionic-native/device";

import { SercutiryPinPage } from "../pages/sercutiry-pin/sercutiry-pin";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  EmployeeName;
  pages: Array<{ title: string; component: any }>;

  constructor(
    public platform: Platform,
    private fcm: FCM,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private appservice: appService,
    private geolocation: Geolocation,
    public storage: Storage,
    private menu: MenuController,
    private app: App,
    private locationAccuracy: LocationAccuracy,
    private alertCtrl: AlertController,
    public events: Events,
    public network: Network,
    private device: Device
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // //window.open('https://play.google.com/store/apps/details?id=io.ionic.starter742018&hl=en', '_system');
      // this.listenConnection();

      // this function will trigger when app is resumed from background
      // this.ResumeFunction();

      //  this.GetNotification();

      this.appservice.CheckVersion_V2("2.0.9", this.device.platform).then(
        versionCheck => {
          // this.appservice.CheckVersion_V2("2.0.9","Android").then((versionCheck) => {
          this.appservice.IsVersionCheckEnable().then(
            IsEnable => {
              if (IsEnable == 1) {
                //   //this.appservice.CheckVersion("2.0.1").then((versionCheck) => {
                console.log(versionCheck);
                if (versionCheck == 1) {
                  //uncomment this code before developing APK
                  // this.checkIfLocationServiceIsOn();

                  //comment this code before developing APK

                  this.storage.get("UserDetail").then(UserDetail => {
                    console.log(UserDetail);
                    if (UserDetail) {
                      // this.rootPage = 'SercutiryPinPage';

                      this.fcm.getToken().then(token => {
                        //alert(token);
                        this.appservice
                          .Saveupdate_UIdAndFcmId(
                            this.device.uuid,
                            token,
                            UserDetail.EMP_CODE
                          )
                          .then(result => {});
                      });
                    } else {
                      this.appservice.IsLoggedInTriggered = true;
                      console.log(this.appservice.IsLoggedInTriggered);
                      this.rootPage = "LoginPage";
                    }
                  });
                } else {
                  this.showConfirm();
                }
              } else {
                //uncomment this code before developing APK
                // this.checkIfLocationServiceIsOn();

                //comment this code before developing APK

                this.storage.get("UserDetail").then(UserDetail => {
                  console.log(UserDetail);
                  if (UserDetail) {
                    this.rootPage = "SercutiryPinPage";

                    this.fcm.getToken().then(token => {
                      //alert(token);
                      this.appservice
                        .Saveupdate_UIdAndFcmId(
                          this.device.uuid,
                          token,
                          UserDetail.EMP_CODE
                        )
                        .then(result => {});
                    });
                  } else {
                    this.appservice.IsLoggedInTriggered = true;
                    console.log(this.appservice.IsLoggedInTriggered);
                    this.rootPage = "LoginPage";
                    // this.rootPage = 'SercutiryPinPage';
                  }
                });
              }
            },
            error => {
              //uncomment this code before developing APK
              //  this.checkIfLocationServiceIsOn();

              //comment this code before developing APK

              this.storage.get("UserDetail").then(UserDetail => {
                console.log(UserDetail);
                if (UserDetail) {
                  this.rootPage = "SercutiryPinPage";

                  this.fcm.getToken().then(token => {
                    //alert(token);
                    this.appservice
                      .Saveupdate_UIdAndFcmId(
                        this.device.uuid,
                        token,
                        UserDetail.EMP_CODE
                      )
                      .then(result => {});
                  });
                } else {
                  this.appservice.IsLoggedInTriggered = true;
                  console.log(this.appservice.IsLoggedInTriggered);
                  this.rootPage = "LoginPage";
                }
              });
            }
          );
        },
        error => {
          console.log(error);
        }
      );

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.geolocation
        .getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0
        })
        .then(resp => {
          this.appservice.latitude = resp.coords.latitude;
          this.appservice.longitude = resp.coords.longitude;
        })
        .catch(error => {
          console.log(error);
        });
    });

    this.events.subscribe("functionCall:ionViewWillEnter", eventData => {
      console.log(eventData);
      this.EmployeeName = eventData.Emp_First_name;
    });
  }

  private listenConnection(): void {
    this.network.onchange().subscribe(data => {
      console.log(data);
      console.log(this.network.type);
      if (this.network.type == "none") {
        this.appservice
          .showConfirmWithOutNo("Error", "No internet connectivity")
          .then(res => {
            if (res) {
              this.platform.exitApp();
            }
          });
      }
    });

    //    this.platform.exitApp();

    // this.network.onConnect().subscribe(data => {
    //   console.log(data)
    // }, error => console.error(error));
  }

  logout() {
    //clear any cached data
    this.appservice
      .showConfirm("Are you sure?", "You want to sign out?")
      .then(res => {
        if (res) {
          this.appservice.setArray(null);
          this.storage.remove("UserDetail");
          this.menu.close();
          this.menu.enable(false, "sideMenu");
          this.app.getRootNav().setRoot("LoginPage");
        }
      });
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: "New version available",
      message: "Please, Update app to new version to continue reposting.",
      buttons: [
        {
          text: "Exit",
          handler: () => {
            this.platform.exitApp();
          }
        },
        {
          text: "Update",
          handler: () => {
            window.open(
              "https://play.google.com/store/apps/details?id=io.ionic.starter742018&hl=en",
              "_system"
            );
            this.platform.exitApp();
          }
        }
      ]
    });
    confirm.present();
  }

  NavigateToMonthlyReport() {
    this.appservice.presentLoading();
    this.app.getRootNav().popToRoot();

    this.storage.get("UserDetail").then(UserDetail => {
      let obj = {
        EmpCode: UserDetail.EMP_CODE,
        ShowMenu: true
      };
      this.app.getRootNav().setRoot("PunchInOutSummary", obj);
    });
  }
  NavigateToDailyReport() {
    this.appservice.presentLoading();
    this.app.getRootNav().popToRoot();
    this.app.getRootNav().setRoot("dailyReport");
  }

  NavigateToHomePage() {
    console.log("inside home nav");
    this.appservice.presentLoading();
    this.app.getRootNav().popToRoot();
    this.app.getRootNav().setRoot("HomePage");
  }

  NavigateToDashboard() {
    this.appservice.presentLoading();
    this.app.getRootNav().popToRoot();
    this.app.getRootNav().setRoot("Dashboard");
  }
  // NavigateToGuideLine() {
  //   this.appservice.presentLoading();
  //   // this.app.getRootNav().popToRoot();
  //   // this.app.getRootNav().setRoot('Guideline');
  //   // this.navCtrl.push('Guideline');
  // }
  MyReports() {
    this.appservice.presentLoading();
    this.storage.get("UserDetail").then(UserDetail => {
      let obj = {
        EmpCode: UserDetail.EMP_CODE,
        EmpName: "",
        ShowMenu: true
      };

      this.app.getRootNav().popToRoot();
      this.app.getRootNav().setRoot("PunchInOutDetail", obj);
    });
  }

  NavigateToChangePasswordScreen() {
    this.appservice.presentLoading();
    this.app.getRootNav().popToRoot();
    this.app.getRootNav().setRoot("ChangePassword");
  }
  NavigateToChangePinScreen() {
    this.appservice.presentLoading();
    this.app.getRootNav().popToRoot();
    this.app.getRootNav().setRoot("ChangePin");
  }

  ResumeFunction() {
    this.platform.resume.subscribe(e => {
      //  console.trace("resume called");
      this.locationAccuracy
        .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
        .then(
          () => {
            //  alert('Request successful')
          },
          error => {
            //   alert('Error requesting location permissions' + JSON.stringify(error))
            this.platform.exitApp();
          }
        );
    });
  }

  checkIfLocationServiceIsOn() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      console.log(canRequest);
      if (canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy
          .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
          .then(
            () => {
              //  alert('Request successful')
              // this.storage.get('UserDetail').then((UserDetail) => {
              //   console.log(UserDetail);
              //   if (UserDetail) {
              //     //    this.storage.remove('UserDetail');
              //     this.storage.get('IsRemoveOlddata').then((Detail) => {
              //       if (Detail) {
              //         this.rootPage = 'SercutiryPinPage';
              //       }
              //       else {
              //         this.appservice.IsLoggedInTriggered = true;
              //         console.log(this.appservice.IsLoggedInTriggered)
              //         this.rootPage = 'LoginPage';
              //         this.storage.set('IsRemoveOlddata', "Yes");
              //       }
              //     });
              //   }
              //   else {
              //     this.appservice.IsLoggedInTriggered = true;
              //     console.log(this.appservice.IsLoggedInTriggered)
              //     this.rootPage = 'LoginPage';
              //   }
              //});
            },
            error => {
              //   alert('Error requesting location permissions' + JSON.stringify(error))
              this.platform.exitApp();
            }
          );
      }
    });
  }

  GetNotification() {
    //Notifications
    this.fcm.subscribeToTopic("all");
    this.fcm.getToken().then(token => {
      console.log(token);
    });
    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      }
    });
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
      this.storage.get("UserDetail").then(UserDetail => {
        console.log(UserDetail);
        if (UserDetail) {
          this.appservice
            .Saveupdate_UIdAndFcmId(this.device.uuid, FCM, UserDetail.EMP_CODE)
            .then(result => {});
        }
      });
    });
    //end notifications.
  }
  getFCM() {
    this.fcm.getToken().then(token => {
      return token;
    });
  }
}
