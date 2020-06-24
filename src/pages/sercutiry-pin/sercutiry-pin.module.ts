import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SercutiryPinPage } from './sercutiry-pin';
import { SecurityPinService } from './security-pin.service';
import { loginService } from '../login/login.service';


@NgModule({
  declarations: [
    SercutiryPinPage,
  ],
  imports: [
    IonicPageModule.forChild(SercutiryPinPage),
  ],
  providers : [
    SecurityPinService ,
    loginService
  ]
})
export class SercutiryPinPageModule {}
