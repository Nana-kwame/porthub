import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SendBillPage } from '../send-bill/send-bill';


/*
  Generated class for the BillDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bill-details',
  templateUrl: 'bill-details.html'
})
export class BillDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillDetailsPage');
  }

  /**
   * Go back to previous page 
   */
  onBackTapped(event) {
    this.navCtrl.pop();
  }
  /**
   * Click listener for send invoice button. 
   */
  sendInvoiceTapped(event) {
    this.navCtrl.push(SendBillPage);
  }

}
