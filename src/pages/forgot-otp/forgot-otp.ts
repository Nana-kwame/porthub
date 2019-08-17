import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ForgotResetPasswordPage } from '../forgot-reset-password/forgot-reset-password';


/*
  Generated class for the ForgotOTP page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgot-otp',
  templateUrl: 'forgot-otp.html'
})
export class ForgotOTPPage {

  agentId: any;
  pinCodeBoxes: any = [];
  checks: any;
  pinCode: any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pinCodeBoxes = [
      {
        id: 0,
        model: ""
      },
      {
        id: 1,
        model: ""
      },
      {
        id: 2,
        model: ""
      },
      {
        id: 3,
        model: ""
      }, {
        id: 4,
        model: ""
      }, {
        id: 5,
        model: ""
      }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewComerLoginPage');
  }

  inputNavigator(event, data) {
    if (event.keyCode == 8) {
      if (data.id != 0) {
        this.goToPrevInput(data);
      }
    }
    else {
      if (data.id != 5) {
        this.goToNextInput(data);
      }
      else if (data.id == 5) {
        for (var i = 0; i < this.pinCodeBoxes.length; i++) {
          if (this.pinCodeBoxes[i].model) {
            this.pinCode = this.pinCode + this.pinCodeBoxes[i].model;
            console.log(this.pinCode);
          }

        }
        console.log(this.pinCode);
        if (this.pinCode == "111111") {
          this.navCtrl.push(ForgotResetPasswordPage);
        }
      }
    }
  }

  goToNextInput(data) {
    this.checks = document.getElementsByClassName('otp_inputs');
    console.log(this.checks);
    this.checks[data.id + 1].focus();
  }

  goToPrevInput(data) {
    this.checks = document.getElementsByClassName('otp_inputs');
    this.checks[data.id - 1].focus();
    // console.log(data);
  }
  goToReset() {
    this.navCtrl.push(ForgotResetPasswordPage);
  }


}
