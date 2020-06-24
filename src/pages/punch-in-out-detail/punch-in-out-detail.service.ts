import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController, ModalController } from "ionic-angular";

import { Http } from "@angular/http";
//import 'rxjs/Rx';

import { Observable } from 'rxjs/Rx';
import { appService } from '../../app/app.service';

@Injectable()
export class PunchInOutDetailService {

    constructor(private _http: Http, private _appservice: appService) { }
    


    GetDetailOfTheEmployeePunchIn(EmpCode , page,cycle) {

        // return this._http.get(this._appservice.url + "Mobile_Report/GetDetailOfTheEmployeePunchIn?EmpCode="+EmpCode +"&Page="+page, {})
        //     .map(res => res.json()).toPromise();

            let MonthData = this._http.get(this._appservice.url + "Mobile_Punch_In_Out/GetMonthWisePunch_In_Out_V2?EmpCode=" + EmpCode).map(res => res.json());
            let PunchInDetail = this._http.get(this._appservice.url + "Mobile_Report/GetDetailOfTheEmployeePunchIn_V2?EmpCode=" + EmpCode+"&Page="+page+"&Cycle="+cycle).map(res => res.json());
            let TodayPunchInDetail = this._http.get(this._appservice.url + "Mobile_Punch_In_Out/GetTodayPunchedIn?EmpCode=" + EmpCode+"&Cycle="+cycle).map(res => res.json());
            return Observable.forkJoin([PunchInDetail , MonthData,TodayPunchInDetail]).map(res => res).toPromise();
            // return this._http.get(this._appservice.url + "Mobile_Report/GetReportedEmployee?EmpCode=" + EmpCode, {})
            //     .map(res => res.json()).toPromise();
    }

 
}