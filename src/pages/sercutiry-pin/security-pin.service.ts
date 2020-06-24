import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController, ModalController } from "ionic-angular";

import { Http } from "@angular/http";
import 'rxjs/Rx';
import { appService } from '../../app/app.service';

@Injectable()
export class SecurityPinService {

    constructor(private _http: Http, private _appservice: appService) { }

    CreatePIN(Obj) {

        return this._http.post(this._appservice.url + "Mobile_Login/CreatePIN", Obj, {})
            .map(res => res.json()).toPromise();
    }


    ConfirmEnteredPin(Obj) {

        return this._http.post(this._appservice.url + "Mobile_Login/ConfirmEnteredPin", Obj, {})
            .map(res => res.json()).toPromise();
    }

    

}