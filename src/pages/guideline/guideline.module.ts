import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuidelinePage } from './guideline';

@NgModule({
  declarations: [
    GuidelinePage,
  ],
  imports: [
    IonicPageModule.forChild(GuidelinePage),
  ],
})
export class GuidelinePageModule {}

