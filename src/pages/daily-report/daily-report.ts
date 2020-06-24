import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { appService } from '../../app/app.service';


import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage'
import { DailyReportService } from './daily-report.service';
/**
 * Generated class for the DailyReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "dailyReport"
})
@Component({
  selector: 'page-daily-report',
  templateUrl: 'daily-report.html',
})
export class DailyReportPage {

  TypeOfShit = 'current';
  EmployeeList : any;
  MonthWiseData : any;
  Cycle:number=2;
  EmployeeList_Main : any ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation: Geolocation,
    private menu: MenuController,
    private _storage: Storage,
    private _service : DailyReportService , 
    public appservice: appService) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad DailyReportPage');

    this._storage.get('UserDetail').then((success)=>{
    this._service.GetReportedEmployee(success.EMP_CODE).then((success)=>{
      this.appservice.dismissLoader();
      this.EmployeeList =success[0];
      this.EmployeeList_Main = success[0];

      this.MonthWiseData  = success[1];
    },(error)=>{
      this.appservice.dismissLoader();
    });
  });
    
  }

  ShowDetails(EmpCode ,EmpName) {
    this.appservice.presentLoading();
       // console.log(data);
       let obj = {
        EmpCode: EmpCode,
        EmpName : EmpName ,
        ShowMenu : false,
        Cycle:this.Cycle
      }
console.log(obj);
   this.navCtrl.push('PunchInOutDetail', obj);
  }

  ShowSummaryVisible(EmpCode) {
    this.appservice.presentLoading();
    // console.log(data);
    let obj = {
     EmpCode: EmpCode,
     ShowMenu : false,
     Cycle:this.Cycle
   }
   
    this.navCtrl.push('PunchInOutSummary', obj);
    
  }
  SelectCycle(val)
  {
    this.Cycle=val;
  }
  search(searchbar) {
    console.log(searchbar);
    // reset countries list with initial call

    // set q to the value of the searchbar
    var q = searchbar.target.value;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      this.EmployeeList = this.EmployeeList_Main;
      return;
    }

    this.EmployeeList = this.EmployeeList.filter((v) => {
      if (v.Emp_First_name.toLowerCase().indexOf(q.toLowerCase()) > -1 || 
      v.EMP_CODE.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }


  onCancel(cancelEvent){
    console.log(cancelEvent);
    this.EmployeeList = this.EmployeeList_Main;

  };


 
  
}
