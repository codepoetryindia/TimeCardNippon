import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePasswordPage } from './change-password';
import { ChangePasswordService } from './change-password-service';

@NgModule({
  declarations: [
    ChangePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangePasswordPage),
  ],
  providers : [
    ChangePasswordService
  ] 
})
export class ChangePasswordPageModule {}
