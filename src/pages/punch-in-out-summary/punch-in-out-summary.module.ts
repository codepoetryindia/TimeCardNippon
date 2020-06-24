import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PunchInOutSummaryPage } from './punch-in-out-summary';
import { PunchInOutSummaryService } from './punch-in-out-summary.service';

@NgModule({
  declarations: [
    PunchInOutSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(PunchInOutSummaryPage),
  ],
  providers : [
    PunchInOutSummaryService
  ]
})
export class PunchInOutSummaryPageModule {}
