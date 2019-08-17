import { AzureBackendProvider } from './../../providers/azure-backend/azure-backend';
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";
import { ForgotOTPPage } from "../forgot-otp/forgot-otp";
import { TabsPage } from "../tabs/tabs";

/*
  Generated class for the LoginToContinue page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: "page-login-to-continue",
  templateUrl: "login-to-continue.html"
})
export class LoginToContinuePage {
  loginData: any = {};
  pinCodeBoxes: any = [];
  checks: any;
  hidden: boolean = false;
  agentId: string;

  welcome_screen = false;
  enter_pin = true;
  pinCode: any = "";
  tryAgainBtn = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public azurebackend: AzureBackendProvider,
  ) {
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
      },
      {
        id: 4,
        model: ""
      },
      {
        id: 5,
        model: ""
      }
    ];
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginToContinuePage");
  }

  goToNextInput(data) {
    this.checks = document.getElementsByClassName("pin_box");
    this.checks[data.id + 1].focus();
  }

  goToPrevInput(data) {
    // console.log("prev")
    this.checks = document.getElementsByClassName("pin_box");
    this.checks[data.id - 1].focus();
    // console.log(data);
  }

  inputNavigator(event, data) {
    // TODO: Prevent users from entering the next box without filling the previous
    // *Work around for if the user enters the delete key* //

    if (event.keyCode == 8 || event.charCode == 48) {
      if (data.id !== 0) {
        this.goToPrevInput(data);
      }
    } else {
      if (data.id != 5) {
        this.goToNextInput(data);
      } else if (data.id == 5) {
        for (var i = 0; i < this.pinCodeBoxes.length; i++) {
          if (this.pinCodeBoxes[i].model) {
            this.pinCode += this.pinCodeBoxes[i].model;
            console.log(this.pinCode);
          }
        }
        console.log(this.pinCode);
        if (this.input) {
          // this.navCtrl.push(LoginPage);

          let loading = this.loadCtrl.create({
            content: "Please wait..."
          });

          loading.present();

          this.loginButtonTapped();

          loading.dismiss();
        }
      }
    }
  }

  loginButtonTapped() {
    let pincode = "";
    let stored_pin = localStorage.getItem("pin_code");
    this.pinCodeBoxes.forEach(code => {
      pincode = pincode + code.model;
    });

    if (pincode === stored_pin && this.agentId  === localStorage.getItem('agent_id')) {
      this.navCtrl.setRoot(TabsPage);
      localStorage.setItem("login_status", "true");
      localStorage.setItem("agent_id", this.agentId);
    } else {
      const alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Wrong user credentials",
        buttons: [
          {
            text: "OK"
          }
        ]
      });

      alert.present();
      this.tryAgainBtn = false;
    }
  }

  tryAgainBtnClicked() {
    let stored_pin = localStorage.getItem("pin_code");
  
    if (this.pinCode === stored_pin && this.agentId === localStorage.getItem('agent_id')) {
      this.navCtrl.setRoot(TabsPage);
      localStorage.setItem("notFirstTime", "true");
      localStorage.setItem("agent_id", this.agentId);

      // this.onEnter();
    } else {
      let alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Please check the credentials you provided for the login",
        buttons: ["OK"]
      });

      alert.present();
      this.tryAgainBtn = false;
    }
  }

  goToPorthub() {
    this.navCtrl.setRoot(TabsPage);
    localStorage.setItem("login_status", "false");

    console.log("Go to portub was clicked");
    console.log(
      "What is in the login_status: ",
      localStorage.getItem("login_status")
    );
  }

  onEnter() {
    this.welcome_screen = !this.welcome_screen;
    this.enter_pin = !this.enter_pin;
  }

  get input() {
    return this.agentId;
  }

  forgotPIN() {
    this.navCtrl.push(ForgotOTPPage);
  }

  onClosedPressed() {
    this.navCtrl.setRoot(TabsPage);
  }
}
