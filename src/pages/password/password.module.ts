import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordPage } from './password';
import { PasswordService } from './password.service';

@NgModule({
  declarations: [
    PasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordPage),
  ],
  providers : [
    PasswordService
  ]
  
})
export class PasswordPageModule {}
