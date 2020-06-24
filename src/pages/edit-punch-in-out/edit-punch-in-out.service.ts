import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController, ModalController } from "ionic-angular";

import { Http } from "@angular/http";
import 'rxjs/Rx';
import { appService } from '../../app/app.service';
import { Observable } from "rxjs/Rx";

@Injectable()
export class EditPunchInOutService {

    latitude;
    longitude;
    constructor(private _http: Http, private _appservice: appService) { }

    GetPunchInDetails(Id) {

        // return this._http.get(this._appservice.url + "Dropdowns/GetDayStatusTypeList" , {})
        // .map(res => res.json()).toPromise();
        // return this._http.get(this._appservice.url + "Mobile_EditPunchIntDetails/GetEditPunchInDetails?Header_Id=" + Id, {})
        //     .map(res => res.json()).toPromise();


            let DayList = this._http.get(this._appservice.url + "Dropdowns/GetDayStatusTypeList" , {}).map(res => res.json());
            let Detail = this._http.get(this._appservice.url + "Mobile_EditPunchIntDetails/GetEditPunchInDetails?Header_Id=" + Id, {}).map(res => res.json());
            return Observable.forkJoin([DayList, Detail]).map(res => res).toPromise();
    }
    GetDayStatusType() {

        // return this._http.get(this._appservice.url + "Dropdowns/GetDayStatusTypeList" , {})
        // .map(res => res.json()).toPromise();
        // return this._http.get(this._appservice.url + "Mobile_EditPunchIntDetails/GetEditPunchInDetails?Header_Id=" + Id, {})
        //     .map(res => res.json()).toPromise();


            let DayList = this._http.get(this._appservice.url + "Dropdowns/GetDayStatusTypeList" , {}).map(res => res.json());
             return Observable.forkJoin([DayList]).map(res => res).toPromise();
    }
    UpdatePunchInDetail(Obj) {

        return this._http.post(this._appservice.url + "Mobile_EditPunchIntDetails/UpdatePunchInDetail_V2" ,Obj, {})
            .map(res => res.json()).toPromise();
    }

    // GetDayStatusTypeList(){
        
    //     return this._http.get(this._appservice.url + "Dropdowns/GetDayStatusTypeList" , {})
    //     .map(res => res.json()).toPromise();
    // }

}