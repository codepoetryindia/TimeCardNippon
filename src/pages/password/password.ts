import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { appService } from '../../app/app.service';
import CryptoJS from 'crypto-js';
import { PasswordService } from './password.service';

/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {

  PasswordForm: FormGroup;
  UserTempDate: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _appCtrl: App,
    private _menu: MenuController,
    private _appService: appService,
    private _service : PasswordService ,
    public formBuilder: FormBuilder) {


    this.PasswordForm = formBuilder.group({
      password: ['', Validators.required],
      ReEnteredpassword: ['', Validators.required],

    });
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad PasswordPage');
    this._appService.dismissLoader();


    this._menu.close();
    this._menu.enable(false, 'sideMenu');


    console.log(this._appService.getArray());
    this.UserTempDate = this._appService.getArray();

  }

  CreatePassword(form) {
    this._appService.presentLoading();

    if (form.value.password != form.value.ReEnteredpassword) {
      this._appService.dismissLoader();
      this._appService.presentBottomToast("Password does not match");
      return false;
    }

    let Obj = {
      Password : CryptoJS.SHA1(form.value.password).toString(),
      EmpCode : this.UserTempDate.EMP_CODE
    }

    this._appService.setObj(Obj);

    //this._service.CreatePassword(Obj).then((success) => {

    this._appCtrl.getRootNav().setRoot('SercutiryPinPage');

  // }, (error) => {
  //   console.log(error);
  //   this._appService.dismissLoader();
  // });
  }

}
