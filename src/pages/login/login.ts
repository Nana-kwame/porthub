import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VerificationPage } from '../verification/verification';
import { TabsPage } from '../tabs/tabs';
import { ChangePinPage } from '../change-pin/change-pin';
import { AzureBackendProvider } from '../../providers/azure-backend/azure-backend';


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginData: any = {};
  pinCodeBoxes: any = [];
  checks: any;
  pinCode: any;
  initFocus: any;
  agentData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private azure: AzureBackendProvider) {
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

    const data = {
      agentId: localStorage.getItem('agent_id')
    }

    this.azure.getAgent(data).then((res: any) => {
      this.agentData = res.result;
      localStorage.setItem('agentData', JSON.stringify(this.agentData));
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
  }

  onBackPressed(){
    this.navCtrl.pop()
  }

  loginTapped() {
    localStorage.setItem("login_status", "true");
    this.pinCode = "";
    // for (var i = 0; i < this.pinCodeBoxes.length; i++) {
    //   this.pinCode = this.pinCode + this.pinCodeBoxes[i].model;
    // }
    // if (this.pinCode == "111111") {
      this.navCtrl.push(ChangePinPage);
    // }
    // else {
    //   this.navCtrl.setRoot(TabsPage);
    // }
    


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
    }
  }

  goToNextInput(data) {
    this.checks = document.getElementsByClassName('login_inputs');
    console.log(this.checks);
    this.checks[data.id + 1].focus();
  }

  goToPrevInput(data) {
    this.checks = document.getElementsByClassName('login_inputs');
    this.checks[data.id - 1].focus();
    // console.log(data);
  }


}
