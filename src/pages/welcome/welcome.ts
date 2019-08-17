import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

/*
  Generated class for the Welcome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
tabs:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');

  }

   nonAgentTapped() {
    this.navCtrl.push(TabsPage);
  }

  agentTapped() {
    this.navCtrl.push(LoginPage);
  }

  // ionViewWillEnter() {
  //    let tabs = document.querySelectorAll('.tabbar');
  //  if ( tabs !== null ) {
  //       Object.keys(tabs).map((key) => {
  //         tabs[ key ].style.transform = 'translateY(56px)';
  //       });
  //     } //
  // }

  // ionViewWillLeave() {
  //    let tabs = document.querySelectorAll('.tabbar');
  //   if ( tabs !== null ) {
  //       Object.keys(tabs).map((key) => {
  //         tabs[ key ].style.transform = 'translateY(0)';
  //       });
  //     } //
  // }

}
