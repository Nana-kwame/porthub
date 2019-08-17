import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ShorehandlingPage } from '../shorehandling/shorehandling';
import { ShoreHandlingInvoicePage } from '../shore-handling-invoice/shore-handling-invoice';
import { EditContainerContentModalPage } from '../edit-container-content-modal/edit-container-content-modal';

/*
  Generated class for the ShoreHandlingSummary page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shore-handling-summary',
  templateUrl: 'shore-handling-summary.html'
})
export class ShoreHandlingSummaryPage {
  builtData: any;
  activityTypes: any;
  activitySelectOptions: any;
  containerTypes: any;
  deliveryTypes: any;
  deliveryModes: any;
  selectedDeliveryMode: any;
  selectedContainerSize: any;
  tempData: any = {};
  data_to_calculate: any = {};
  innerData: any = {};
  innerVehicleObj: any = {};
  innerVehicleArray: any = [];
  innerMiscObj: any = {};
  innerMiscArray: any = [];
  calculableContinerArray: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public modalCtrl: ModalController) {
    this.builtData = JSON.parse(localStorage.getItem("final_content_json"));
    console.log(this.builtData);
    this.activitySelectOptions = {
      title: "Activity Types",
      cssClass: "categorySelect"
    }

  }

  ionViewDidLoad() {
    var self = this;
    this.builtData = JSON.parse(localStorage.getItem("final_content_json"));
    console.log('ionViewDidLoad ShoreHandlingSummaryPage', this.builtData.calculable_containers[0].size_of_container);

    this.activityTypes = this.builtData.imex;
    // this.activityTypes = JSON.parse(localStorage.getItem("activity types"));
    console.log(this.activityTypes);
    // this.autoSelector(this.activityTypes, this.builtData.imex);



    console.log(this.builtData);
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
    if (this.builtData.calculable_containers.length < 1) {
      localStorage.setItem("final_content_json", JSON.stringify({ "imex": "", "calculable_containers": [] }));

    }
    else {
      localStorage.setItem("final_content_json", JSON.stringify(this.builtData));
    }

    this.navCtrl.pop();
  }

  autoSelector(dataArray, id) {
    for (var i = 0; i < dataArray.length; i++) {
      if (dataArray[i].id === id) {
        dataArray[i].selected = true;
      }
    }
    console.log("new array", dataArray);
    // console.log("new activity obj", this.activityTypes);
  }

  // activitySelected() {
  //   console.log(this.builtData)
  // }

  activitySelected() {
    for (var i = 0; i < this.builtData.imex.length; i++) {
      if (this.builtData.imex[i].id === this.tempData.imex) {
        this.builtData.imex[i].selected = true;
      }
      else {
        this.builtData.imex[i].selected = false;
      }
    }
  }

  openEditModal(calculable) {
    let modal = this.modalCtrl.create(EditContainerContentModalPage, { parsedData: calculable });
    modal.present();
  }

  deleteEntry(index) {
    this.builtData.calculable_containers.splice(index, 1);
    // if (this.builtData.calculable_containers.length === 0) {
    //   this.builtData = { "imex": "", "calculable_containers": [] };
    //   console.log(this.builtData);
    // }
  }

  continueEditing() {
    localStorage.setItem("final_content_json", JSON.stringify(this.builtData));
    localStorage.setItem("show_back", "false");
    this.navCtrl.push(ShorehandlingPage);
    localStorage.setItem("show_alert", "false");
  }

  generate() {
    localStorage.setItem("show_alert", "false");
    this.data_to_calculate = {};
    this.innerData = {};
    this.innerVehicleObj = {};
    this.innerMiscObj = {};
    this.innerMiscArray = [];
    this.innerVehicleArray = [];
    this.calculableContinerArray = [];


    console.log(this.builtData);
    for (var i = 0; i < this.builtData.imex.length; i++) {
      if (this.builtData.imex[i].selected) {
        this.data_to_calculate.imex = this.builtData.imex[i].id;
      }
    }
    for (var i = 0; i < this.builtData.calculable_containers.length; i++) {
      this.innerData = {};
      this.innerVehicleObj = {};
      this.innerMiscObj = {};
      this.innerMiscArray = [];
      this.innerVehicleArray = [];
      //Picking out the container size
      for (var j = 0; j < this.builtData.calculable_containers[i].size_of_container.length; j++) {
        if (this.builtData.calculable_containers[i].size_of_container[j].selected) {
          this.innerData.size_of_container = this.builtData.calculable_containers[i].size_of_container[j].id;
        }
      }
      //Picking out the delivery mode
      for (var j = 0; j < this.builtData.calculable_containers[i].delivery_mode.length; j++) {
        if (this.builtData.calculable_containers[i].delivery_mode[j].selected) {
          this.innerData.delivery_mode = this.builtData.calculable_containers[i].delivery_mode[j].id;
        }
      }
      //Picking out the number of bl and storage period
      this.innerData.number_of_bl = this.builtData.calculable_containers[i].number_of_bl;
      this.innerData.storage_period = this.builtData.calculable_containers[i].storage_period;
      this.innerData.contents = {};

      //Picking out Contents
      for (var j = 0; j < this.builtData.calculable_containers[i].contents.length; j++) {
        if (this.builtData.calculable_containers[i].contents[j].itemSelected) {
          if (this.builtData.calculable_containers[i].contents[j].content === "Vehicles") {
            // this.data_to_calculate.contents
            for (var k = 0; k < this.builtData.calculable_containers[i].contents[j].vehicles.length; k++) {
              this.innerVehicleObj = {};
              if (this.builtData.calculable_containers[i].contents[j].vehicles[k].itemSelected) {
                this.innerVehicleObj.vehicleId = this.builtData.calculable_containers[i].contents[j].vehicles[k].id;
                this.innerVehicleObj.quantity = this.builtData.calculable_containers[i].contents[j].vehicles[k].quantity;
                this.innerVehicleArray.push(this.innerVehicleObj);
              }

            }
            this.innerData.contents.vehicle = this.innerVehicleArray;
          }
          if (this.builtData.calculable_containers[i].contents[j].content === "Engines & Spare parts") {
            this.innerData.contents.engines_and_spare_parts = this.builtData.calculable_containers[i].contents[j].quantity;
          }
          if (this.builtData.calculable_containers[i].contents[j].content === "Personal Effects") {
            this.innerData.contents.personal_effects = true;
          }
          if (this.builtData.calculable_containers[i].contents[j].content === "DG I") {
            this.innerData.contents.dgI = true;
          }
          if (this.builtData.calculable_containers[i].contents[j].content === "DG II") {
            this.innerData.contents.dgII = true;
          }
          if (this.builtData.calculable_containers[i].contents[j].content === "Plant & Equipment") {
            this.innerData.contents.plants_and_equipment = true;
          }
        }
      }

      //Picking out Misc
      for (var j = 0; j < this.builtData.calculable_containers[i].miscellaneous.length; j++) {
        if (this.builtData.calculable_containers[i].miscellaneous[j].itemSelected) {
          this.innerMiscObj.serviceId = this.builtData.calculable_containers[i].miscellaneous[j].id;
          this.innerMiscObj.quantity = this.builtData.calculable_containers[i].miscellaneous[j].quantity;
          this.innerMiscArray.push(this.innerMiscObj);
        }
        this.innerData.miscellaneous = this.innerMiscArray;
      }
      this.calculableContinerArray.push(this.innerData);
    }
    this.data_to_calculate.calculable_containers = this.calculableContinerArray;
    console.log("final data", this.data_to_calculate);
    this.navCtrl.push(ShoreHandlingInvoicePage, { parsedData: this.data_to_calculate });
  }







}
