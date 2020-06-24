import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { appService } from '../../app/app.service';

import { Storage } from '@ionic/storage'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordService } from '../password/password.service';
import { InternationalpunchService } from './international-punch.service';
/**
 * Generated class for the InternationalPunchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "internationalPunch"
})
@Component({
  selector: 'page-international-punch',
  templateUrl: 'international-punch.html',
})
export class InternationalPunchPage {

  InternationalForm: FormGroup;
  UserTempDate: any;
  myDate: String = new Date().toISOString();
  myDateMax: String = new Date().toISOString()+1000;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _appCtrl: App,
    private _menu: MenuController,
    private _appService: appService,
    public formBuilder: FormBuilder,
    private _storage: Storage,
    private _Service: InternationalpunchService) {


     

    this.InternationalForm = formBuilder.group({
      FromDate: ['', Validators.required],
      ToDate: ['', Validators.required],
      Comment: ['', Validators.required]
      

    });
    //this.minDate= new Date().toString();
  }

  ionViewWillEnter() {
    this._appService.dismissLoader();
    console.log('ionViewDidLoad InternationalPunchPage');
  }


  Submit(form) {
    this._appService.presentLoading();
    this._storage.get('UserDetail').then((UserDetail) => {

      let Obj = {
        FromDate: form.value.FromDate,
        ToDate: form.value.ToDate,
        EmpCode: UserDetail.EMP_CODE,
        Comment:form.value.Comment
      };

      this._Service.SubmitInternationalTravel(Obj).then((success) => {
        console.log(success);
        this._appService.presentBottomToast("International punch in was successfull");
        this._appService.dismissLoader();
        this._appCtrl.getRootNav().popToRoot();

      }, (error) => {
        console.log(error);
        this._appService.dismissLoader();
      });

    }, (error) => {
      console.log(error);
      this._appService.dismissLoader();
    });

  }

}
