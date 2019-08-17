import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AgentRegistrationPage } from '../agent-registration/agent-registration';
import { ShorehandlingPage } from '../shorehandling/shorehandling';
import { InvoiceDetailsPage } from '../invoice-details/invoice-details';



/*
  Generated class for the Invoicing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-invoicing',
  templateUrl: 'invoicing.html'
})
export class InvoicingPage {
  containers: any;
  do_number: any = "";
  loading: boolean = false;
  generate_invoice_request_obj: any = {};
  currentDate: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.generate_invoice_request_obj.doNumber = "";
     this.generate_invoice_request_obj.gen = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicingPage');
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

  shoreHandlingTapped(event) {
    this.navCtrl.push(ShorehandlingPage);
  }

  agentRegistrationTapped(event) {
    this.navCtrl.push(AgentRegistrationPage);
  }

  containerClicked(index, obj) {
    console.log("clicked");
    if (this.containers[index].itemSelected == true) {
      this.containers[index].itemSelected = false;
      console.log("clicked1");
    }
    else {
      this.containers[index].itemSelected = true;
      console.log("clicked2");

    }
  }

  // onDateClicked() {
  //   this.datePicker.show({
  //     mode: "date",
  //     date: new Date(),
  //     titleText: "Please pick your service date",
  //     androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
  //     allowFutureDates:true
  //   }).then(
  //     date => console.log('Got date: ', date),
  //     err => console.log('Error occurred while getting date: ', err)
  //     );
  // }



  doLookup() {
    console.log("tru");
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.containers = [
        {
          "ContainerNumber": "a1",
          "ContainerISOCode": "a1"
        },
        {
          "ContainerNumber": "a2",
          "ContainerISOCode": "a2"
        },
        {
          "ContainerNumber": "a3",
          "ContainerISOCode": "a3"
        },
        {
          "ContainerNumber": "a4",
          "ContainerISOCode": "a4"
        }

      ]
    }, 2000);
  }

  onCancel() {
    this.do_number = "";
  }

  setDate() {
    console.log(this.currentDate);
  }

  generateInvoice() {
    var selectedContainers = [];
    for (var i = 0; i < this.containers.length; i++) {
      if (this.containers[i].itemSelected) {
        selectedContainers.push(this.containers[i].ContainerNumber);
      }
    }
    this.generate_invoice_request_obj.containers = selectedContainers.toString();
    var invoice = {
      "invoiceId": "alaois87dfoauh",
      "agentId": "asdf",
      "agentName": "John Doe",
      "agentEmail": "john@doe.com",
      "agentPhone": "0244332211",
      "containerNumber": "C54",
      "voyageNumber": 6,
      "totalAmount": 15675.55,
      "issueDate": 1502219226217,
      "expectedClearingDate": 1509219226217,
      "dueDate": 1509215226217,
      "status": "PAID",
      "gen":true
    }
    this.navCtrl.push(InvoiceDetailsPage, { parsedData: invoice })
    console.log(this.generate_invoice_request_obj);

  }



}
