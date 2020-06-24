import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController, ModalController } from "ionic-angular";

import { Http } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { appService } from '../../app/app.service';

@Injectable()
export class PunchInOutSummaryService {

    constructor(private _http: Http, private _appservice: appService) { }



    GetPayRollDetail_WorkingHours(EmpCode) {
        return this._http.get(this._appservice.url + "Mobile_Punch_In_Out/GetPayRollDetail_WorkingHouts_V2?EmpCode=" + EmpCode, {})
            .map(res => res.json()).toPromise();
    }


    getEmployeePunchInSummary(EmpCode,Cycle) {

        let HoursDetail = this._http.get(this._appservice.url + "Mobile_Punch_In_Out/GetPayRollDetail_WorkingHouts_V2?EmpCode=" + EmpCode, {})
        .map(res => res.json());

        let Summary = this._http.get(this._appservice.url + "Mobile_Report/GetSummaryOfTheEmployee_V2?EmpCode=" + EmpCode+"&Cycle="+Cycle, {})
            .map(res => res.json());

        let Halfday = this._http.get(this._appservice.url + "Mobile_Report/GetHalfDayOfTheEmployee_V2?EmpCode=" + EmpCode+"&Cycle="+Cycle, {})
            .map(res => res.json());

        let Absent = this._http.get(this._appservice.url + "Mobile_Report/GetAbsentDayOfTheEmployee_V2?EmpCode=" + EmpCode+"&Cycle="+Cycle, {})
            .map(res => res.json());
        
        let MonthData = this._http.get(this._appservice.url + "Mobile_Punch_In_Out/GetMonthWisePunch_In_Out_V2?EmpCode=" + EmpCode).map(res => res.json());

        return Observable.forkJoin([Summary, Halfday, Absent , HoursDetail , MonthData]).map(res => res).toPromise();
    }


}