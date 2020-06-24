import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { appService } from './app.service';
import { IonicStorageModule } from "@ionic/storage";
import { HttpModule } from '@angular/http';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { FCM } from '@ionic-native/fcm';
import { Network } from '@ionic-native/network';
import { Base64 } from '@ionic-native/base64';
import { Crop } from '@ionic-native/crop';



import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    LocationAccuracy,
    StatusBar,
    FCM,
    Device,
    SplashScreen,
    appService,
    Geolocation,
    Diagnostic,
    Network,
    File,
    Transfer,
    Camera,
    Base64,
    FilePath,
    Crop,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
