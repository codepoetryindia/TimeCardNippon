import { Injectable } from "@angular/core";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController
} from "ionic-angular";

import { Http } from "@angular/http";
import "rxjs";

@Injectable()
export class appService {
  IsNoNWorkingDay: boolean = false;
  loader: any;
  constructor(
    private _http: Http,
    private toastCtrl: ToastController,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {}
  //url: string = "https://justlogin.nipponpaint-groupar.com/api/";
  url: string = "http://1.22.119.232:2550/api/";
  //Local : URL :http://localhost:7410/api/
  //Test Server : URL : http://1.22.119.232:2550/api/
  //Production server : http://43.231.250.182:8929/JustLogin/api/
  //New Production server : "https://justlogin.nipponpaint-groupar.com/api/"
  latitude;
  longitude;
  LocationImageURL = "assets/imgs/LocationImage.png";
  Arry?: any;
  Obj?: any;
  IsLoggedInTriggered: any;
  presentLoading() {
    this.loader = this.loadingController.create({
      content: "Please wait.."
    });

    this.loader.present();
  }

  dismissLoader() {
    //  console.log(this.loader);
    if (this.loader) {
      this.loader.dismiss().catch(() => console.log("view was not dismissed"));
    }
  }

  presentToast(message) {
    // console.log(message);
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: "top"
    });

    toast.onDidDismiss(() => {
      // console.log('Dismissed toast');
    });

    toast.present();
  }
  presentBottomToast(message) {
    // console.log(message);
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: "bottom"
    });

    toast.onDidDismiss(() => {
      // console.log('Dismissed toast');
    });

    toast.present();
  }
  //Normal Alert
  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ["OK"]
    });
    alert.present();
  }
  setWorkingDate(obj: boolean) {
    this.IsNoNWorkingDay = obj;
  }
  //Confirmation alert
  showConfirmWithOutNo(title, message): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: [
          {
            text: "Ok",
            handler: () => {
              console.log("Disagree clicked");
              alert.dismiss().then(() => {
                resolve(true);
              });
              return false;
            }
          }
        ]
      });

      alert.present();
    });
  }

  //Confirmation alert
  showConfirm(title, message): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: [
          {
            text: "Yes",
            handler: () => {
              console.log("Disagree clicked");
              alert.dismiss().then(() => {
                resolve(true);
              });
              return false;
            }
          },
          {
            text: "No",
            handler: () => {
              console.log("Disagree clicked");
              alert.dismiss().then(() => {
                resolve(false);
              });
              return false;
            }
          }
        ]
      });

      alert.present();
    });
  }

  //PRomp alert
  showPrompt(title, message) {
    return new Promise((resolve, reject) => {
      let prompt = this.alertCtrl.create({
        title: title,
        message: message,
        inputs: [
          {
            name: "title",
            placeholder: "Remarks"
          }
        ],
        buttons: [
          {
            text: "Cancel",
            handler: data => {
              prompt.dismiss().then(() => {
                resolve([{ isValid: false, Data: data }]);
              });

              // console.log('Cancel clicked');
              return false;
            }
          },
          {
            text: "Save",
            handler: data => {
              // console.log('Disagree clicked');
              prompt.dismiss().then(() => {
                resolve([{ isValid: true, Data: data }]);
              });
              return true;
            }
          }
        ]
      });
      prompt.present();
    });
  }

  presentModal(ModalPage, data) {
    let modal = this.modalCtrl.create(ModalPage, { obj: data });
    modal.present();
  }
  presentModalWithoutData(ModalPage) {
    let modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }

  setArray(arry) {
    this.Arry = arry;
  }
  getArray() {
    return this.Arry;
  }

  setObj(obj) {
    this.Obj = obj;
  }
  getObj() {
    return this.Obj;
  }
  CheckVersion(version) {
    console.log(version);
    return this._http
      .get(this.url + "Mobile_Login/CheckVersion?version=" + version)
      .map(res => res.json())
      .toPromise();
  }
  CheckVersion_V2(version, device) {
    console.log(version);
    return this._http
      .get(
        this.url +
          "Mobile_Login/CheckVersion?version=" +
          version +
          "&device=" +
          device
      )
      .map(res => res.json())
      .toPromise();
  }
  Saveupdate_UIdAndFcmId(deviceId, FCMID, EMP_CODE) {
    return this._http
      .get(
        this.url +
          "Mobile_Login/Saveupdate_UIdAndFcmId?deviceId=" +
          deviceId +
          "&FCMID=" +
          FCMID +
          "&EMP_CODE=" +
          EMP_CODE
      )
      .map(res => res.json())
      .toPromise();
  }
  MobileLogInfo(message) {
    return this._http
      .post(this.url + "MobileLog/LogInfo?Info=" + message, {})
      .map(res => res.json())
      .toPromise();
  }
  IsVersionCheckEnable() {
    return this._http
      .get(this.url + "Mobile_Login/IsVersionCheckEnable")
      .map(res => res.json())
      .toPromise();
  }
  MobileExceptionLog(exception) {
    return this._http
      .post(this.url + "MobileLog/LogEx", exception, {})
      .map(res => res.json())
      .toPromise();
  }
}
