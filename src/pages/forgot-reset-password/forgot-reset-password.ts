import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ForgotResetPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgot-reset-password',
  templateUrl: 'forgot-reset-password.html'
})
export class ForgotResetPasswordPage {

  loginData: any = {};
  pinCodeBoxes: any = [];
  confirmPinCodeBoxes: any = [];
  checks: any;
  confirmChecks: any;
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

    this.confirmPinCodeBoxes = [
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
    console.log('ionViewDidLoad ChangePinPage');
  }

  onBackPressed() {
    this.navCtrl.pop();
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
        this.confirmChecks = document.getElementsByClassName('reset_confirm_pin_box');
        this.confirmChecks[0].focus();
      }
    }
  }

  goToNextInput(data) {
    this.checks = document.getElementsByClassName('reset_pin_box')
    // ;    console.log(this.checks)
    this.checks[data.id + 1].focus();
  }

  goToPrevInput(data) {
    // console.log("prev")
    this.checks = document.getElementsByClassName('reset_pin_box')
    this.checks[data.id - 1].focus();
    // console.log(data);
  }

  confirmInputNavigator(event, data) {
    if (event.keyCode == 8) {
      if (data.id != 0) {
        this.confirmGoToPrevInput(data);
      }
    }
    else {
      if (data.id != 5) {
        this.confirmGoToNextInput(data);
      }
    }
  }

  confirmGoToNextInput(data) {
    this.confirmChecks = document.getElementsByClassName('reset_confirm_pin_box');
    // console.log(this.confirmChecks)
    this.confirmChecks[data.id + 1].focus();
  }

  confirmGoToPrevInput(data) {
    // console.log("prev")
    this.confirmChecks = document.getElementsByClassName('reset_confirm_pin_box')
    this.confirmChecks[data.id - 1].focus();
    // console.log(data);
  }

  onDonePressed() {
    this.navCtrl.popToRoot();
  }

}
