import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController, ModalController } from "ionic-angular";

import { Http } from "@angular/http";
import 'rxjs/Rx';
import { appService } from '../../app/app.service';

@Injectable()
export class loginService {

    constructor(private _http: Http, private _appservice: appService) { }
    
    AuthenticateLogin(Obj) {

        return this._http.post(this._appservice.url + "Mobile_Login/ValidateUser", Obj, {})
            .map(res => res.json()).toPromise();
    }

    Validate_Username_OTP(Obj){
        
        return this._http.post(this._appservice.url + "Password/Validate_Username_OTP", Obj, {})
        .map(res => res.json()).toPromise();
    }

    ChangePassword(Obj){
        
        return this._http.post(this._appservice.url + "Password/ChangePassword", Obj, {})
        .map(res => res.json()).toPromise();
    }


}