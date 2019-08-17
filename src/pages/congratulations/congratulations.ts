import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { InvoicesPage } from '../invoices/invoices';

/*
  Generated class for the Congratulations page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-congratulations',
  templateUrl: 'congratulations.html'
})
export class CongratulationsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CongratulationsPage');
  }

  /**
     * Go back to previous page
     */

  onBackTapped(event) {
    this.navCtrl.pop();
  }

  /**
       * Click listener for ok button.
       * navigates you to the root invoices page.
       */
  okTapped(event) {
    this.navCtrl.popToRoot();
  }

  /**
     * Click listener for generate another invoice button.
     * navigates you to the invoicing
     */
  generateAnotherInvoiceTapped(event) {
    this.navCtrl.remove(2, 1);
    this.navCtrl.pop();
  }

}
