import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ModuleSummaryAndEditPage } from '../module-summary-and-edit/module-summary-and-edit'
import { PortDuesAndStevedoreChargesPage } from '../port-dues-and-stevedore-charges/port-dues-and-stevedore-charges';
import { CalculatorPage } from '../calculator/calculator';

@Component({
  selector: 'page-vehicle-module',
  templateUrl: 'vehicle-module.html',

})
export class VehicleModulePage {
  open_card: boolean;
  vehicleStatuses: any;
  selectOptions: any;
  vehicleTypes: any = [];
  loading: boolean = true;
  vehicleData: any = {};
  statusSelectOptions: any;
  vehicleDataArray: any = [];
  counter: number;
  clipboardCount: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.clipboardCount = localStorage.getItem("clipboardDataCount");
    this.vehicleStatuses = [
      {
        vehicleStatusName: "Driveable",
        vehicleStatus: "D01"
      },
      {
        vehicleStatusName: "Non-driveable",
        vehicleStatus: "D02"
      },
      {
        vehicleStatusName: "Stuffed driveable",
        vehicleStatus: "D03"
      },
      {
        vehicleStatusName: "Stuffed Non-driveable",
        vehicleStatus: "D04"
      }
    ]

    this.http.post(localStorage.getItem("liveURL") + 'item/vehicleList', "").map(res => res.json()).subscribe(data => {
      this.vehicleTypes = data.result;
      for (var i = 0; i < this.vehicleTypes.length; i++) {
        console.log("in loop")
        this.vehicleTypes[i].open = false;
      }
      console.log('ionViewDidLoad VehicleModulePage', this.vehicleTypes);
    })



    this.selectOptions = {
      title: "Vehicle Types",
      cssClass: "categorySelect"
    }

    this.statusSelectOptions = {
      title: "Vehicle Status",
      cssClass: "categorySelect"
    }
  }

  ionViewWillLoad() {
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.clipboardCount = localStorage.getItem("clipboardDataCount");
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
    }
  }

  openCard(event, vehicle) {
    vehicle.open = !vehicle.open;
  }

  goToSummary() {
    console.log(this.vehicleData);
    this.counter = parseFloat(localStorage.getItem("clipboardDataCount"));
    this.counter++;
    localStorage.setItem('clipboardDataCount', JSON.stringify(this.counter));
    if (!(JSON.parse(localStorage.getItem("vehicleData")))) {
      this.vehicleDataArray.push(this.vehicleData);
      localStorage.setItem('vehicleData', JSON.stringify(this.vehicleDataArray));
    }
    else {
      this.vehicleDataArray = JSON.parse(localStorage.getItem("vehicleData"));
      this.vehicleDataArray.push(this.vehicleData);
      localStorage.setItem('vehicleData', JSON.stringify(this.vehicleDataArray));
    }
    this.navCtrl.push(ModuleSummaryAndEditPage)
  }

  onBackTapped(event) {
    this.navCtrl.pop();
  }

  pickVehicleName(vehicle) {
    for (var i = 0; i < this.vehicleTypes.length; i++) {
      if (this.vehicleTypes[i].id == vehicle) {
        this.vehicleData.name = this.vehicleTypes[i].item;
      }
    }

  }

  pickVehicleStatusName(vehicle_status) {
    for (var i = 0; i < this.vehicleStatuses.length; i++) {
      if (this.vehicleStatuses[i].vehicleStatus == vehicle_status) {
        this.vehicleData.vehicleStatusName = this.vehicleStatuses[i].vehicleStatusName;
      }
    }
  }

  goToClipboard() {
    this.navCtrl.push(ModuleSummaryAndEditPage);
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
