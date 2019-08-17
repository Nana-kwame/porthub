import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PortDuesAndStevedoreChargesPage } from '../port-dues-and-stevedore-charges/port-dues-and-stevedore-charges';
import { StevedorAndPortDuesResultPage } from '../stevedor-and-port-dues-result/stevedor-and-port-dues-result'
import { DryBulkModuleModalPage } from '../dry-bulk-module-modal/dry-bulk-module-modal'
import { LiquidBulkModuleModalPage } from '../liquid-bulk-module-modal/liquid-bulk-module-modal'
import { BreakBulkModuleModalPage } from '../break-bulk-module-modal/break-bulk-module-modal'
import { ContainerModuleModalPage } from '../container-module-modal/container-module-modal'
import { VehicleModuleModalPage } from '../vehicle-module-modal/vehicle-module-modal'



/*
  Generated class for the ModuleSummaryAndEdit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-module-summary-and-edit',
  templateUrl: 'module-summary-and-edit.html'
})
export class ModuleSummaryAndEditPage {
  dryBulkData: any;
  liquidBulkData: any;
  breakBulkData: any;
  vehicleData: any;
  containerData: any;
  finalData: any = {};
  finalVehicleData: any = [];
  tempVehicleData: any;
  finalContainerData: any = [];
  tempContainerData: any;
  finalDryBulkData: any = [];
  tempDryBulkData: any;
  showBBData: boolean = true;
  showCData: boolean = true;
  showDBData: boolean = true;
  showLBData: boolean = true;
  showVData: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModuleSummaryAndEditPage');
    this.dryBulkData = JSON.parse(localStorage.getItem("dryBulkData"));
    this.liquidBulkData = JSON.parse(localStorage.getItem("liquidBulkData"));
    this.vehicleData = JSON.parse(localStorage.getItem("vehicleData"));
    this.containerData = JSON.parse(localStorage.getItem("containerData"));
    this.breakBulkData = JSON.parse(localStorage.getItem("breakBulkData"));
    console.log(this.vehicleData);
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

  onBackTapped() {
    let liquidSize;
    if (this.liquidBulkData === "") {
      liquidSize = 0;
    }
    else {
      liquidSize = 1;
    }

    localStorage.setItem('clipboardDataCount', JSON.stringify(this.breakBulkData.length + this.containerData.length + this.dryBulkData.length + this.vehicleData.length + liquidSize));
    localStorage.setItem('breakBulkData', JSON.stringify(this.breakBulkData));
    localStorage.setItem('containerData', JSON.stringify(this.containerData));
    localStorage.setItem('dryBulkData', JSON.stringify(this.dryBulkData));
    localStorage.setItem('liquidBulkData', JSON.stringify(this.liquidBulkData));
    localStorage.setItem('vehicleData', JSON.stringify(this.vehicleData));
    this.navCtrl.pop();
  }

  goToPortDuesPage() {
    var liquidSize;
    if (this.liquidBulkData === "") {
      liquidSize = 0;
    }
    else {
      liquidSize = 1;
    }

    localStorage.setItem('clipboardDataCount', JSON.stringify(this.breakBulkData.length + this.containerData.length + this.dryBulkData.length + this.vehicleData.length + liquidSize));
    localStorage.setItem('breakBulkData', JSON.stringify(this.breakBulkData));
    localStorage.setItem('containerData', JSON.stringify(this.containerData));
    localStorage.setItem('dryBulkData', JSON.stringify(this.dryBulkData));
    localStorage.setItem('liquidBulkData', JSON.stringify(this.liquidBulkData));
    localStorage.setItem('vehicleData', JSON.stringify(this.vehicleData));
    this.navCtrl.push(PortDuesAndStevedoreChargesPage);
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

  removeBreakBulkItem(index) {
    this.breakBulkData.splice(index);
    if (this.breakBulkData.length == 0) {
      this.showBBData = false;
    }
    else {
      this.showBBData = true;
    }
    console.log("cut remainder", this.breakBulkData);
  }

  removeContainerItem(index) {
    this.containerData.splice(index);
    if (this.containerData.length == 0) {
      this.showCData = false;
    }
    else {
      this.showCData = true;
    }
    console.log("cut remainder", this.containerData);
  }

  removeDryBulkItem(index) {
    this.dryBulkData.splice(index);
    if (this.dryBulkData.length == 0) {
      this.showDBData = false;
    }
    else {
      this.showDBData = true;
    }
    console.log("cut remainder", this.dryBulkData);
  }

  removeLiquidBulkItem() {
    this.liquidBulkData = "";
    this.showLBData = false;
    console.log("cut remainder", this.liquidBulkData);
  }

  removeVehicleItem(index) {
    this.vehicleData.splice(index);
    if (this.vehicleData.length == 0) {
      this.showVData = false;
    }
    else {
      this.showVData = true;
    }
    console.log("cut remainder", this.vehicleData);
  }

  editBreakBulkModal(index) {
    let breakBulkModal = this.modalCtrl.create(BreakBulkModuleModalPage, { parsedData: { index: index, data: this.breakBulkData } });
    breakBulkModal.present();
  }

  editContainerModal(index) {
    let containerModal = this.modalCtrl.create(ContainerModuleModalPage, { parsedData: { index: index, data: this.containerData } });
    containerModal.present();
  }

  editDryBulkModal(index) {
    let dryBulkModal = this.modalCtrl.create(DryBulkModuleModalPage, { parsedData: { index: index, data: this.dryBulkData } });
    dryBulkModal.present();
  }

  editLiquidBulkModal(index) {
    let liquidBulkModal = this.modalCtrl.create(LiquidBulkModuleModalPage, { parsedData: this.liquidBulkData});
    liquidBulkModal.present();
  }

  editVehicleModal(index) {
    let vehicleModal = this.modalCtrl.create(VehicleModuleModalPage, { parsedData: { index: index, data: this.vehicleData } });
    vehicleModal.present();
  }

  shorten(text) {
    var ret = text;
    if (ret.length > 32) {
        ret = ret.substr(0,32-3) + "...";
    }
    return ret;
}

}
