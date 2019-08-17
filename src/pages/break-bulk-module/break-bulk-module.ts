import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { PortDuesAndStevedoreChargesPage } from '../port-dues-and-stevedore-charges/port-dues-and-stevedore-charges';
import { ModuleSummaryAndEditPage } from '../module-summary-and-edit/module-summary-and-edit'
import { CalculatorPage } from '../calculator/calculator';

/*
  Generated class for the BreakBulkModule page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-break-bulk-module',
  templateUrl: 'break-bulk-module.html'
})
export class BreakBulkModulePage {
  open_card: boolean;
  containerStatusIds: any;
  selectOptions: any;
  breakBulkTypes: any = [];
  loading: boolean = true;
  breakBulkData: any = {};
  dangers: any;
  dangerSelectOptions: any;
  breakBulkDataArray: any = [];
  counter: number;
  clipboardCount:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.clipboardCount=localStorage.getItem("clipboardDataCount");

    this.dangers = [
      {
        name: "No Dangerous Goods",
        id: "1"
      },
      {
        name: "Dangerous Goods I",
        id: "2"
      },
      {
        name: "Dangerous Goods II",
        id: "3"
      }
    ]

    this.http.post(localStorage.getItem("liveURL") + '/item/breakBulkList', "").map(res => res.json()).subscribe(data => {
      // this.activityTypes = data.result;
      this.breakBulkTypes = data.result;
    })

    this.selectOptions = {
      title: "Break Bulk Types",
      cssClass: "categorySelect"
    }

    this.dangerSelectOptions = {
      title: "Danger Cargo Status",
      cssClass: "categorySelect"
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BreakBulkModulePage');
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

  pickBreakBulkName(break_bulk) {
    // console.log(break_bulk);
    for (var i = 0; i < this.breakBulkTypes.length; i++) {
      if (this.breakBulkTypes[i].id == break_bulk) {
        this.breakBulkData.name = this.breakBulkTypes[i].item;
      }
    }

  }

  pickDangerName(danger) {
    console.log(danger)
    for (var i = 0; i < this.dangers.length; i++) {
      if (this.dangers[i].id == danger) {
        this.breakBulkData.dangerName = this.dangers[i].name;
      }
    }
    console.log(this.breakBulkData.dangerName)
    // this.breakBulkData.dangerName=danger.name;
  }

  goToSummary() {
    console.log(this.breakBulkData);
    this.counter = parseFloat(localStorage.getItem("clipboardDataCount"));
    this.counter++;
    localStorage.setItem('clipboardDataCount', JSON.stringify(this.counter));
    if (!(JSON.parse(localStorage.getItem("breakBulkData")))) {
      this.breakBulkDataArray.push(this.breakBulkData);
      localStorage.setItem('breakBulkData', JSON.stringify(this.breakBulkDataArray));
    }
    else {
      this.breakBulkDataArray = JSON.parse(localStorage.getItem("breakBulkData"));
      this.breakBulkDataArray.push(this.breakBulkData);
      localStorage.setItem('breakBulkData', JSON.stringify(this.breakBulkDataArray));
    }
    this.navCtrl.push(ModuleSummaryAndEditPage)
  }

  onBackTapped(event) {
    this.navCtrl.pop();
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
