import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CheckData } from '../../providers/check-data';
import { CalculatorPage } from '../calculator/calculator';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-calculated-result',
  templateUrl: 'calculated-result.html',
  providers: [CheckData]
})
export class CalculatedResultPage {
  parsedCalculatorData: any;
  calculatedResults: any;
  loading: boolean;
  tabs: any;
  // calculatorValues:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public checkData: CheckData) {
    // this.calculatorValues=[];
    this.parsedCalculatorData = this.navParams.get('data');
    // this.calculatorValues.push(this.parsedCalculatorData);
    // console.log(this.calculatorValues);
    this.loading = true;
  }

  ionViewDidEnter() {
    this.http.post('http://52.176.108.222/calculateNew', this.parsedCalculatorData).map(res => res.json()).subscribe(data => {
      console.log("result", data);
      this.loading = false;
      this.calculatedResults = data.result;
      // localStorage.setItem('dryBulkData', JSON.stringify(this.calculatedResults));
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalculatedResultPage');
  }

  navToRoot() {
    localStorage.setItem('itemsList', JSON.stringify([]));
    this.navCtrl.popToRoot();
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

  parseData(data) {
    return data.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }

  parsedData(data) {
    return data.toLocaleString(undefined, { maximumFractionDigits: 4 });
  }


}
