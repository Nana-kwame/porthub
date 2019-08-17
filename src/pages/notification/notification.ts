import { Events } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  close() {
    this.viewCtrl.dismiss()
  }
}
