import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController, ViewController } from 'ionic-angular';


/*
  Generated class for the EditCalculatorEntriesModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-calculator-entries-modal',
  templateUrl: 'edit-calculator-entries-modal.html'
})
export class EditCalculatorEntriesModalPage {

  parsedItem: any;
  charges: any;
  parsedData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private view: ViewController) {
    // console.log('chargeModel', navParams.get('parsedData'));
    this.parsedData = navParams.get('parsedData');
    // this.parsedItem=navParams.get('parsedData');
    // for(var i=0; i< this.parsedItem.chargeModel.length;i++){
    //   this.parsedItem.chargeModel[i].checked=false;
    // }

    console.log(this.parsedData);
    for (var k = 0; k < this.parsedData.data.length; k++) {
      if (this.parsedData.data[k].itemId === this.parsedData.id) {
        for (var l = 0; l < this.parsedData.data[k].charges.length; l++) {
          if (this.parsedData.data[k].charges[l].quantity > 0) {
            this.parsedData.data[k].charges[l].checked = true;
            this.parsedData.data[k].charges[l].chosen = true;
          }
        }
        this.parsedItem = this.parsedData.data[k];

        console.log(this.parsedItem);
        break;
      }
      else {
        continue;
      }
    }

  }

  dismiss() {
    // Returning data from the modal:
    this.view.dismiss(
      "parsed"
      // Whatever should be returned, e.g.:
      // { ... }
    );
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CalculatorItemsModalPage');
  }

  showPrompt(charge, index) {
    if (charge.checked && !charge.chosen) {

      let prompt = this.alertCtrl.create({
        // title: 'Please Specify Quantity',
        message: "Please Specify Quantity",
        inputs: [
          {
            name: 'quantity',
            placeholder: 'Quantity',
            type: "number"
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
              if (this.parsedItem.charges[index].quantity == 0) {
                this.parsedItem.charges[index].checked = false;
              }
            }
          },
          {
            text: 'Ok',
            handler: data => {
              console.log('data', data);
              this.parsedItem.optionSelected = true;
              this.parsedItem.charges[index].quantity = parseFloat(data.quantity);
              // this.parsedItem.chargeModel[index].checked = true;
              this.parsedItem.charges[index].chosen = true;
              console.log("new data", this.parsedItem);

            }
          }
        ]
      });
      prompt.present();
    }

    else if (!charge.checked) {
      var counter;
      for (var i = 0; i < this.parsedItem.charges.length; i++) {
        if (this.parsedItem.charges[i].quantity > 0) {
          counter++;
          continue;
        }
      }
      if (counter > 0) {
        this.parsedItem.optionSelected = true;
      }
      else {
        this.parsedItem.optionSelected = false;
      }
      // this.parsedItem.chargeModel[index].checked = false;
      this.parsedItem.charges[index].quantity = 0;
      this.parsedItem.charges[index].chosen = false;
    }

  }

  // showQuantityPrompts() {
  //   this.showPrompt();
  // }


  dismissModal(event) {

    for (var i = 0; i < this.parsedData.data.length; i++) {
      var count = 0;
      for (var j = 0; j < this.parsedData.data[i].charges.length; j++) {
        if (this.parsedData.data[i].charges[j].quantity === 0 || !this.parsedData.data[i].charges[j].quantity) {
          count++;
        }
      }
      if (count === this.parsedData.data[i].charges.length) {
        this.parsedData.data.splice(i);

      }
      else {
        if (this.parsedData.data[i].itemId === this.parsedData.id) {
          this.parsedData.data[i] = this.parsedItem;

          if (this.parsedItem.optionSelected) {
            this.parsedData.itemSelected = true;
          }

          else {
            this.parsedData.itemSelected = false;
          }
          break;
        }


        else {
          continue;
        }
      }
    }
    this.view.dismiss(
      this.parsedData
      // Whatever should be returned, e.g.:
      // { ... }
    );
  }

}
