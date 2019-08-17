import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CheckData } from '../../providers/check-data';
import { CalculatedResultPage } from '../calculated-result/calculated-result';
import { CalculatorPage } from '../calculator/calculator';
import { ModalController } from 'ionic-angular';
import { EditCalculatorEntriesModalPage} from '../edit-calculator-entries-modal/edit-calculator-entries-modal';
/*
  Generated class for the EditCalculatorEntries page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-calculator-entries',
  templateUrl: 'edit-calculator-entries.html',
  providers: [CheckData]
})
export class EditCalculatorEntriesPage {
storedItems:any;
entry:any;
chargeEntry:any;
calculatorJSON:any;
tabs:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public checkData: CheckData, public modalCtrl: ModalController) {
    
    this.calculatorJSON=[];
    this.storedItems=JSON.parse(localStorage.getItem("itemsList"));
    console.log("service data",this.storedItems);
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


  goToResultsPage() {
    this.calculatorJSON = [];
    for (var i = 0; i < this.storedItems.length; i++) {
      this.entry = {};
      
        this.entry.itemId = this.storedItems[i].itemId;
        this.entry.charges = [];
        for (var j = 0; j < this.storedItems[i].charges.length; j++) {
          this.chargeEntry = {};
          if(this.storedItems[i].charges[j].quantity && this.storedItems[i].charges[j].quantity != 0){
          this.chargeEntry.chargeType = this.storedItems[i].charges[j].chargeType;
          this.chargeEntry.quantity = this.storedItems[i].charges[j].quantity;
          this.entry.charges.push(this.chargeEntry);
          }
        }
        this.calculatorJSON.push(this.entry);
      
    }
    this.navCtrl.push(CalculatedResultPage, {calculator_data:this.calculatorJSON});
    console.log("calc json", this.calculatorJSON);
  }

  goToCalculatorPage(){
    localStorage.setItem('itemsList', JSON.stringify(this.storedItems));
    this.navCtrl.push(CalculatorPage);
  }

  showItemOptions(event, checkbox) {
    console.log("checkbox", checkbox);
    // checkbox.checked = !checkbox.checked;
    // console.log('parsing data to modal', this.original_data);
    let modal = this.modalCtrl.create(EditCalculatorEntriesModalPage, { parsedData: { id: checkbox.itemId, data: this.storedItems } });

    modal.onDidDismiss(data => {
      console.log('MODAL DATA', data);
      console.log('please be true', this.storedItems);
      // this.calculatorJSON = data.data;
      // console.log('original_data', this.orig);
      // this.initializeItems();
    });
    modal.present();
  }

  onBackTapped(event){
    this.navCtrl.pop();
  }


}
