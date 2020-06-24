import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { appService } from '../../app/app.service';
import { Storage } from '@ionic/storage'
/**
 * Generated class for the MonthlyReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "monthReport"
})
@Component({
  selector: 'page-monthly-report',
  templateUrl: 'monthly-report.html',
})
export class MonthlyReportPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation: Geolocation,
    private menu: MenuController,
    private _storage: Storage,
    public appservice: appService) {
  }

  ionViewWillEnter() {

    this.appservice.dismissLoader();
    console.log('ionViewDidLoad MonthlyReportPage');
  }

}
