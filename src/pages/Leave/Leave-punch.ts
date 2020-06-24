import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { appService } from '../../app/app.service';

import { Storage } from '@ionic/storage'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordService } from '../password/password.service';
import { LeaveService } from './Leave-punch.service';
/**
 * Generated class for the InternationalPunchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "LeavePunch"
})
@Component({
  selector: 'page-Leave-punch',
  templateUrl: 'Leave-punch.html',
})
export class LeavePunchPage {
  
  LeaveForm: FormGroup;
  UserTempDate: any;
  Date:any;
  myDate: String = new Date().toISOString();
  
 
  myDateMax: String = '';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _appCtrl: App,
    private _menu: MenuController,
    private _appService: appService,
    public formBuilder: FormBuilder,
    private _storage: Storage,
    private _Service: LeaveService) {


     

    this.LeaveForm = formBuilder.group({
      FromDate: ['', Validators.required],
      ToDate: ['', Validators.required],
      Comment: ['', Validators.required]
      

    });
    //this.minDate= new Date().toString();
  }

  ionViewWillEnter() {
    this._appService.dismissLoader();
    console.log('ionViewDidLoad LeavePunchPage');
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

      this._Service.SubmitLeaveTravel(Obj).then((success) => {
        console.log(success);
        this._appService.presentBottomToast("Leave punch in successfull");
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
