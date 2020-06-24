import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PunchInOutDetailPage } from './punch-in-out-detail';
import { PunchInOutDetailService } from './punch-in-out-detail.service';

@NgModule({
  declarations: [
    PunchInOutDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PunchInOutDetailPage),
  ],
  providers : [
    PunchInOutDetailService
  ]
})
export class PunchInOutDetailPageModule {}
