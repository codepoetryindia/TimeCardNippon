import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { appService } from '../../app/app.service';
/**
 * Generated class for the GuidelinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'Guideline'
})
@Component({
  selector: 'page-guideline',
  templateUrl: 'guideline.html',
})
export class GuidelinePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController,public appservice: appService ) {
  }
  ionViewWillEnter() {
    this.appservice.dismissLoader();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GuidelinePage');
  }

}
