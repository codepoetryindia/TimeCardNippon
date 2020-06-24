import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, App } from "ionic-angular";
import { appService } from "../../app/app.service";
import { Storage } from "@ionic/storage";
import { EditPunchInOutService } from "./edit-punch-in-out.service";
/**
 * Generated class for the EditPunchInOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "EditPunch"
})
@Component({
  selector: "page-edit-punch-in-out",
  templateUrl: "edit-punch-in-out.html"
})
export class EditPunchInOutPage {
  type: any;
  Obj: any;
  PunchDetail: any = {};
  DayTypeList: any;
  IsInt: boolean = false;
  IsNewEntry1: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _appCtrl: App,
    private _storage: Storage,
    private _service: EditPunchInOutService,
    private _appService: appService
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad EditPunchInOutPage");

    this.Obj = this.navParams.get("data");
    this.type = this.navParams.get("type");
    console.log(this.type);
    console.log(this.Obj);
    if (!this.Obj.IsNewEntry) {
      this._service.GetPunchInDetails(this.Obj.Header_Id).then(
        success => {
          console.log("success=>", success);
          this._appService.dismissLoader();
          this.PunchDetail = success[1];
          this.DayTypeList = success[0];
          if (success[1] != null && success[1].DayStatus_Id == 4) {
            this.IsInt = true;
            this.PunchDetail.DayStatus_Id = 1;
          }
          if (success[1] != null && success[1].DayStatus_Id == 5) {
            this.IsInt = true;
            this.PunchDetail.DayStatus_Id = 5;
          }
          if (this.PunchDetail.PunchOutLocation == null) {
            this.PunchDetail.PunchOutLocation = "Other";
          }
          if (this.PunchDetail.PunchInLocation == null) {
            this.PunchDetail.PunchInLocation = "Other";
          }
          console.log(this.PunchDetail);
        },
        err => {
          this._appService.dismissLoader();
          console.log(err);
        }
      );
    } else {
      this.IsNewEntry1 = true;
      this._service.GetDayStatusType().then(
        success => {
          //   console.log("success=>", success);
          this._appService.dismissLoader();
          this.PunchDetail.PunchOutDateTime = this.Obj.PunchInDateTime;
          this.PunchDetail.PunchInDateTime = this.Obj.PunchInDateTime;

          this.PunchDetail.DayStatus_Id = 3;
          this.DayTypeList = success[0];
          //   console.log(this.PunchDetail);
        },
        err => {
          this._appService.dismissLoader();
          console.log(err);
        }
      );
    }
  }
  Update() {
    if (this.Obj.DayStatus_Id != this.PunchDetail.DayStatus_Id) {
      this._appService.presentLoading();
      if (!this.Obj.IsNewEntry) {
        this._storage.get("UserDetail").then(
          UserDetail => {
            this.PunchDetail.Header_Id = this.Obj.Header_Id;
            this.PunchDetail.EmpCode = UserDetail.EMP_CODE;
            console.log(this.PunchDetail);

            this._service.UpdatePunchInDetail(this.PunchDetail).then(
              success => {
                if (success.indexOf("success") != -1) {
                  this._appService.presentBottomToast(
                    "Success : Details successfully updated."
                  );
                } else {
                  this._appService.presentBottomToast(
                    "Error : could not  update please try again"
                  );
                }
                this.navCtrl.getPrevious().data.myNewKey = this.type;
                this.navCtrl.pop();
              },
              err => {
                console.log(err);
              }
            );
          },
          err => {
            console.log(err);
          }
        );
      } else {
        this._storage.get("UserDetail").then(
          UserDetail => {
            console.log(this.Obj);
            this.PunchDetail.Header_Id = this.Obj.Header_Id;
            this.PunchDetail.EmpCode = this.Obj.EmpCode;
            this.PunchDetail.IsNewEntry = true;
            this.PunchDetail.UpdateEmpCode = UserDetail.EMP_CODE;
            console.log(this.PunchDetail);

            this._service.UpdatePunchInDetail(this.PunchDetail).then(
              success => {
                if (success.indexOf("success") != -1) {
                  this._appService.presentBottomToast(
                    "Success : Details successfully updated."
                  );
                } else {
                  this._appService.presentBottomToast(
                    "Error : could not  update please try again"
                  );
                }
                this.navCtrl.getPrevious().data.myNewKey = this.type;
                this.navCtrl.pop();
              },
              err => {
                console.log(err);
              }
            );
          },
          err => {
            console.log(err);
          }
        );
      }
    } else {
      this._appService.presentBottomToast(
        "Success : Details successfully updated."
      );
    }
  }
}
