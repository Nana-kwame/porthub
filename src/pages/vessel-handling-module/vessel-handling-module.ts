import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, Content } from "ionic-angular";
import { CalculatedResultPage } from "../calculated-result/calculated-result";
import { Http } from "@angular/http";
import { AlertController } from "ionic-angular";
import { CalculatorPage } from "../calculator/calculator";

@Component({
  selector: "page-vessel-handling-module",
  templateUrl: "vessel-handling-module.html"
})
export class VesselHandlingModulePage {
  @ViewChild(Content) content: Content;

  purposeSelectOptions: any;
  vesselTypeSelectOptions: any;
  lengthOverallSelectOptions: any;
  vesselHandlingData: any = {};
  purposes: any;
  vesselTypes: any;
  lengthOveralls: any;
  tempLength: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    this.purposeSelectOptions = {
      title: "Call Purpose",
      cssClass: "categorySelect"
    };

    this.vesselTypeSelectOptions = {
      title: "Vessel Types",
      cssClass: "categorySelect"
    };
    this.http
      .post("http://52.176.108.222/item/rangeOfLOA", "")
      .map(res => res.json())
      .subscribe(data => {
        this.lengthOveralls = data.result;
        //   this.lengthOveralls=this.lengthOveralls.sort((a: any, b: any) => {
        //   if (a.fromQuantity < b.fromQuantity) {
        //     return -1;
        //   } else if (a.fromQuantity > b.fromQuantity) {
        //     return 1;
        //   } else {
        //     return 0;
        //   }
        // });
        console.log(this.lengthOveralls);
      });
    this.http
      .post("http://52.176.108.222/callPurpose/searchAll", "")
      .map(res => res.json())
      .subscribe(data => {
        this.purposes = data.result;
        console.log("What is in the purpose call: ", this.purposes);
        this.content.resize();
      });
    this.lengthOverallSelectOptions = {
      title: "Length Overall",
      cssClass: "categorySelect"
    };

    this.vesselTypes = [
      {
        name: "Bulk Carriers"
      },
      {
        name: "Containers"
      },
      {
        name: "Cruise Vessels"
      },
      {
        name: "General Cargo"
      },
      {
        name: "Naval Vessels"
      },
      {
        name: "Passenger Vessels"
      },
      {
        name: "Research Vessels"
      },
      {
        name: "Row Row"
      },
      {
        name: "Supply and Support"
      },
      {
        name: "Tankers"
      }
    ];

    console.log("Vessel Page loaded");
  }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll(".tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map(key => {
        tabs[key].style.transform = "translateY(56px)";
      });
    } //
  }

  ionViewWillLeave() {
    let tabs = document.querySelectorAll(".tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map(key => {
        tabs[key].style.transform = "translateY(0)";
      });
    } //
  }
  onBackTapped(event) {
    this.navCtrl.pop();
  }

  goToCalculatorResult(event) {
    console.log("Calc data", this.vesselHandlingData);
    if (this.vesselHandlingData.cpName === "Anchorage") {
      this.vesselHandlingData.lengthId = "a";
      this.vesselHandlingData.vessel = "b";
    }
    if (
      !this.vesselHandlingData.duration ||
      !this.vesselHandlingData.grossTonnage ||
      !this.vesselHandlingData.lengthId ||
      !this.vesselHandlingData.vessel
    ) {
      this.showAlert();
    } else if (
      this.vesselHandlingData.cpName === "Anchorage" &&
      this.vesselHandlingData.duration < 1
    ) {
      this.showAnchorageDurationAlert();
    } else if (
      this.vesselHandlingData.cpName != "Anchorage" &&
      this.vesselHandlingData.duration < 3
    ) {
      this.showDurationAlert();
    } else {
      this.vesselHandlingData.grossTonnage = parseFloat(
        this.vesselHandlingData.grossTonnage
      );
      this.vesselHandlingData.duration = parseFloat(
        this.vesselHandlingData.duration
      );
      this.vesselHandlingData.dateCreated = new Date();
      // this.tempLength=this.vesselHandlingData.lengthId;

      if (this.vesselHandlingData.cpName === "Anchorage") {
        this.vesselHandlingData.lengthId = "";
        this.vesselHandlingData.vessel = "";
      } else {
        console.log("checks", this.tempLength.fromQuantity);
        if (this.tempLength.fromQuantity < 250) {
          this.vesselHandlingData.length =
            "Between " +
            this.tempLength.fromQuantity +
            "m and " +
            this.tempLength.toQuantity +
            "m";
        } else {
          this.vesselHandlingData.length =
            "above " + this.tempLength.fromQuantity;
        }
        if (
          this.vesselHandlingData.vessel == "Tankers" ||
          this.vesselHandlingData.vessel == "Bulk Carriers"
        ) {
          this.vesselHandlingData.vesselType = "Tanker & Bulk Carriers";
        } else {
          this.vesselHandlingData.vesselType = "General";
        }
      }
      console.log("Calc data", this.vesselHandlingData);
      this.navCtrl.push(CalculatedResultPage, {
        data: this.vesselHandlingData
      });
    }
  }

  changer(value) {
    if (value === 1000000000) {
      return "";
    } else {
      return " - " + value;
    }
  }

  addAbove(value) {
    return "above " + value;
  }

  changerMeasurement(value) {
    if (value > 250) {
      return "";
    } else {
      return "m";
    }
  }

  onLOAChange(event, object) {
    this.lengthOveralls.filter(v => {
      // console.log("v", v);
      if (v.id.indexOf(this.vesselHandlingData.lengthId) > -1) {
        this.tempLength = v;
        return true;
      }
      // console.log(this.tempLength);
      // return false;
    });
  }

  onCallPurposeChange(event) {
    this.purposes.filter(v => {
      // console.log("v", v);
      if (v.id.indexOf(this.vesselHandlingData.callPurposeId) > -1) {
        this.vesselHandlingData.cpName = v.purpose;
        return true;
      }
      // console.log(this.tempLength);
      // return false;
    });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      subTitle: "Please fill all fields of the form",
      buttons: ["OK"]
    });
    alert.present();
  }

  showDurationAlert() {
    let alert = this.alertCtrl.create({
      subTitle: "Duration must be a minimum of 3 days",
      buttons: ["OK"]
    });
    alert.present();
  }

  showAnchorageDurationAlert() {
    let alert = this.alertCtrl.create({
      subTitle: "Duration must be a minimum of 1 day",
      buttons: ["OK"]
    });
    alert.present();
  }

  navToRoot(event) {
    localStorage.setItem("itemsList", JSON.stringify([]));
    this.navCtrl.popToRoot();
  }
}
