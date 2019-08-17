import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the DryBulkModuleModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dry-bulk-module-modal',
  templateUrl: 'dry-bulk-module-modal.html'
})
export class DryBulkModuleModalPage {

  parsedData: any;
  dryBulkData: any;
  index: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.parsedData = navParams.get('parsedData');
    this.dryBulkData = this.parsedData.data;
    this.index = this.parsedData.index

  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad BreakBulkModuleModalPage');
  }

  onBackTapped(event) {
    this.navCtrl.pop();
  }

}
