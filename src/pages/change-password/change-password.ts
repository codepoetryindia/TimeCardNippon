import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App } from 'ionic-angular';
import { appService } from '../../app/app.service';


import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

import CryptoJS from 'crypto-js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChangePasswordService } from './change-password-service';
/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'ChangePassword'
})
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  myForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation: Geolocation,
    private menu: MenuController,
    private _storage: Storage,
    public formBuilder: FormBuilder,
    private _appCtrl: App,
    private _service: ChangePasswordService,
    public appservice: appService) {


    this.myForm = formBuilder.group({
      CurrentPassword : ['', Validators.required],
      Password: ['', Validators.required],
      RePassword: ['', Validators.required],

    });
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ChangePasswordPage');
    this.appservice.dismissLoader();
  }

  ChangePassword(form) {

    this.appservice.presentLoading();
    this._storage.get('UserDetail').then((UserDetail) => {

      console.log(CryptoJS.SHA1(form.value.CurrentPassword).toString());
      

      if (CryptoJS.SHA1(form.value.CurrentPassword).toString() != (UserDetail.Mobile_Password)) {
        this.appservice.dismissLoader();
        this.appservice.presentBottomToast("Current password is not correct");
        return false;
      }

      if( (UserDetail.Mobile_Password) ==  CryptoJS.SHA1(form.value.Password).toString())
      {
        this.appservice.dismissLoader();
        this.appservice.presentBottomToast("New password can not be same as old");
        return false;
      }
      if (form.value.Password != form.value.RePassword) {
        this.appservice.dismissLoader();
        this.appservice.presentBottomToast("Password mismatch");
        return false;
      }
      var Obj =
        {
          Password: CryptoJS.SHA1(form.value.Password).toString(),
          id: UserDetail.EMP_CODE
        }
      console.log(Obj);
      this._service.ChangePassword(Obj).then((success) => {
        if (success != null) {
          this.appservice.dismissLoader();
          this.appservice.presentBottomToast("Success | Password changed successfully.");
          this._storage.set('UserDetail', success);
          this._appCtrl.getRootNav().setRoot('HomePage');
        } 
        else {
          this.appservice.dismissLoader();
          this.appservice.presentBottomToast("Success | Password could not changed, try again later.");

        }

      }, (error) => {
        console.log(error);
        this.appservice.dismissLoader();
        this.appservice.presentBottomToast("Success | Password could not changed, try again later.");
      });

    });
  };
}
