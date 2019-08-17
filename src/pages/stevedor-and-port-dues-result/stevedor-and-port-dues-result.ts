import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Content } from 'ionic-angular';
import { Http } from '@angular/http';
import { CalculatorPage } from '../calculator/calculator';

/*
  Generated class for the StevedorAndPortDuesResult page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-stevedor-and-port-dues-result',
  templateUrl: 'stevedor-and-port-dues-result.html'
})
export class StevedorAndPortDuesResultPage {
  @ViewChild(Content) content: Content;
  type: any;
  calculatedPortDuesResults: any;
  calculatedStevedoreResults: any;
  parsedCalculatorData: any;
  loading:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.parsedCalculatorData = this.navParams.get('data');
    this.type = "port_dues"
    this.loading=true;
    // this.calculatedPortDuesResults = JSON.parse(localStorage.getItem("dryBulkData"));
    // this.calculatedStevedoreResults = JSON.parse(localStorage.getItem("dryBulkData"));
    // console.log("steve", this.calculatedStevedoreResults);
    // console.log("dues", this.calculatedPortDuesResults)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StevedorAndPortDuesResultPage');
    this.http.post(localStorage.getItem("liveURL")+'calculateCargoHandling', this.parsedCalculatorData).map(res => res.json()).subscribe(data => {
      // this.activityTypes = data.result;
      this.loading=false;
      console.log("calcu result", data.result);
      this.calculatedPortDuesResults = data.result.portInvoiceItems;
      this.calculatedStevedoreResults = data.result.stevedoreInvoiceItems;
      // console.log(this.categoryTypes);
    })
  }

  sectionTapped(event) {
    this.content.scrollToTop();
  }
  parseData(data) {
    //
    // console.log(data);
    // console.log("data", parseFloat(data.toLocaleString()).toFixed(2));
    return data.toLocaleString(undefined, { maximumFractionDigits: 2 });
    // return (parseFloat(data).toFixed(2));
  }

  parsedData(data) {
    return data.toLocaleString(undefined, { maximumFractionDigits: 4 });
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
