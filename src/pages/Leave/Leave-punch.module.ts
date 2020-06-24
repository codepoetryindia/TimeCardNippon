import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeavePunchPage } from './Leave-punch';
import { LeaveService } from './Leave-punch.service';

@NgModule({
  declarations: [
    LeavePunchPage,
  ],
  imports: [
    IonicPageModule.forChild(LeavePunchPage),
  ],
  providers : [
    LeaveService
  ]
})
export class InternationalPunchModule {}
