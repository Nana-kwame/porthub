import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the LiquidBulkModuleModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-liquid-bulk-module-modal',
  templateUrl: 'liquid-bulk-module-modal.html'
})
export class LiquidBulkModuleModalPage {

  parsedData: any;
  liquidBulkData: any;
  index: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.liquidBulkData = navParams.get('parsedData');
    // this.breakBulkData = this.parsedData.data;
    // this.index = this.parsedData.index

  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad BreakBulkModuleModalPage');
  }

  onBackTapped(event) {
    this.navCtrl.pop();
  }

}
