import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController, ModalController } from "ionic-angular";

import { Http } from "@angular/http";
import 'rxjs/Rx';
import { appService } from '../../app/app.service';

@Injectable()
export class PasswordService {

    constructor(private _http: Http, private _appservice: appService) { }
    


    Obj : any ;

    CreatePassword(Obj) {

        return this._http.post(this._appservice.url + "Mobile_Login/ValidateUser", Obj, {})
            .map(res => res.json()).toPromise();
    }

 
}