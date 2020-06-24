import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App } from 'ionic-angular';
import { appService } from '../../app/app.service';
import { loginService } from './login.service';
import CryptoJS from 'crypto-js';
import { Storage } from '@ionic/storage'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  myForm: FormGroup;
  ForgotPasswordForm: FormGroup;
  OTPForm: FormGroup;
  ChangePasswordForm: FormGroup;
  EmpCode;

  ForgotPasswordScreen = false;
  LoginScreen = false;

  ChangePasswordScreen = false;
  ConfirmOTP = false;

  Obj: any = {
    Username: '',
    Password: ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _appService: appService,
    private _service: loginService,
    private _appCtrl: App,
    public formBuilder: FormBuilder,
    private _storage: Storage,
    private _menu: MenuController) {

    this.myForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],

    });

    this.ForgotPasswordForm = formBuilder.group({
      username: ['', Validators.required]

    });

    this.OTPForm = formBuilder.group({
      OTP: ['', Validators.required]

    });

    this.ChangePasswordForm = formBuilder.group({
      NewPassworrd: ['', Validators.required],
      ConfirmPassword: ['', Validators.required]

    });
  }


  login(form) {
    this._appService.presentLoading();
    console.log(form);
    var Obj =
    {
      Password: CryptoJS.SHA1(form.value.password).toString(),
      id: form.value.username
    }
    console.log(Obj);
    this._service.AuthenticateLogin(Obj).then((isLoggedIn) => {
      console.log(isLoggedIn);
      if (isLoggedIn) {
        this._appService.setArray(isLoggedIn);
        this._appCtrl.getRootNav().setRoot('OtpPage');
        // this._appCtrl.getRootNav().setRoot('SercutiryPinPage');

      }
      else {
        this._appService.dismissLoader();
        this._appService.showAlert('Error', 'Username/Password is incorrect');
      }

    }, (error) => {
      console.log(error);
      this._appService.dismissLoader();
    });

  }

  ionViewWillEnter() {

    console.log('ionViewWillEnter Login');

    this._menu.close();
    this._menu.enable(false, 'sideMenu');

    this.ForgotPasswordScreen = false;
    this.LoginScreen = true;


    this._storage.set('UserDetail', null);

  };

  ValidateUsername_ForgotPasssword(form) {
    console.log(form);
    this._appService.presentLoading();

    let Obj = {
      EmpCode: form.value.username,
      OTP: null,
      Password: null
    }

    this._service.Validate_Username_OTP(Obj).then((success) => {
      this._appService.dismissLoader();
      if (success.indexOf("Success") == -1) {

        this._appService.presentBottomToast("Incorrect username");
      } else {

        this.EmpCode = form.value.username;
        this.ForgotPasswordScreen = false;
        this.LoginScreen = false;

        this.ChangePasswordScreen = false;
        this.ConfirmOTP = true;
      }

    }, (error) => {
      this._appService.dismissLoader();
      console.log(error);
    });
  };

  ValidateOTP(form) {
    console.log(this.EmpCode)
    this._appService.presentLoading();
    let Obj = {
      EmpCode: this.EmpCode,
      OTP: form.value.OTP,
      Password: null
    }
    this._service.Validate_Username_OTP(Obj).then((success) => {
      this._appService.dismissLoader();
      if (success.indexOf("Success") == -1) {

        this._appService.presentBottomToast("Incorrect OTP");
      } else {

        this.ForgotPasswordScreen = false;
        this.LoginScreen = false;

        this.ChangePasswordScreen = true;
        this.ConfirmOTP = false;
      }

    }, (error) => {
      this._appService.dismissLoader();
      console.log(error);
    });


  };
  ChangePassword(form) {

    this._appService.presentLoading();

    if (form.value.NewPassworrd != form.value.ConfirmPassword) {
      this._appService.dismissLoader();
      this._appService.presentBottomToast("Password mismatch");
      return false;
    }

    let Obj = {
      id: this.EmpCode,
      Password: CryptoJS.SHA1(form.value.NewPassworrd).toString(),
      PIN: null
    }
    this._service.ChangePassword(Obj).then((success) => {
      this._appService.dismissLoader();
      if (success.Mobile_Password != null) {

        // this.ForgotPasswordScreen = false;
        // this.LoginScreen = true;

        // this.ChangePasswordScreen = false;
        // this.ConfirmOTP = false;

        this._appService.presentBottomToast("Success : Password has been changed successfully");


        this._appCtrl.getRootNav().setRoot('LoginPage');
      }

    }, (error) => {
      this._appService.dismissLoader();
      console.log(error);
    });

  };

  ResetScreen() {
    this._appCtrl.getRootNav().setRoot('LoginPage');
  }
}
