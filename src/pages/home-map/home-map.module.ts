import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeMapPage } from './home-map';
import { HomeMapService } from './home-map.service';

@NgModule({
  declarations: [
    HomeMapPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeMapPage),
  ],
  providers : [
    HomeMapService
  ]
})
export class HomeMapPageModule {}
