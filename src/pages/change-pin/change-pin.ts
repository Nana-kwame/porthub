import { Component, DoCheck } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { TabsPage } from "../tabs/tabs";

/*
  Generated class for the ChangePin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: "page-change-pin",
  templateUrl: "change-pin.html"
})
export class ChangePinPage {
  loginData: any = {};
  pinCodeBoxes: any = [];
  confirmPinCodeBoxes: any = [];
  checks: any;
  confirmChecks: any;
  hideEnterPin = false;
  hideVerifyPin = true;
  btnTxt: string;

  create_pin_complete = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtlr: AlertController
  ) {
    console.log("Pincode: ", this.pinCodeBoxes[0]);
    this.btnTxt = "Continue";
    // this.pinCodeBoxes = [
    //   {
    //     id: 0,
    //     model: ""
    //   },
    //   {
    //     id: 1,
    //     model: ""
    //   },
    //   {
    //     id: 2,
    //     model: ""
    //   },
    //   {
    //     id: 3,
    //     model: ""
    //   }, {
    //     id: 4,
    //     model: ""
    //   }, {
    //     id: 5,
    //     model: ""
    //   }
    // ]
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChangePinPage");
  }

  onBackPressed() {
    this.navCtrl.pop();
  }

  inputNavigator(event, data) {
    if (event.keyCode == 8) {
      if (data.id != 0) {
        this.goToPrevInput(data);
      }
    } else {
      if (data.id != 5) {
        this.goToNextInput(data);
      } else if (data.id == 5) {
        this.confirmChecks = document.getElementsByClassName("confirm_pin_box");
        this.confirmChecks[0].focus();
      }
    }
  }

  goToNextInput(data) {
    this.checks = document.getElementsByClassName("set_pin_box");
    // ;    console.log(this.checks)
    this.checks[data.id + 1].focus();
  }

  goToPrevInput(data) {
    // console.log("prev")
    this.checks = document.getElementsByClassName("set_pin_box");
    this.checks[data.id - 1].focus();
    // console.log(data);
  }

  confirmInputNavigator(event, data) {
    if (event.keyCode == 8) {
      if (data.id != 0) {
        this.confirmGoToPrevInput(data);
      }
    } else {
      if (data.id != 5) {
        this.confirmGoToNextInput(data);
      }
    }
  }

  confirmGoToNextInput(data) {
    this.confirmChecks = document.getElementsByClassName("confirm_pin_box");
    // console.log(this.confirmChecks)
    this.confirmChecks[data.id + 1].focus();
    console.log(
      "Comparing the codes: ",
      this.compareCodes(this.pinCodeBoxes, this.confirmPinCodeBoxes)
    );
  }

  confirmGoToPrevInput(data) {
    // console.log("prev")
    this.confirmChecks = document.getElementsByClassName("confirm_pin_box");
    this.confirmChecks[data.id - 1].focus();
    // console.log(data);
  }

  onDonePressed() {
    // this.navCtrl.setRoot(TabsPage);

    // for( let code of this.pinCodeBoxes){
    //   for(let confirmPin of this.confirmPinCodeBoxes){
    //     if (code.model === confirmPin.model){
    //       this.navCtrl.setRoot(TabsPage);
    //     }else {

    //     }
    //   }
    // }
    let pincode: string = "";
    let confirmCode: string = "";

    this.pinCodeBoxes.forEach(code => {
      pincode = pincode + code.model;
    });

    this.confirmPinCodeBoxes.forEach(code => {
      confirmCode = confirmCode + code.model;
    });
    //  console.log('What is the value of pincode: ', pincode);

    if (pincode === confirmCode) {
      this.navCtrl.setRoot(TabsPage);
      localStorage.setItem("pin_code", pincode);
    } else {
      let alert = this.alertCtlr.create({
        title: "Error",
        subTitle: "Pin codes do not match",
        buttons: [
          {
            text: "OK"
          }
        ]
      });
      alert.present();
    }

    // console.log('What is in the pinCode box: ',this.pinCodeBoxes );
    // console.log('What is in the confirm pinCode box: ', this.confirmPinCodeBoxes);
  }

  get pinMatch() {
    return this.pinCodeBoxes === this.confirmPinCodeBoxes;
  }

  compareCodes(code1: any, code2: any) {
    code1.forEach(code => {
      code2.forEach(code2 => {
        if (code.model === code2.model) {
          return false;
        }
      });
    });
  }

  // To push the entered text into the pincode box

  enterCode(n) {
    if (!this.create_pin_complete) {
      this.createPin(n);
    } else {
      this.verifyCode(n);
    }
  }

  // updateCode(digit){
  //   if lenght of the array is 6, go to next page
  //  else push to the same array
  // }

  createPin(digit) {
    this.pinCodeBoxes.push(digit);
    if (this.pinCodeBoxes.length === 6) {
      this.mainBtnTapped();
      this.create_pin_complete = true;
    }
  }

  verifyCode(digit) {
    this.confirmPinCodeBoxes.push(digit);
    if (this.confirmPinCodeBoxes.length === 6) {
      if (this.confirmPinCodeBoxes.join("") === this.pinCodeBoxes.join("")) {
        console.log("The arry matches");
        this.navCtrl.setRoot(TabsPage);
        localStorage.setItem("pin_code", this.pinCodeBoxes.join(""));
      } else {
        let alert = this.alertCtlr.create({
          title: "Error",
          subTitle: "Pin codes do not match",
          buttons: [
            {
              text: "OK"
            }
          ]
        });
        alert.present();
      }
    }

    console.log("ConfirmPinCode", this.confirmPinCodeBoxes.join(""));
    console.log("PinCode", this.pinCodeBoxes.join(""));
  }

  deleleEntry() {
    if (this.confirmPinCodeBoxes.length === 0) {
      this.pinCodeBoxes.pop();
      console.log(this.pinCodeBoxes);
    } else {
      this.confirmPinCodeBoxes.pop();
      console.log(this.confirmPinCodeBoxes);
    }
  }

  mainBtnTapped() {
    if (this.pinCodeBoxes.length === 6) {
      this.hideEnterPin = !this.hideEnterPin;
      this.hideVerifyPin = !this.hideVerifyPin;

      this.btnTxt = "Verify PIN";
    }
  }
  verifyCodeBackBtnTapped() {
    this.mainBtnTapped();
    this.btnTxt = "Continue";
    this.pinCodeBoxes = [];
  }
}
