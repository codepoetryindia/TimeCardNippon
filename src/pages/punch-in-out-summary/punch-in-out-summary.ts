import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { appService } from '../../app/app.service';
import { Storage } from '@ionic/storage'
import { PunchInOutSummaryService } from './punch-in-out-summary.service';
/**
 * Generated class for the PunchInOutSummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'PunchInOutSummary'
})
@Component({
  selector: 'page-punch-in-out-summary',
  templateUrl: 'punch-in-out-summary.html',
})
export class PunchInOutSummaryPage {

  EmpCode;
  cycle:number=2;
  PunchInDetail: any;
  PunchInDetail_HalfDay: any;
  PunchInDetail_Absent: any;
  data: any = [];
  ShowSideMenuIcon: any;
  WorkingHourDetail: any;

  MonthWiseData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation: Geolocation,
    private menu: MenuController,
    private _storage: Storage,
    private _service: PunchInOutSummaryService,
    public appservice: appService) {
  }

  ionViewWillEnter() {

    this.EmpCode = this.navParams.get("EmpCode");
    this.cycle=this.navParams.get("Cycle");
    console.log(this.EmpCode);
    console.log(this.cycle);
    this.ShowSideMenuIcon = this.navParams.get("ShowMenu");
    console.log('ionViewDidLoad PunchInOutSummaryPage');


    this._service.getEmployeePunchInSummary(this.EmpCode,this.cycle==undefined?2:this.cycle).then((success) => {
      console.log(success);
      if (success[0] != null) {
        this.PunchInDetail = success[0];
      }
      else {
        this.PunchInDetail = {};
      }
      this.PunchInDetail.showDetails = false
      this.PunchInDetail.icon = 'ios-add-circle-outline';

      if (success[1] != null) {
        this.PunchInDetail_HalfDay = success[1];
      }
      else {
        this.PunchInDetail_HalfDay = {};
      }
      this.PunchInDetail_HalfDay.showDetails = false;
      this.PunchInDetail_HalfDay.icon = 'ios-add-circle-outline';

      if (success[2] != null) {
        this.PunchInDetail_Absent = success[2];
      }
      else {
        this.PunchInDetail_Absent = {};
      }
      this.PunchInDetail_Absent.showDetails = false;
      this.PunchInDetail_Absent.icon = 'ios-add-circle-outline';

      this.WorkingHourDetail = success[3];


      this.MonthWiseData = success[4];
      this.appservice.dismissLoader();
    }, (error) => {
      console.log(error);
      this.appservice.dismissLoader();
    });
  }

  toggleDetails(data, data1, data2) {
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'ios-add-circle-outline';
    } else {
      data.showDetails = true;
      data1.showDetails = false;
      data2.showDetails = false;
      data1.icon = 'ios-add-circle-outline';
      data2.icon = 'ios-add-circle-outline';
      data.icon = 'ios-remove-circle-outline';
    }
  }

}
