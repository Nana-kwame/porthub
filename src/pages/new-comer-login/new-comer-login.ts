import { AzureBackendProvider } from "./../../providers/azure-backend/azure-backend";
import { Component, ɵConsole } from "@angular/core";
import {
  NavController,
  NavParams,
  Events,
  AlertController,
  LoadingController
} from "ionic-angular";
import { LoginPage } from "../login/login";
import { ChangePinPage } from "../change-pin/change-pin";
import { TabsPage } from "../tabs/tabs";

@Component({
  selector: "page-new-comer-login",
  templateUrl: "new-comer-login.html"
})
export class NewComerLoginPage {
  agentId: any;
  pinCodeBoxes: any = [];
  checks: any;
  pinCode: any = "";
  welcome_screen = false;
  enter_pin = true;
  tryAgainBtn = true;
  agentData: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public azure: AzureBackendProvider,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController
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
    console.log("ionViewDidLoad NewComerLoginPage");
  }

  agentIdEntered() {
    let pincode = "";
    let match_code = localStorage.getItem("pin_code");
    this.pinCodeBoxes.forEach(code => {
      pincode = pincode + code.model;
    });

    if (pincode === match_code && this.agentId === "TNTURN02") {
      this.navCtrl.setRoot(TabsPage);
      localStorage.setItem("login_status", "true");

      console.log(
        "What is in the login_status: ",
        localStorage.getItem("login_status")
      );
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
    }
  }

  goToPorthub() {
    this.navCtrl.setRoot(TabsPage);

    // Checking the status of the agent to determine whether or not the otp was verified
    // ! Value should be set false it has been set to true for testing purposes
    localStorage.setItem("login_status", "true");

    // TODO: Delete this line of code after testing complete

    console.log("Go to portub was clicked");
    console.log(
      "What is in the login_status: ",
      localStorage.getItem("login_status")
    );
  }

  inputNavigator(event, data) {
    // TODO: Prevent users from entering the next box without filling the previous
    if (event.keyCode == 8) {
      if (data.id != 0) {
        this.goToPrevInput(data);
      }
    } else {
      if (data.id != 3) {
        // this.goToNextInput(data);
        console.log('[DATA ID]:: ', data)
      } else if (data.id == 3) {
        for (var i = 0; i < this.pinCodeBoxes.length; i++) {
          if (this.pinCodeBoxes[i].model) {
            this.pinCode = this.pinCode + this.pinCodeBoxes[i].model;
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



          let pincode = "";
          this.pinCodeBoxes.forEach(code => {
            pincode = pincode + code.model;
          });

          const data = {
            agentId: this.agentId,
            otp: pincode
          };

          this.azure.agentVerifyOtp(data).then((res: any) => {
            if (res.status) {
              loading.dismiss();
              this.onGetAgent();
              this.navCtrl.setRoot(LoginPage, { agentData: this.agentData });
              localStorage.setItem("notFirstTime", "true");
              localStorage.setItem("agent_id", this.agentId);

            }
            else {

              let alert = this.alertCtrl.create({
                title: "Error",
                subTitle:
                  "Please check the credentials you provided for the login",
                buttons: ["OK"]
              });

              loading.dismiss();

              alert.present();
              this.tryAgainBtn = false;
            }

          })


        } else if (this.input) {
          // this.agentIdEntered();
          // this.navCtrl.setRoot(TabsPage);
        }
      }
    }
  }

  goBack() {
    this.welcome_screen = !this.welcome_screen;
    this.enter_pin = !this.enter_pin;
  }

  tryAgainBtnClicked() {
    if (this.pinCode === "389521" && this.agentId === "TNTURN02") {
      this.navCtrl.setRoot(LoginPage);
      localStorage.setItem("notFirstTime", "true");
      localStorage.setItem("agent_id", this.agentId);

      this.onEnter();
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

  onEnter() {
    if (this.input) {
      let loading = this.loadCtrl.create({
        content: "Sending OTP..."
      });

      loading.present();

      const data = {
        agentId: this.agentId
      };

      this.azure.agentSendOtp(data).then(
        (res: any) => {
          console.log(res);
          this.welcome_screen = !this.welcome_screen;
          this.enter_pin = !this.enter_pin;
          loading.dismiss();
        },
        err => {
          let alert = this.alertCtrl.create({
            title: "Error",
            subTitle: "Please try again !",
            buttons: ["OK"]
          });

          console.log("What was the error from the login call: ", err);
          alert.present();
          loading.dismiss();
        }
      );
    }

    // this.welcome_screen = !this.welcome_screen;
    // this.enter_pin = !this.enter_pin;


  }

  goToNextInput(data) {
    this.checks = document.getElementsByClassName("login_inputs");
    // console.log(this.checks);
    console.log( "[DATA ID]:: ",data.id)
    this.checks[data.id + 1].focus();
  }

  goToPrevInput(data) {
    this.checks = document.getElementsByClassName("login_inputs");
    this.checks[data.id - 1].focus();
    // console.log(data);
  }



  onGetAgent() {
    const data = {
      agentId: localStorage.getItem('agent_id')
    }

    this.azure.getAgent(data).then((res: any) => {
      if (res.status) {
        return this.agentData = res.result
      }
    })
  }

  get input() {
    return this.agentId;
  }
}
