import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DryBulkModulePage } from '../dry-bulk-module/dry-bulk-module'
import { LiquidBulkModulePage } from '../liquid-bulk-module/liquid-bulk-module'
import { BreakBulkModulePage } from '../break-bulk-module/break-bulk-module'
import { ContainerModulePage } from '../container-module/container-module'
import { VehicleModulePage } from '../vehicle-module/vehicle-module'
import { Http } from '@angular/http';
import { CheckData } from '../../providers/check-data';
import { ModuleSummaryAndEditPage } from '../module-summary-and-edit/module-summary-and-edit'
import { StevedorAndPortDuesResultPage } from '../stevedor-and-port-dues-result/stevedor-and-port-dues-result'
import { CalculatorPage } from '../calculator/calculator';





/*
  Generated class for the PortDuesAndStevedoreCharges page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-port-dues-and-stevedore-charges',
  templateUrl: 'port-dues-and-stevedore-charges.html',
  providers: [CheckData]
})
export class PortDuesAndStevedoreChargesPage {
  activityTypes: any;
  cargoTypes: any;
  activitySelectOptions: any;
  cargoSelectOptions: any;
  selectedActivity: any;
  selectedCargoType: string;
  loading: boolean;
  checker: boolean;
  temp: any;
  clipboardCount: any;
  dryBulkData: any;
  liquidBulkData: any;
  breakBulkData: any;
  vehicleData: any;
  containerData: any;
  finalData: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public checkData: CheckData) {
    this.dryBulkData = JSON.parse(localStorage.getItem("dryBulkData"));
    this.liquidBulkData = JSON.parse(localStorage.getItem("liquidBulkData"));
    this.vehicleData = JSON.parse(localStorage.getItem("vehicleData"));
    this.containerData = JSON.parse(localStorage.getItem("containerData"));
    this.breakBulkData = JSON.parse(localStorage.getItem("breakBulkData"));
    this.http.post(localStorage.getItem("liveURL") + 'activity/searchAll', "").map(res => res.json()).subscribe(data => {
      this.activityTypes = data.result;
      // console.log(this.categoryTypes);
    })
    console.log("checker", localStorage.getItem("selectedActivity"))
    if (localStorage.getItem("selectedActivity")) {
      this.checker = true;
      this.selectedActivity = localStorage.getItem("selectedActivity");
    }
    this.cargoTypes = [
      {
        cargoTypeName: "Break Bulk",
        id: "1"
      },
      {
        cargoTypeName: "Containers",
        id: "2"
      },
      {
        cargoTypeName: "Dry Bulk",
        id: "3"
      },
      {
        cargoTypeName: "Liquid Bulk",
        id: "4"
      },
      {
        cargoTypeName: "Vehicles",
        id: "5"
      }
    ]

    for (var i = 0; i < this.cargoTypes.length; i++) {
      this.cargoTypes[i].show = true;
    }

    console.log(this.cargoTypes);

    // if (localStorage.getItem("dryBulkData") || localStorage.getItem("liquidBulkData") || localStorage.getItem("breakBulkData") || localStorage.getItem("containerData") || localStorage.getItem("vehicleData")) {
    //   for (var i = 0; i < this.cargoTypes.length; i++) {
    //     if (this.cargoTypes[i].cargoTypeName == "Liquid Bulk" && localStorage.getItem("liquidBulkData")!="") {
    //       this.cargoTypes[i].show = false;
    //     }
    //   }
    // }

    if (localStorage.getItem("liquidBulkData")) {
      console.log("1", this.liquidBulkData);
      for (let i = 0; i < this.cargoTypes.length; i++) {
        if (this.cargoTypes[i].cargoTypeName == "Liquid Bulk" && this.liquidBulkData!='') {
          this.cargoTypes[i].show = false;
        }
      }
    }

    this.activitySelectOptions = {
      title: "Activity Types",
      cssClass: "categorySelect"
    }
    this.cargoSelectOptions = {
      title: "Cargo Types",
      cssClass: "categorySelect"
    }
    console.log(this.cargoTypes);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PortDuesAndStevedoreChargesPage');
    this.clipboardCount = localStorage.getItem("clipboardDataCount");

  }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.transform = 'translateY(56px)';
      });
    } //
  }

  ionViewWillLeave() {
    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.transform = 'translateY(0)';
      });
    } //
  }

  onBackTapped(event) {
    this.navCtrl.pop();
  }

  goToCargoType(event) {
    console.log(this.selectedCargoType);
    // console.log("data", this.temp);
    localStorage.setItem('selectedActivity', this.selectedActivity);
    if (this.selectedCargoType === "1") {

      this.navCtrl.push(BreakBulkModulePage)
    }
    else if (this.selectedCargoType === "2") {
      this.navCtrl.push(ContainerModulePage)
    }
    else if (this.selectedCargoType === "3") {
      this.navCtrl.push(DryBulkModulePage)
    }
    else if (this.selectedCargoType === "4") {
      this.navCtrl.push(LiquidBulkModulePage)
    }
    else if (this.selectedCargoType === "5") {
      this.navCtrl.push(VehicleModulePage)
    }
  }

  goToClipboard() {
    this.navCtrl.push(ModuleSummaryAndEditPage);
  }

  goToResultsPage() {
    this.finalData.activityId = localStorage.getItem("selectedActivity");
    if (this.dryBulkData) {
      this.finalData.dryBulk = this.dryBulkData;
    }
    if (this.liquidBulkData) {
      this.finalData.liquidBulk = this.liquidBulkData;
    }
    if (this.breakBulkData) {
      this.finalData.breakBulk = this.breakBulkData;
    }
    if (this.vehicleData) {
      this.finalData.vehicle = this.vehicleData;
    }
    if (this.containerData) {
      this.finalData.container = this.containerData;
    }

    console.log(this.finalData);
    this.navCtrl.push(StevedorAndPortDuesResultPage, { data: this.finalData });
  }

  checks(){
    console.log(this.selectedActivity);
  }
  navToRoot(event) {
    localStorage.setItem('clipboardDataCount', JSON.stringify(0));
    localStorage.setItem('dryBulkData', JSON.stringify([]));
    localStorage.setItem('liquidBulkData', JSON.stringify(""));
    localStorage.setItem('containerData', JSON.stringify([]));
    localStorage.setItem('breakBulkData', JSON.stringify([]));
    localStorage.setItem('vehicleData', JSON.stringify([]));
    localStorage.removeItem('selectedActivity');
    this.navCtrl.popToRoot();
  }
}
