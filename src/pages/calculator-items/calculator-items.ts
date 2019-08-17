import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { CalculatorItemsModalPage } from '../calculator-items-modal/calculator-items-modal';
import { Http } from '@angular/http';
import { CalculatedResultPage } from '../calculated-result/calculated-result';
import { EditCalculatorEntriesPage } from '../edit-calculator-entries/edit-calculator-entries';
import { CheckData } from '../../providers/check-data';


/*
  Generated class for the CalculatorItems page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-calculator-items',
  templateUrl: 'calculator-items.html',
  providers: [CheckData]
})
export class CalculatorItemsPage {
  parsedSubCategoryId: any;
  calc_data: any;
  calc_items: any;
  original_data: any;
  searchQuery: string;
  loading: boolean;
  show_generate: boolean;
  calculatorJSON: any;
  entry: any;
  chargeEntry: any;
  tabs:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public http: Http, public checkData: CheckData) {
    this.calculatorJSON = [];
    this.entry = {};
    this.chargeEntry = {};
    this.show_generate = false;
    this.searchQuery = "";
    this.loading = true;
    this.parsedSubCategoryId = this.navParams.get('sub_category_id');
    console.log(this.parsedSubCategoryId);
    this.http.post('http://52.176.108.222/item/searchItems?subCategoryId=' + this.parsedSubCategoryId, "").map(res => res.json()).subscribe(data => {
      this.loading = false;
      this.calc_items = data.result;
      this.original_data = data.result;
      console.log(this.calc_items);
    })
  }

  ionViewWillEnter() {
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


  showItemOptions(event, checkbox) {
    console.log("checkbox", checkbox);
    // checkbox.checked = !checkbox.checked;
    console.log('parsing data to modal', this.original_data);
    let modal = this.modalCtrl.create(CalculatorItemsModalPage, { parsedData: { id: checkbox.id, data: this.original_data } });

    modal.onDidDismiss(data => {
      console.log('MODAL DATA', data);
      console.log('please be true', this.calc_items);
      this.original_data = data.data;
      this.calc_items = data.data;
      this.show_generate = data.itemSelected;
      console.log('original_data', this.original_data);
      // this.initializeItems();
    });
    modal.present();
  }

  searchItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
    // set q to the value of the searchbar
    var q = this.searchQuery;
    console.log(this.searchQuery);

    // if the value is an empty string don't filter the items
    if (q === '') {
      // this.initializeItems();
      return;
    }

    this.calc_items = this.calc_items.filter((v) => {

      if (v.item.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        console.log(this.calc_items);
        return true;
      }
      console.log(this.calc_items);
      return false;
    })

  }

  initializeItems() {
    this.calc_items = this.original_data;
  }

  generateCalculateJSON() {
    this.calculatorJSON = [];
    for (var i = 0; i < this.original_data.length; i++) {
      this.entry = {};
      if (this.original_data[i].optionSelected) {
        this.entry.itemId = this.original_data[i].id;
        this.entry.item = this.original_data[i].item;
        this.entry.groupCategoryName = this.original_data[i].groupCategoryName;
        this.entry.charges = [];
        for (var j = 0; j < this.original_data[i].chargeModel.length; j++) {
          this.chargeEntry = {};
          this.chargeEntry.chargeType = this.original_data[i].chargeModel[j].chargeType;
          this.chargeEntry.quantity = this.original_data[i].chargeModel[j].quantity;
          this.entry.charges.push(this.chargeEntry);

        }
        this.calculatorJSON.push(this.entry);
      }
    }
    if (localStorage.getItem("itemsList")) {
      var temp = JSON.parse(localStorage.getItem("itemsList"));
      for (var i = 0; i < this.calculatorJSON.length; i++) {
        temp.push(this.calculatorJSON[i]);
      }
      localStorage.setItem('itemsList', JSON.stringify(temp));
    }
    else {
      localStorage.setItem('itemsList', JSON.stringify(this.calculatorJSON));
    }

    this.checkData.setFinalData(this.calculatorJSON);
    this.navCtrl.push(EditCalculatorEntriesPage);
    console.log("calc json", this.calculatorJSON);
  }
}


