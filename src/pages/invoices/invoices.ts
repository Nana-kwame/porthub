import { AzureBackendProvider } from './../../providers/azure-backend/azure-backend';
import { Component, ViewChild } from "@angular/core";
import { Content, Platform } from "ionic-angular";
import { ModalController } from "ionic-angular";
import { NavController, AlertController } from "ionic-angular";
import { InvoicingPage } from "../invoicing/invoicing";
import { InvoiceDetailsPage } from "../invoice-details/invoice-details";
import { LoginToContinuePage } from "../login-to-continue/login-to-continue";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

@Component({
  selector: "page-invoices",
  templateUrl: "invoices.html"
})
export class InvoicesPage {
  @ViewChild(Content) content: Content;
  statuses: any;
  serviceRequests: any;
  searchQuery: any = "";
  filter_value: any = "All";
  scheduled_selected: boolean = false;
  pending_selected: boolean = false;
  reqBody: any = {};
  pageNumber: number = 0;
  generatedStatus = true;
  search: boolean = false;
  errorState = false;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public http: Http,
    public azure: AzureBackendProvider
  ) {

  }

  ionViewDidLoad() {
    this.getInvoiceServiceRequests();
    console.log('The Invoices Page')
    this.platform.resume.subscribe(() => {});

  }

  sectionTapped(event) {
    this.content.scrollToTop();
  }

  generateInvoicesTapped(event) {
    this.navCtrl.push(InvoicingPage);
  }

  invoice_detailsTapped(invoice) {
    let modal = this.modalCtrl.create(InvoiceDetailsPage, {
      parsedData: invoice
    });
    modal.present();
  }

  presentLoginModal() {
    const loginModal = this.modalCtrl.create(LoginToContinuePage);
    loginModal.onDidDismiss(data => {});
    loginModal.present();
  }

  ionSelected() {
    console.log("Home Page has been selected");
  }

  invoiceItemCLicked(invoice) {
    this.navCtrl.push(InvoiceDetailsPage, { parsedData: { invoice } });
    console.log(invoice);
   }

  //Loading and displaying the data
  getInvoiceServiceRequests(){
    localStorage.setItem("original_list", JSON.stringify([]));
    this.statuses = "paid";
    this.errorState = false;

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer ae7df5cb-6cce-4dbe-ade9-97fce1e77c22"
    });
    let options = new RequestOptions({ headers: headers });
    this.reqBody.offset = 0;
    this.reqBody.limit = 10;
    this.reqBody.param = localStorage.getItem('agent_id');
    this.http
      .post(
        "http://45.222.194.54:4448/service/searchinvoicerequests",
        this.reqBody,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          console.log("service requests", data);
          this.serviceRequests = data.result;
          localStorage.setItem(
            "original_list",
            JSON.stringify(this.serviceRequests)
          );
          // this.loading = false;
          // this._cacheService.set('payment_options', JSON.stringify(this.payment_options), { expires: Date.now() + 1209600000 });
        },
        err => {
          console.log("Error Occured", err);
          this.errorState = true;
          // this.loading = false;
        }
      );
    console.log(localStorage.getItem("login_status"));

  }

  doRefresh(refresher) {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer ae7df5cb-6cce-4dbe-ade9-97fce1e77c22"
    });
    let options = new RequestOptions({ headers: headers });
    this.reqBody.offset = 0;
    this.reqBody.limit = 10;
    this.reqBody.param = localStorage.getItem('agent_id');;
    this.http
      .post(
        "http://45.222.194.54:4448/service/searchinvoicerequests",
        this.reqBody,
        options
      )
      .map(res => res.json())
      .subscribe(data => {
        this.serviceRequests = data.result;
        this.pageNumber = 0;
        localStorage.setItem(
          "original_list",
          JSON.stringify(this.serviceRequests)
        );
        refresher.complete();
        console.log(this.serviceRequests);
      });
  }

  doInfinite(infiniteScroll) {
    this.pageNumber = this.pageNumber + 1;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer ae7df5cb-6cce-4dbe-ade9-97fce1e77c22"
    });
    let options = new RequestOptions({ headers: headers });
    this.reqBody.offset = this.pageNumber;
    this.reqBody.limit = 10;
    this.reqBody.param = localStorage.getItem('agent_id');;
    this.http
      .post(
        "http://45.222.194.54:4448/service/searchinvoicerequests",
        this.reqBody,
        options
      )
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        if (data.result.length > 0) {
          for (var i = 0; i < data.result.length; i++) {
            this.serviceRequests.push(data.result[i]);
          }
          console.log(this.serviceRequests);
          localStorage.setItem(
            "original_list",
            JSON.stringify(this.serviceRequests)
          );
        }
        infiniteScroll.complete();
      });
  }
  
  
  searchItems(ev: any) {
    // set q to the value of the searchbar
    this.initializeInvoices();
    const q = ev.target.value;
    console.log(q)

    // if the value is an empty string don't filter the items
    if (q === "") {
      this.serviceRequests = JSON.parse(localStorage.getItem("original_list"));
      return;
    } else if(q && q.trim() != '') {
      this.serviceRequests = this.serviceRequests.filter(v => {
        if (v.doNo.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          console.log(this.serviceRequests);
          return true;
        } else if (v.status.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          console.log(this.serviceRequests);
          return true;
        }
        console.log(this.serviceRequests);
        return false;
      });
    }
  }

  // searchItems(ev: any) {
  //   this.initializeInvoices();

  //   const val = ev.target.value;

  //   if(val && val.trim() != '') {
  //     this.serviceRequests = this.serviceRequests.filter((serviceRequest) => {
  //       return (serviceRequest.doNo.toLowerCase().indexOf(val.toLowerCase() > -1));
  //     })
  //   }
  // }



  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle("Choose Request Status");
    alert.addInput({
      type: "radio",
      label: "All",
      value: "All",
      checked: false
    });
    alert.addInput({
      type: "radio",
      label: "Generated",
      value: "Generated",
      checked: false
    });
    alert.addInput({
      type: "radio",
      label: "Not Generated",
      value: "Not Generated",
      checked: false
    });

    alert.addButton("Cancel");
    alert.addButton({
      text: "OK",
      handler: data => {
        console.log('From the radio button: ',data);
        this.filter_value = data;
        this.initializeInvoices();
        if (data == "Generated") {
          this.scheduled_selected = true;
          // this.generatedStatus = true;

         this.serviceRequests = this.serviceRequests.filter(request => {
           return request['invoiceGenerated'] = true;
         })
          // this.pending_selected = false;

        } else if (data == "Not Generated") {
          // this.pending_selected = true;
          this.scheduled_selected = true;
          // this.generatedStatus = false;

          this.serviceRequests = this.serviceRequests.filter(request => {
            return request['invoiceGenerated'] = false;
          })

        } else if (data == "All") {
          this.pending_selected = false;
          this.scheduled_selected = false;
          this.generatedStatus = true && false;
        }
        if (data == "All") {
          this.serviceRequests = JSON.parse(
            localStorage.getItem("original_list")
          );
        }
        // else {
        //   this.serviceRequests = this.serviceRequests.filter(v => {
        //     console.log("scanning data", v);
        //     if (
        //       v.invoiceGenerated
        //         .toString()
        //         .toLowerCase()
        //         .indexOf(this.filter_value.toLowerCase()) > -1
        //     ) {
        //       console.log(this.serviceRequests);
        //       return true;
        //     }
        //     console.log(this.serviceRequests);
        //     return false;
        //   });
        // }
      }
    });
    alert.present();
  }

  initializeInvoices() {
    this.serviceRequests = JSON.parse(localStorage.getItem("original_list"));
  }

  searchButtonTapped() {
    this.search = !this.search;
  }
}
