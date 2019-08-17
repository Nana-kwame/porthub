import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModuleSummaryAndEditPage } from '../module-summary-and-edit/module-summary-and-edit'
import { Http } from '@angular/http';
import { PortDuesAndStevedoreChargesPage } from '../port-dues-and-stevedore-charges/port-dues-and-stevedore-charges';
import { CalculatorPage } from '../calculator/calculator';

/*
  Generated class for the LiquidBulkModule page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-liquid-bulk-module',
  templateUrl: 'liquid-bulk-module.html'
})
export class LiquidBulkModulePage {
  liquidBulkTypes: any;
  dischargeTypes: any;
  liquidBulkSelectOptions: any;
  dischargeSelectOptions: any;
  liquidBulkData: any = {};
   counter: number;
   clipboardCount:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.clipboardCount=localStorage.getItem("clipboardDataCount");
    this.http.post(localStorage.getItem("liveURL")+'item/liquidBulkList', "").map(res => res.json()).subscribe(data => {
      // this.activityTypes = data.result;
      this.liquidBulkTypes = data.result;
    })
    // this.liquidBulkTypes = [
    //   {
    //     id: 1,
    //     item: "Cocoa Beans"
    //   },
    //   {
    //     id: 2,
    //     item: "Bauxite"
    //   }
    // ]


    this.liquidBulkSelectOptions = {
      title: "Liquid Bulk Types",
      cssClass: "categorySelect"
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LiquidBulkModulePage');
  }

  ionViewWillEnter() {
     this.clipboardCount=localStorage.getItem("clipboardDataCount");
     let tabs = document.querySelectorAll('.tabbar');
   if ( tabs !== null ) {
        Object.keys(tabs).map((key) => {
          tabs[ key ].style.transform = 'translateY(56px)';
        });
      } //
  }
 
  ionViewWillLeave() {
     let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
        Object.keys(tabs).map((key) => {
          tabs[ key ].style.transform = 'translateY(0)';
        });
      } // 
  }
  onBackTapped(event) {
    this.navCtrl.pop();
  }

  goToSummary(){
    this.counter = parseFloat(localStorage.getItem("clipboardDataCount"));
    this.counter++;
    localStorage.setItem('clipboardDataCount', JSON.stringify(this.counter));
    localStorage.setItem('liquidBulkData', JSON.stringify(this.liquidBulkData));
    this.navCtrl.push(ModuleSummaryAndEditPage);
  }

  

   pickLiquidBulkName(dry_bulk){
    // console.log(break_bulk);
    for(var i=0; i<this.liquidBulkTypes.length; i++){
      if(this.liquidBulkTypes[i].id==dry_bulk){
        this.liquidBulkData.name=this.liquidBulkTypes[i].item;
      }
    }
    
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
