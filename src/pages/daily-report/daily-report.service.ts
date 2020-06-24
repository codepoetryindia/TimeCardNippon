import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController, ModalController } from "ionic-angular";

import { Http } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { appService } from '../../app/app.service';

@Injectable()
export class DailyReportService {

    latitude;
    longitude;
    constructor(private _http: Http, private _appservice: appService) { }


    // GetMonthWisePunch_In_Out(EmpCode) {
        
    //             return this._http.get(this._appservice.url + "Mobile_Punch_In_Out/GetMonthWisePunch_In_Out?EmpCode=" + EmpCode, {})
    //                 .map(res => res.json()).toPromise();
    //         }

    GetReportedEmployee(EmpCode) {

        let MonthData = this._http.get(this._appservice.url + "Mobile_Punch_In_Out/GetMonthWisePunch_In_Out_V2?EmpCode=" + EmpCode).map(res => res.json());
        let AllReportedEmployee = this._http.get(this._appservice.url + "Mobile_Report/GetReportedEmployee?EmpCode=" + EmpCode).map(res => res.json());
    
        return Observable.forkJoin([AllReportedEmployee , MonthData]).map(res => res).toPromise();
        // return this._http.get(this._appservice.url + "Mobile_Report/GetReportedEmployee?EmpCode=" + EmpCode, {})
        //     .map(res => res.json()).toPromise();
    }



}