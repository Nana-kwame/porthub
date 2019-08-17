import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CongratulationsPage } from '../congratulations/congratulations';

/*
  Generated class for the AgentRegistration page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-agent-registration',
  templateUrl: 'agent-registration.html'
})
export class AgentRegistrationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgentRegistrationPage');
  }


  //Go back to previous page
  onBackTapped(event) {
    this.navCtrl.pop();
  }

  /**
   * Click listener for register button.
    */
  registerTapped(event) {
    this.navCtrl.push(CongratulationsPage);
  }

}
