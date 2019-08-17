import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the SendBill page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-send-bill',
  templateUrl: 'send-bill.html'
})
export class SendBillPage {
tabs:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendBillPage');
  }

  sendTapped(event){
    // this.viewCtrl.dismiss();
    this.navCtrl.popToRoot();
  }


    ionViewWillEnter() {
     let tabs = document.querySelectorAll('.tabbar');
   if ( tabs !== null ) {
        Object.keys(tabs).map((key) => {
          tabs[ key ].style.transform = 'translateY(56px)';
        });
      } 
  }
 
  ionViewWillLeave() {
     let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
        Object.keys(tabs).map((key) => {
          tabs[ key ].style.transform = 'translateY(0)';
        });
      } // 
  }


}
