import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";

/*
  Generated class for the ShipmentInformation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: "page-shipment-information",
  templateUrl: "shipment-information.html"
})
export class ShipmentInformationPage {
  vesselInfo: any;
  latestVesselInfo : any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.vesselInfo = this.navParams.get("vesselInfo");
    console.log('The vessel information: ', this.vesselInfo);

  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ShipmentInformationPage");
    // this.latestVesselInfo = this.vesselInfo.pop();

  }

  closeTapped() {
    // this.viewCtrl.dismiss();
    this.navCtrl.pop();
  }
}
