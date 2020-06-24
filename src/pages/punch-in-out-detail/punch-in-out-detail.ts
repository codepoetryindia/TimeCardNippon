import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController
} from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { appService } from "../../app/app.service";
import { Storage } from "@ionic/storage";
import { PunchInOutDetailService } from "./punch-in-out-detail.service";
/**
 * Generated class for the PunchInOutDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "PunchInOutDetail"
})
@Component({
  selector: "page-punch-in-out-detail",
  templateUrl: "punch-in-out-detail.html"
})
export class PunchInOutDetailPage {
  IsWorkingDate: boolean = true;
  showOtherPunchInDetails = false;
  PunchInList: any[];
  cycle: number = 2;
  EmpCode;
  EmpName;
  TypeOfShit = "ALL";
  TypeOfCycle = "current";
  ShowEditIcon: boolean = false;
  ShowSideMenuIcon;
  MonthWiseData: any;
  TodayPunchInDetails: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private menu: MenuController,
    private _storage: Storage,
    private _service: PunchInOutDetailService,
    public appservice: appService
  ) {
    console.log(this.navParams.get("myNewKey"));
  }
  SelectCycle(val) {
    this.cycle = val;
    // this.TypeOfShit = 'ALL';
    this.GetPunchList(this.TypeOfShit);
  }
  GetIsWorking(Working: boolean) {
    if (Working) {
      return true;
    } else {
      return false;
    }
  }
  ionViewWillEnter() {
    this.IsWorkingDate = !this.appservice.IsNoNWorkingDay;
    this.EmpCode = this.navParams.get("EmpCode");
    this.EmpName = this.navParams.get("EmpName");
    this.cycle = this.navParams.get("Cycle");
    if (this.navParams.get("myNewKey")) {
      this.TypeOfShit = this.navParams.get("myNewKey");
    }

    if (this.cycle == undefined) {
      this.showOtherPunchInDetails = false;
    } else {
      this.showOtherPunchInDetails = true;
    }
    console.log(this.EmpName);
    console.log(this.cycle);
    this.ShowSideMenuIcon = this.navParams.get("ShowMenu");

    console.log(this.ShowSideMenuIcon);

    let id = 1;
    if (this.TypeOfShit == "FULL") {
      id = 2;
    } else if (this.TypeOfShit == "HALF") {
      id = 3;
    } else if (this.TypeOfShit == "NON") {
      id = 4;
    }

    this._service
      .GetDetailOfTheEmployeePunchIn(
        this.EmpCode,
        id,
        this.cycle == undefined ? 2 : this.cycle
      )
      .then(
        success => {
          console.log(success);
          this.appservice.dismissLoader();

          this.TodayPunchInDetails = success[2];
          if (
            this.TodayPunchInDetails != null &&
            this.TodayPunchInDetails.PunchInLocation == null
          ) {
            this.TodayPunchInDetails = null;
          }
          console.log(this.TodayPunchInDetails);
          this.PunchInList = success[0];
          console.log(this.PunchInList);
          // if(this.PunchInList!=null && this.PunchInList.length>0 && !this.PunchInList[0].IsShowEditButton)
          // {
          //   if(!this.ShowSideMenuIcon && !this.PunchInList[0].IsShowEditButton)
          //   {
          //     this.ShowEditIcon=false;
          //   }
          //   else if(!this.ShowSideMenuIcon){
          //     this.ShowEditIcon=true;
          //   }
          // }

          this.MonthWiseData = success[1];
        },
        error => {
          this.appservice.dismissLoader();

          console.log(error);
        }
      );

    console.log("ionViewDidLoad PunchInOutDetailPage");
  }

  GetPunchList(Type) {
    this.appservice.presentLoading();
    let id = 1;
    if (Type == "FULL") {
      id = 2;
    } else if (Type == "HALF") {
      id = 3;
    } else if (Type == "NON") {
      id = 4;
    }
    this._service
      .GetDetailOfTheEmployeePunchIn(
        this.EmpCode,
        id,
        this.cycle == undefined ? 2 : this.cycle
      )
      .then(
        success => {
          console.log(success);

          this.PunchInList = success[0];

          this.MonthWiseData = success[1];
          this.TodayPunchInDetails = success[2];
          if (
            this.TodayPunchInDetails != null &&
            this.TodayPunchInDetails.PunchInLocation == null
          ) {
            this.TodayPunchInDetails = null;
          }

          this.appservice.dismissLoader();
        },
        error => {
          console.log(error);
        }
      );
  }

  EditPunchIn(data) {
    data.EmpCode = this.EmpCode;
    this.appservice.presentLoading();
    console.log(data);
    let obj = {
      data: data,
      type: this.TypeOfShit
    };
    this.navCtrl.push("EditPunch", obj);
  }

  ShowAddressInfo(info) {
    this.appservice.showAlert("Address Info", info);
  }
}
