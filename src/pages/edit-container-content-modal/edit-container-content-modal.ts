import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the EditContainerContentModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-container-content-modal',
  templateUrl: 'edit-container-content-modal.html'
})
export class EditContainerContentModalPage {
  parsedData: any;
  containerSelectOptions: any;
  modeSelectOptions: any;
  tempData: any = {};
  vehicleTypes: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.parsedData = this.navParams.get('parsedData');
    console.log("parsed data for edit", this.parsedData);
    this.containerSelectOptions = {
      title: "Container Types",
      cssClass: "categorySelect"
    }

    this.modeSelectOptions = {
      title: "Delivery Modes",
      cssClass: "categorySelect"
    }

    for (var i = 0; i < 6; i++) {
      if (this.parsedData.contents[i].content == "Vehicles") {
        this.vehicleTypes = this.parsedData.contents[i].vehicles;
      }
    }
    for (var i = 0; i < this.parsedData.delivery_mode.length; i++) {
      if (this.parsedData.delivery_mode[i].selected) {
        this.tempData.delivery_mode = this.parsedData.delivery_mode[i].id;
      }
    }

    for (var i = 0; i < this.parsedData.size_of_container.length; i++) {
      if (this.parsedData.size_of_container[i].selected) {
        this.tempData.size_of_container = this.parsedData.size_of_container[i].id;
      }
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditContainerContentModalPage');
    this.parsedData = this.navParams.get('parsedData');
    console.log("parsed data for edit", this.parsedData);

    this.containerSelectOptions = {
      title: "Container Types",
      cssClass: "categorySelect"
    }

    this.modeSelectOptions = {
      title: "Delivery Modes",
      cssClass: "categorySelect"
    }
  }

  ionViewWillEnter() {

  }

  contentDetailClicked(index, obj) {
    console.log(obj);
    if (this.parsedData.contents[index].itemSelected == true) {
      if (this.parsedData.contents[index].content == "Vehicles") {
        this.parsedData.contents[index].show_vehicle_options = false;
      }

      else if (this.parsedData.contents[index].content === "Engines & Spare parts") {
        this.parsedData.contents[index].show_engine_options = false;
        this.parsedData.contents[index].quantity = "";
      }
      this.parsedData.contents[index].itemSelected = false;
      console.log("clicked1");
    }
    else {
      if (this.parsedData.contents[index].content == "Vehicles") {
        this.parsedData.contents[index].show_vehicle_options = true;
      }

      else if (this.parsedData.contents[index].content === "Engines & Spare parts") {
        this.parsedData.contents[index].show_engine_options = true;
      }
      this.parsedData.contents[index].itemSelected = true;
      console.log("clicked2");

    }


  }

  vehicleTypeClicked(index, obj) {
    console.log("clicked");
    if (this.vehicleTypes[index].itemSelected == true) {
      this.vehicleTypes[index].itemSelected = false;
      this.vehicleTypes[index].quantity = "";
      console.log("clicked1");
    }
    else {
      this.vehicleTypes[index].itemSelected = true;
      console.log("clicked2");
      this.showPrompt(index);

    }

  }

  showPrompt(index) {
    let prompt = this.alertCtrl.create({
      title: '',
      message: "Please enter the number of vehicles of this type",
      inputs: [
        {
          name: 'quantity',
          placeholder: 'Quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.vehicleTypes[index].quantity = data.quantity;

            console.log("edited array", this.vehicleTypes[index]);
          }
        }
      ]
    });
    prompt.present();
  }


  containerSelected() {
    for (var i = 0; i < this.parsedData.size_of_container.length; i++) {
      if (this.parsedData.size_of_container[i].id === this.tempData.size_of_container) {
        this.parsedData.size_of_container[i].selected = true;
      }
      else {
        this.parsedData.size_of_container[i].selected = false;
      }
    }
  }

  deliveryModeSelected() {
    for (var i = 0; i < this.parsedData.delivery_mode.length; i++) {
      if (this.parsedData.delivery_mode[i].id === this.tempData.delivery_mode) {
        this.parsedData.delivery_mode[i].selected = true;
      }
      else {
        this.parsedData.delivery_mode[i].selected = false;
      }
    }
  }

  miscDetailClicked(index, obj) {
    console.log(obj);
    if (this.parsedData.miscellaneous[index].itemSelected == true) {
      this.parsedData.miscellaneous[index].itemSelected = false;
      this.parsedData.miscellaneous[index].serviceId = "";
      console.log("clicked1");
    }
    else {
      this.parsedData.miscellaneous[index].itemSelected = true;
      this.parsedData.miscellaneous[index].serviceId = obj.id;
      console.log("clicked2");

    }
  }

  onBackTapped(event) {
    this.navCtrl.pop();
  }

  done() {
    console.log(this.parsedData);
    this.navCtrl.pop();
  }


}
