import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPunchInOutPage } from './edit-punch-in-out';
import { EditPunchInOutService } from './edit-punch-in-out.service';

@NgModule({
  declarations: [
    EditPunchInOutPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPunchInOutPage),
  ],
  providers : [
    EditPunchInOutService
  ]
})
export class EditPunchInOutPageModule {}
