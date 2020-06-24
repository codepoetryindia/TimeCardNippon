import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonthlyReportPage } from './monthly-report';

@NgModule({
  declarations: [
    MonthlyReportPage,
  ],
  imports: [
    IonicPageModule.forChild(MonthlyReportPage),
  ]
})
export class MonthlyReportPageModule {}
