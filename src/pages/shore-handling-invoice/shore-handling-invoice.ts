import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { CalculatorPage } from '../calculator/calculator';
import { ShorehandlingPage } from '../shorehandling/shorehandling';

/*
  Generated class for the ShoreHandlingInvoice page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shore-handling-invoice',
  templateUrl: 'shore-handling-invoice.html'
})
export class ShoreHandlingInvoicePage {
  returnObj: any;
  loading: boolean = true;
  requestObj: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.requestObj = this.navParams.get("parsedData");
    this.http.post(localStorage.getItem("liveURL") + '/calculateShoreHandling', this.requestObj).map(res => res.json()).subscribe(data => {
      this.loading = false;
      this.returnObj = data.result;
      // localStorage.setItem("activity types", JSON.stringify(this.activityTypes));
      console.log(this.returnObj);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoreHandlingInvoicePage');
  }

  onBackTapped(event) {
    this.navCtrl.pop();
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

  navToRoot(event) {
     localStorage.setItem("final_content_json", JSON.stringify({ "imex": "", "calculable_containers": [] }));
    localStorage.setItem("show_back", "true");
    this.navCtrl.push(CalculatorPage);
  }

  navToHead(event) {
    localStorage.setItem("show_back", "false");
    localStorage.setItem("final_content_json", JSON.stringify({ "imex": "", "calculable_containers": [] }));
    localStorage.setItem("show_alert", "false");
    
    this.navCtrl.push(ShorehandlingPage);
 }

}
