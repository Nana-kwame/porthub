import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the VehicleModuleModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-vehicle-module-modal',
  templateUrl: 'vehicle-module-modal.html'
})
export class VehicleModuleModalPage {

  parsedData: any;
  vehicleData: any;
  index: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.parsedData = navParams.get('parsedData');
    this.vehicleData = this.parsedData.data;
    this.index = this.parsedData.index

  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad BreakBulkModuleModalPage');
  }

  onBackTapped(event) {
    this.navCtrl.pop();
  }

}
