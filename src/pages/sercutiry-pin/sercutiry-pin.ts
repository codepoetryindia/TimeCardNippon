import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  App
} from "ionic-angular";
import { appService } from "../../app/app.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SecurityPinService } from "./security-pin.service";
import { PasswordService } from "../password/password.service";
import { Storage } from "@ionic/storage";
import CryptoJS from "crypto-js";
import { loginService } from "../login/login.service";
/**
 * Generated class for the SercutiryPinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-sercutiry-pin",
  templateUrl: "sercutiry-pin.html"
})
export class SercutiryPinPage {
  ConfirmPIN = false;
  CreatePIN = false;
  ShowForgotPINScreen_bool = false;

  UserTempData: any;

  ResetPINScreen = false;

  ConfirmPINForm: FormGroup;
  CreatePINForm: FormGroup;
  OTPForm: FormGroup;

  Obj: any = {
    Username: "",
    Password: ""
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _appService: appService,
    private _menu: MenuController,
    private _service: SecurityPinService,
    public formBuilder: FormBuilder,
    public lService: loginService,
    public storage: Storage,
    private _appCtrl: App
  ) {
    this.ConfirmPINForm = formBuilder.group({
      PIN: ["", Validators.required]
    });

    this.CreatePINForm = formBuilder.group(
      {
        PIN: ["", Validators.required],
        ReEnteredPIN: ["", Validators.required]
      },
      { validator: this.checkIfMatchingPasswords("PIN", "ReEnteredPIN") }
    );

    this.OTPForm = formBuilder.group({
      OTP: ["", Validators.required]
    });
  }

  checkIfMatchingPasswords(
    passwordKey: string,
    passwordConfirmationKey: string
  ) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  ionViewWillEnter() {
    console.log("ionViewDidLoad SercutiryPinPage");

    this._menu.close();
    this._menu.enable(false, "sideMenu");

    this._appService.dismissLoader();
    console.log(this._appService.getArray());
    this.UserTempData = this._appService.getArray();
    this._appService.dismissLoader();
    console.log(this._appService.getObj());

    this.storage.get("UserDetail").then(UserDetail => {
      console.log(UserDetail);

      //if (UserDetail && UserDetail.Mobile_IsFirstLogin == true) {
      console.log(this._appService.IsLoggedInTriggered);
      if (this._appService.IsLoggedInTriggered) {
        this.CreatePIN = true;
      } else {
        this.ConfirmPIN = true;
      }
      //}
      // else{
      //   this.CreatePIN = true;
      // }
    });
  }

  CreateEnteredPin(form) {
    this._appService.presentLoading();
    this._appCtrl.getRootNav().popToRoot();
    this._appCtrl.getRootNav().setRoot("HomePage");
    if (form.value.PIN != form.value.ReEnteredPIN) {
      this._appService.dismissLoader();
      this._appService.presentBottomToast("PIN does not match");
      return false;
    }

    let Obj = {
      id: this.UserTempData.EMP_CODE,
      PIN: CryptoJS.SHA1(form.value.PIN).toString(),
      Password: this._appService.getObj()
        ? this._appService.getObj().Password
        : null
    };
    console.log(Obj);

    this._service.CreatePIN(Obj).then(
      success => {
        console.log(success);
        this.storage.set("UserDetail", success);
        this._appCtrl.getRootNav().setRoot("HomePage");
      },
      error => {
        console.log(error);
        this._appService.dismissLoader();
      }
    );
  }

  ConfirmEnteredPin(form) {
    this._appService.presentLoading();

    this.storage.get("UserDetail").then(UserDetail => {
      console.log(UserDetail);
      let Obj = {
        id: UserDetail.EMP_CODE,
        PIN: CryptoJS.SHA1(form.value.PIN).toString()
      };

      console.log(Obj);
      this._service.ConfirmEnteredPin(Obj).then(
        success => {
          console.log(success);
          if (success != null) {
            //this.storage.set('UserDetail', success);
            this._appCtrl.getRootNav().popToRoot();
            this._appCtrl.getRootNav().setRoot("HomePage");
          } else {
            this._appService.dismissLoader();
            this._appService.presentBottomToast("PIN is incorrect");
          }
        },
        error => {
          console.log(error);
          this._appService.dismissLoader();
        }
      );
    });
  }

  ShowForgotPINScreen() {
    this._appService
      .showConfirm(
        "Are you sure?",
        "An OTP will be send to the registered mobile number."
      )
      .then(
        success => {
          if (success) {
            this._appService.presentLoading();
            this.storage.get("UserDetail").then(success => {
              let Obj = {
                EmpCode: success.EMP_CODE,
                OTP: null,
                Password: null
              };

              this.lService.Validate_Username_OTP(Obj).then(
                success => {
                  console.log(success);
                  this._appService.dismissLoader();
                  if (success.indexOf("Error") == -1) {
                    this.ConfirmPIN = false;
                    this.CreatePIN = false;
                    this.ShowForgotPINScreen_bool = true;
                  } else {
                    this._appService.presentBottomToast(
                      "Could not send OTP try again later."
                    );
                  }
                },
                error => {
                  console.log(error);
                }
              );
            });
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  ValidateOTP(form) {
    this._appService.presentLoading();
    this.storage.get("UserDetail").then(
      success => {
        let Obj = {
          EmpCode: success.EMP_CODE,
          OTP: form.value.OTP,
          Password: null
        };

        this.lService.Validate_Username_OTP(Obj).then(
          success => {
            this._appService.dismissLoader();
            if (success.indexOf("Success") == -1) {
              this._appService.presentBottomToast("Incorrect OTP");
            } else {
              this.ResetPINScreen = true;
              this.ShowForgotPINScreen_bool = false;
              this.ConfirmPIN = false;
              this.CreatePIN = false;
            }
          },
          error => {
            this._appService.dismissLoader();
            console.log(error);
          }
        );
      },
      error => {}
    );
  }

  ResetPIN(form) {
    console.log(form);
    this._appService.presentLoading();

    this.storage.get("UserDetail").then(UserDetail => {
      console.log(UserDetail);
      let Obj = {
        id: UserDetail.EMP_CODE,
        PIN: CryptoJS.SHA1(form.value.PIN).toString(),
        Password: null
      };

      console.log("LOL1", Obj);
      this._service.CreatePIN(Obj).then(
        success => {
          if (success != null) {
            // this.storage.set('UserDetail', success);
            this._appCtrl.getRootNav().popToRoot();
            this._appCtrl.getRootNav().setRoot("HomePage");
          } else {
            this._appService.dismissLoader();
          }
        },
        error => {
          console.log(error);
          this._appService.dismissLoader();
        }
      );
    });
  }

  BackToPIN() {
    this._appCtrl.getRootNav().setRoot("SercutiryPinPage");
  }
}
