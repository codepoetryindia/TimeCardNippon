import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtpPage } from './otp';
import { otpService } from './otp.service';

@NgModule({
  declarations: [
    OtpPage,
  ],
  imports: [
    IonicPageModule.forChild(OtpPage),
  ]
  ,
  providers : [
    otpService
  ]
})
export class OtpPageModule {}
