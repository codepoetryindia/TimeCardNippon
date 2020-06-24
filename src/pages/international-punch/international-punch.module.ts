import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InternationalPunchPage } from './international-punch';
import { InternationalpunchService } from './international-punch.service';

@NgModule({
  declarations: [
    InternationalPunchPage,
  ],
  imports: [
    IonicPageModule.forChild(InternationalPunchPage),
  ],
  providers : [
    InternationalpunchService
  ]
})
export class InternationalPunchPageModule {}
