import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController, ModalController } from "ionic-angular";

import { Http } from "@angular/http";
import 'rxjs/Rx';
import { appService } from '../../app/app.service';

@Injectable()
export class otpService {

    constructor(private _http: Http, private _appservice: appService) { }
    
    AuthenticateOTP(Obj) {

        return this._http.post(this._appservice.url + "Mobile_Login/AuthenticateOTP", Obj, {})
            .map(res => res.json()).toPromise();
    }


}