import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModuleSummaryAndEditPage } from '../module-summary-and-edit/module-summary-and-edit'
import { Http } from '@angular/http';
import { PortDuesAndStevedoreChargesPage } from '../port-dues-and-stevedore-charges/port-dues-and-stevedore-charges';
import { CalculatorPage } from '../calculator/calculator';

/*
  Generated class for the DryBulkModule page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dry-bulk-module',
  templateUrl: 'dry-bulk-module.html'
})
export class DryBulkModulePage {
  dryBulkTypes: any;
  dischargeTypes: any;
  selectOptions: any;
  dischargeSelectOptions: any;
  dryBulkData: any= {};
  dryBulkDataArray: any = [];
  counter: number;
  clipboardCount:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public http: Http) {
this.clipboardCount=localStorage.getItem("clipboardDataCount");
    this.http.post(localStorage.getItem("liveURL")+'item/dryBulkList', "").map(res => res.json()).subscribe(data => {
      this.dryBulkTypes = data.result;
    })

    this.http.post(localStorage.getItem("liveURL")+'item/dryBulkDischargeList', "").map(res => res.json()).subscribe(data => {
      this.dischargeTypes = data.result;
      console.log("checks", this.dischargeTypes);
    })

    // this.dryBulkTypes=[
    //   {
    //     id:1,
    //     item: "Cocoa Beans"
    //   },
    //   {
    //     id:2,
    //     item: "Bauxite"
    //   }
    // ]

    // this.dischargeTypes=[
    //   {
    //     id:1,
    //     item: "Pipeline"
    //   },
    //   {
    //     id:2,
    //     item: "BIBO"
    //   }
    // ]

     this.selectOptions = {
      title: "Dry Bulk Types",
      cssClass: "categorySelect"
    }

     this.dischargeSelectOptions = {
      title: "Discharge Types",
      cssClass: "categorySelect"
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DryBulkModulePage');
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

  // goToSummary(){
  //   localStorage.setItem('dryBulkData', JSON.stringify(this.dryBulkTypes));
  //   this.navCtrl.push(ModuleSummaryAndEditPage);
  // }

  goToSummary() {
    console.log(this.dryBulkData);
    this.counter = parseFloat(localStorage.getItem("clipboardDataCount"));
    this.counter++;
    localStorage.setItem('clipboardDataCount', JSON.stringify(this.counter));
    if (!(JSON.parse(localStorage.getItem("dryBulkData")))) {
      this.dryBulkDataArray.push(this.dryBulkData);
      localStorage.setItem('dryBulkData', JSON.stringify(this.dryBulkDataArray));
    }
    else {
      this.dryBulkDataArray = JSON.parse(localStorage.getItem("dryBulkData"));
      this.dryBulkDataArray.push(this.dryBulkData);
      localStorage.setItem('dryBulkData', JSON.stringify(this.dryBulkDataArray));
    }
    this.navCtrl.push(ModuleSummaryAndEditPage)
  }

  openCard(event, dryBulk) {
    console.log(dryBulk);
    dryBulk.open = !dryBulk.open;
  }


  onBackTapped(event) {
    this.navCtrl.pop();
  }

  pickDryBulkName(dry_bulk){
    // console.log(break_bulk);
    for(var i=0; i<this.dryBulkTypes.length; i++){
      if(this.dryBulkTypes[i].id==dry_bulk){
        this.dryBulkData.name=this.dryBulkTypes[i].item;
      }
    }
    
  }

  pickDischargeName(discharge){
    // console.log(danger)
    for(var i=0; i<this.dischargeTypes.length; i++){
      if(this.dischargeTypes[i].id==discharge){
        this.dryBulkData.dischargeName=this.dischargeTypes[i].item;
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
