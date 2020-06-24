import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePinPage } from './change-pin';
import { ChangePinService } from './change-Pin.service';

@NgModule({
  declarations: [
    ChangePinPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangePinPage),
  ],
  providers : [
    ChangePinService
  ]
})
export class ChangePinPageModule {}
