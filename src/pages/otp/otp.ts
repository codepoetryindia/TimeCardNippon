import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { appService } from '../../app/app.service';

import { Storage } from '@ionic/storage'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { otpService } from './otp.service';
/**
 * Generated class for the OtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {

  UserTempData: any;

  OTPForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _appCtrl: App,
    private _storage: Storage,
    public formBuilder: FormBuilder,
    private _service: otpService,
    private _appService: appService) {

    this.OTPForm = formBuilder.group({
      OTP: ['', Validators.required]

    });
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad OtpPage');
    this._appService.dismissLoader();
    console.log(this._appService.getArray());
    this.UserTempData = this._appService.getArray();

  }

  ValidateOTP(form) {

    console.log(form);
    this._appService.presentLoading();

    console.log(this.UserTempData);

    // if (this.UserTempData.Mobile_OTP != form.value.OTP) {
    //   this._appService.dismissLoader();
    //   this._appService.presentBottomToast("OTP does not match");
    //   return false;

    // }
    let Obj = {

      OTP: form.value.OTP,
      EmpCode: this.UserTempData.EMP_CODE
    };

    console.log(Obj);
    this._service.AuthenticateOTP(Obj).then((success) => {
      console.log(success);
      this._appService.dismissLoader();
      //if (success != null) {
      if (success == null && (this.UserTempData && this.UserTempData.Mobile_IsFirstLogin == true)) {

        //if (true) {

        this._appCtrl.getRootNav().setRoot('PasswordPage');
        //}
      }
      else {
        if (success != null) {
          this._storage.set('UserDetail', success);
          this._appCtrl.getRootNav().setRoot('SercutiryPinPage');
        }
        else {
          this._appService.presentBottomToast("Invalid OTP");
        }
      }

      // } else {
      //   this._appService.dismissLoader();
      //   this._appService.presentBottomToast("Invalid OTP");
      // }

    }, (error) => {
      console.log(error);
      this._appService.dismissLoader();
    });




  }
}
