import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App } from 'ionic-angular';
import { appService } from '../../app/app.service';


import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

import CryptoJS from 'crypto-js';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ChangePinService } from './change-Pin.service';
/**
 * Generated class for the ChangePinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name : 'ChangePin'
})
@Component({
  selector: 'page-change-pin',
  templateUrl: 'change-pin.html',
})
export class ChangePinPage {


  myForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation: Geolocation,
    private menu: MenuController,
    private _storage: Storage,
    public formBuilder: FormBuilder,
    private _appCtrl : App ,
    private _service : ChangePinService ,
    public appservice: appService) {

    this.myForm = formBuilder.group({
      CurrentPIN :  ['', Validators.required],
      PIN: ['', Validators.required],
      ReEnteredPIN: ['', Validators.required],

    });
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ChangePinPage');
    this.appservice.dismissLoader();

  }


  ChangePin(form) {
    console.log(form);
    this.appservice.presentLoading();
    this._storage.get('UserDetail').then((UserDetail) => {

      if( CryptoJS.SHA1(form.value.CurrentPIN).toString() !=  (UserDetail.Mobile_PIN))
      {
        this.appservice.dismissLoader();
        this.appservice.presentBottomToast("Current PIN is not correct");
        return false;
      }

      if((UserDetail.Mobile_PIN) ==  CryptoJS.SHA1(form.value.PIN).toString())
      {
        this.appservice.dismissLoader();
        this.appservice.presentBottomToast("New PIN can not be same as old PIN");
        return false;
      }

      if(form.value.PIN != form.value.ReEnteredPIN){
        this.appservice.dismissLoader();
        this.appservice.presentBottomToast("Pin Mismatch");
        return false;
      }
      var Obj =
        {
          PIN: CryptoJS.SHA1(form.value.PIN).toString(),
          id: UserDetail.EMP_CODE
        }
      console.log(Obj);
      this._service.ChangePin(Obj).then((success) => {
       if(success != null){
         this.appservice.dismissLoader();
         this.appservice.presentBottomToast("Success | PIN changed successfully.");
         this._storage.set('UserDetail', success);
         this._appCtrl.getRootNav().setRoot('HomePage');
       }
       else{
        this.appservice.dismissLoader();
        this.appservice.presentBottomToast("Success | Password could not changed, try again later.");
    
       }
        
      }, (error) => {
        console.log(error);
        this.appservice.dismissLoader();
        this.appservice.presentBottomToast("Success | Password change successfully.");
      });

    });
  };

}
