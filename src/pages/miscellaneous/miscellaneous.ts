import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ShorehandlingPage } from '../shorehandling/shorehandling';
import { ShoreHandlingSummaryPage } from '../shore-handling-summary/shore-handling-summary';
import { CalculatorPage } from '../calculator/calculator';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the Miscellaneous page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-miscellaneous',
  templateUrl: 'miscellaneous.html'
})
export class MiscellaneousPage {
  parsedData: any;
  miscs: any;
  atomicContainerEntry: any = {};
  miscData: any = [];
  builtData: any = {};
  rearrangedData: any = {};
  clipboardCount: any;
  loading: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController) {
    this.clipboardCount = JSON.parse(localStorage.getItem("final_content_json")).calculable_containers.length;
    this.parsedData = this.navParams.get('parsedData');
    console.log("parsed data", this.parsedData);
    this.http.post(localStorage.getItem("liveURL") + 'Miscellaneous/searchAll', "").map(res => res.json()).subscribe(data => {
      this.miscs = data.result;
      this.loading = false;
      console.log(this.miscs);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MiscellaneousPage');
    this.clipboardCount = JSON.parse(localStorage.getItem("final_content_json")).calculable_containers.length;
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

  contentDetailClicked(index, obj) {
    console.log(obj);
    if (this.miscs[index].itemSelected == true) {
      this.miscs[index].itemSelected = false;
      this.miscs[index].serviceId = "";
      console.log("clicked1");
    }
    else {
      this.miscs[index].itemSelected = true;
      this.miscs[index].serviceId = obj.id;
      console.log("clicked2");

    }


  }

  addToLoop() {
    this.atomicContainerEntry = this.parsedData;
    // for (var i = 0; i < this.miscs.length; i++) {
    //   if (this.miscs[i].itemSelected) {
    //     this.miscData.push(this.miscs[i]);
    //   }
    // }
    localStorage.setItem("show_back", "false");
    this.atomicContainerEntry.miscellaneous = this.miscs;
    this.builtData = JSON.parse(localStorage.getItem("final_content_json"));
    console.log("source", this.builtData);
    if (this.builtData.imex) {
      delete this.atomicContainerEntry["imex"];
      this.builtData.calculable_containers.push(this.atomicContainerEntry);
      localStorage.setItem("final_content_json", JSON.stringify(this.builtData));
      console.log("edited", this.builtData);
    }
    else {
      this.rearrangedData.imex = this.atomicContainerEntry.imex;
      this.rearrangedData.calculable_containers = [];
      this.rearrangedData.calculable_containers.push(this.atomicContainerEntry);
      console.log("new", this.atomicContainerEntry);
      localStorage.setItem("final_content_json", JSON.stringify(this.rearrangedData));
    }
    this.navCtrl.push(ShorehandlingPage);
    localStorage.setItem("show_alert", "true");
  }

  goToClipboard() {
    this.navCtrl.push(ShoreHandlingSummaryPage)
  }

  navToRoot(event) {
    localStorage.setItem("final_content_json", JSON.stringify({ "imex": "", "calculable_containers": [] }));
    localStorage.setItem("show_back", "true");
    this.navCtrl.popToRoot();
  }

  

}
