import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController } from "ionic-angular";
import { ShipmentInformationPage } from "../shipment-information/shipment-information";

/**
 * Generated class for the ShipListingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-ship-listings",
  templateUrl: "ship-listings.html"
})
export class ShipListingsPage {
  vesselInfo: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    const list:any[] = this.navParams.get("vesselData");
    this.vesselInfo = list.reverse();
    console.log(this.vesselInfo);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ShipListingsPage");
  }

  itemTapped(index: any) {
    this.navCtrl.push(ShipmentInformationPage, {
      vesselInfo: this.vesselInfo[index]
    });
    console.log(this.vesselInfo[index]);
  }

  backTapped(){
    this.viewCtrl.dismiss()
  }
}
