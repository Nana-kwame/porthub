import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ContainerModuleModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-container-module-modal',
  templateUrl: 'container-module-modal.html'
})
export class ContainerModuleModalPage {

  parsedData: any;
  containerData: any;
  index: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.parsedData = navParams.get('parsedData');
    this.containerData = this.parsedData.data;
    this.index = this.parsedData.index

  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad BreakBulkModuleModalPage');
  }

  onBackTapped(event) {
    this.navCtrl.pop();
  }

}
