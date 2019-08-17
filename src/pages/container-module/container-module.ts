import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ModuleSummaryAndEditPage } from '../module-summary-and-edit/module-summary-and-edit'
import { PortDuesAndStevedoreChargesPage } from '../port-dues-and-stevedore-charges/port-dues-and-stevedore-charges';
import { CalculatorPage } from '../calculator/calculator';

/*
  Generated class for the ContainerModule page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-container-module',
  templateUrl: 'container-module.html'
})
export class ContainerModulePage {

  open_card: boolean;
  containerStatusIds: any;
  selectOptions: any;
  containerTypes: any = [];
  loading: boolean = true;
  containerData:any={};
  statusSelectOptions:any;
  containerDataArray: any = [];
  counter: number;
  clipboardCount:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.clipboardCount=localStorage.getItem("clipboardDataCount");
    this.containerTypes= [
      {
        name: "Container up to 20 feet",
        id: "1"
      },
      {
        name: "Container between 20 to 40 feet",
        id: "2"
      },
      {
        name: "Container above 40 feet",
        id: "3"
      }
    ]

    this.http.post(localStorage.getItem("liveURL") + 'ContainerStatus/searchAll', "").map(res => res.json()).subscribe(data => {
      // this.activityTypes = data.result;
      this.containerStatusIds = data.result;
      console.log("status", this.containerStatusIds);
      
    })



    this.selectOptions = {
      title: "Container Types",
      cssClass: "categorySelect"
    }

    this.statusSelectOptions = {
      title: "Container Status",
      cssClass: "categorySelect"
    }
    
  }

  ionViewWillLoad() {

    // this.vehicleTypes = [
    //   {
    //     vehicleTypeName: "Mini Vehicles",
    //     id: 1
    //   },
    //   {
    //     vehicleTypeName: "Saloon Vehicles",
    //     id: 2
    //   },
    //   {
    //     vehicleTypeName: "Trailer Vehicles",
    //     id: 3
    //   },
    //   {
    //     vehicleTypeName: "Utility Vehicles",
    //     id: 4
    //   }
    // ]


  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
     this.clipboardCount=localStorage.getItem("clipboardDataCount");
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

  openCard(event, container) {
    container.open = !container.open;
  }

  goToSummary() {
    console.log(this.containerData);
    this.counter = parseFloat(localStorage.getItem("clipboardDataCount"));
    this.counter++;
    localStorage.setItem('clipboardDataCount', JSON.stringify(this.counter));
    if (!(JSON.parse(localStorage.getItem("containerData")))) {
      this.containerDataArray.push(this.containerData);
      localStorage.setItem('containerData', JSON.stringify(this.containerDataArray));
    }
    else {
      this.containerDataArray = JSON.parse(localStorage.getItem("containerData"));
      this.containerDataArray.push(this.containerData);
      localStorage.setItem('containerData', JSON.stringify(this.containerDataArray));
    }
    this.navCtrl.push(ModuleSummaryAndEditPage)
  }

  onBackTapped(event) {
    this.navCtrl.pop();
  }

  pickContainerName(container){
    // console.log(break_bulk);
    for(var i=0; i<this.containerTypes.length; i++){
      if(this.containerTypes[i].id==container){
        this.containerData.name=this.containerTypes[i].name;
      }
    }
    
  }

  pickContainerStatusName(containerStatus){
    // console.log(danger)
    for(var i=0; i<this.containerStatusIds.length; i++){
      if(this.containerStatusIds[i].id==containerStatus){
        this.containerData.containerStatusName=this.containerStatusIds[i].container;
      }
    }
    // this.breakBulkData.dangerName=danger.name;
  }

   goToClipboard(){
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
