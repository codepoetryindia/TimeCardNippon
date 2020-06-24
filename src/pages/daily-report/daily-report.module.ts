import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyReportPage } from './daily-report';
import { DailyReportService } from './daily-report.service';

@NgModule({
  declarations: [
    DailyReportPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyReportPage),
  ]
  ,
  exports: [
    DailyReportPage
  ],
  providers : [
    DailyReportService
  ]
})
export class DailyReportPageModule {}
