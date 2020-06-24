import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController, ModalController } from "ionic-angular";
import { Storage } from '@ionic/storage'
import { Http } from "@angular/http";
import 'rxjs/Rx';
import { appService } from '../../app/app.service';

@Injectable()
export class HomeMapService {

    latitude;
    longitude;
    constructor(private _http: Http, private _appservice: appService,private _storage:Storage) { }

    GetTodayPunchedInDetail(EmpCode) {

        return this._http.get(this._appservice.url + "Mobile_Punch_In_Out/GetTodayPunchedInDetail_V2?EmpCode=" + EmpCode, {})
            .map(res => res.json()).toPromise();
    }
     // Get Local User Object from Local Storage
     getLocalUserObject() {
        return this._storage.get('UserDetail');
    }
    PunchIn(Obj) {
        console.log(Obj);
        return this._http.post(this._appservice.url + "Mobile_Punch_In_Out/PunchIn", Obj, {})
            .map(res => res.json()).toPromise();
    }

    PunchOut(Obj) {
        console.log(Obj);
        return this._http.post(this._appservice.url + "Mobile_Punch_In_Out/PunchOut", Obj, {})
            .map(res => res.json()).toPromise();
    }

}