import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the BreakBulkModuleModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-break-bulk-module-modal',
  templateUrl: 'break-bulk-module-modal.html'
})
export class BreakBulkModuleModalPage {
  parsedData: any;
  breakBulkData: any;
  index: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.parsedData = navParams.get('parsedData');
    this.breakBulkData = this.parsedData.data;
    this.index = this.parsedData.index

  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad BreakBulkModuleModalPage');
  }

  onBackTapped(event) {
    this.navCtrl.pop();
  }

}
