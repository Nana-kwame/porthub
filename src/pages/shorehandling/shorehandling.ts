import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CongratulationsPage } from '../congratulations/congratulations';
import { Http } from '@angular/http';
import { ContentDetailsPage } from '../content-details/content-details'
import { ShoreHandlingSummaryPage } from '../shore-handling-summary/shore-handling-summary';
import { CalculatorPage } from '../calculator/calculator';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-shorehandling',
  templateUrl: 'shorehandling.html'
})
export class ShorehandlingPage {
  activityTypes: any;
  activitySelectOptions: any;
  modeSelectOptions: any;
  containerSelectOptions: any;
  selected_data: any = {};
  containerTypes: any;
  deliveryModes: any;
  deliveryTypes: any;
  builtData: any;
  hide_imex: boolean = false;
  clipboardCount: any;
  temp_data: any = {};
  show_back: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController) {

    this.builtData = JSON.parse(localStorage.getItem("final_content_json"));
    console.log("checker", this.builtData);
    if (this.builtData.imex) {
      this.hide_imex = true;
      this.selected_data.imex = "N/A";
    }

    this.http.post(localStorage.getItem("liveURL") + 'ActivityType/searchAll', "").map(res => res.json()).subscribe(data => {
      this.activityTypes = data.result;
      localStorage.setItem("activity types", JSON.stringify(this.activityTypes));
      console.log(this.activityTypes);
    })

    this.http.post(localStorage.getItem("liveURL") + 'ContainerSize/searchAll', "").map(res => res.json()).subscribe(data => {
      this.containerTypes = data.result;
      localStorage.setItem("container types", JSON.stringify(this.containerTypes));
      console.log(this.containerTypes);
    })

    // this.http.post(localStorage.getItem("liveURL") + 'DeliveryType/searchAll', "").map(res => res.json()).subscribe(data => {
    //   this.deliveryTypes = data.result;
    //   localStorage.setItem("delivery types", JSON.stringify(this.deliveryTypes));
    //   console.log(this.deliveryTypes);
    // })

    this.http.post(localStorage.getItem("liveURL") + 'DeliveryMode/searchAll', "").map(res => res.json()).subscribe(data => {
      this.deliveryModes = data.result;
      localStorage.setItem("delivery modes", JSON.stringify(this.deliveryModes));
      console.log(this.deliveryModes);
    })




    this.activitySelectOptions = {
      title: "Activity Types",
      cssClass: "categorySelect"
    }

    this.containerSelectOptions = {
      title: "Container Types",
      cssClass: "categorySelect"
    }

    // this.activitySelectOptions = {
    //   title: "Activity Types",
    //   cssClass: "categorySelect"
    // }

    this.modeSelectOptions = {
      title: "Delivery Modes",
      cssClass: "categorySelect"
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShorehandlingPage');
    // if(localStorage.getItem("show_alert")==="true"){
    //   this.showConfirm();
    // }

  }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.transform = 'translateY(56px)';
      });
    } //
    this.clipboardCount = JSON.parse(localStorage.getItem("final_content_json")).calculable_containers.length;
    this.show_back = localStorage.getItem("show_back");
    console.log(this.clipboardCount);
    console.log(this.show_back);
    if(localStorage.getItem("show_alert")=="true"){
      this.showConfirm();
    }

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

  generateInvoiceTapped(event) {
    this.navCtrl.push(CongratulationsPage);
  }

  navToRoot(event) {
    localStorage.setItem("final_content_json", JSON.stringify({ "imex": "", "calculable_containers": [] }));
   localStorage.setItem("show_back", "true");
   this.navCtrl.popToRoot();
 }

  activitySelected() {
    for (var i = 0; i < this.activityTypes.length; i++) {
      if (this.activityTypes[i].id === this.temp_data.imex) {
        this.activityTypes[i].selected = true;
      }
      else {
        this.activityTypes[i].selected = false;
      }
    }
  }

  containerSelected() {
    for (var i = 0; i < this.containerTypes.length; i++) {
      if (this.containerTypes[i].id === this.temp_data.size_of_container) {
        this.containerTypes[i].selected = true;
      }
      else {
        this.containerTypes[i].selected = false;
      }
    }
  }

  deliveryModeSelected() {
    for (var i = 0; i < this.deliveryModes.length; i++) {
      if (this.deliveryModes[i].id === this.temp_data.delivery_mode) {
        this.deliveryModes[i].selected = true;
      }
      else {
        this.deliveryModes[i].selected = false;
      }
    }
  }

  goToContentDetails() {
    this.selected_data.imex = this.activityTypes;
    this.selected_data.size_of_container = this.containerTypes;
    this.selected_data.delivery_mode = this.deliveryModes;
    this.selected_data.number_of_bl = parseFloat(this.selected_data.number_of_bl);
    this.selected_data.storage_period = parseFloat(this.selected_data.storage_period);
    console.log(this.selected_data);
    localStorage.setItem("show_alert", "false");
    this.navCtrl.push(ContentDetailsPage, { parsedData: this.selected_data });
  }

  goToClipboard() {
    this.navCtrl.push(ShoreHandlingSummaryPage)
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Invoice Entry Created.',
      message: 'Do you want to add another?',
      cssClass:"categorySelect",
      buttons: [
        {
          text: 'No',
          handler: () => {
            localStorage.setItem("show_alert", "false");
            this.navCtrl.push(ShoreHandlingSummaryPage)
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }



}
