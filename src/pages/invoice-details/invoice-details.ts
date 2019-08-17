import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
declare const bodymovin: any;
/*
  Generated class for the InvoiceDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: "page-invoice-details",
  templateUrl: "invoice-details.html"
})
export class InvoiceDetailsPage {
  parsedInvoice: any;
  parsedRequest: any;
  invoiceSelected: boolean = true;
  paymentSelected: boolean = false;
  scheduleSelected: boolean = false;
  reqBody: any = {};
  invoiceData: any;
  show_drop_down: boolean = false;
  show_container_drop_down: boolean = false;
  invert_container_drop_down: boolean = false;
  selected_invoice: any = { id: "Please choose your invoice" };
  selected_container: any = { containerNumber: "Please choose your container" };
  invert_drop_down: boolean = false;
  invoices: any;
  loadingSchedule: boolean = true;
  fromDate: any = "DD / MM / YYYY";
  toDate: any = "DD / MM / YYYY";
  check_1: boolean = false;
  check_2: boolean = false;
  scheduleData: any;
  lottieConfig: Object;
  anim: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public http: Http
  ) {
    this.lottieConfig = {
      path: '../../assets/animations/1725-not-found.json',
      renderer: 'canvas',
      loop: true,
      autoplay: true,
      name: 'No Schedule Animation'
    };

    this.parsedRequest = this.navParams.get("parsedData").invoice;
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer ae7df5cb-6cce-4dbe-ade9-97fce1e77c22"
    });
    let options = new RequestOptions({ headers: headers });
    // console.log("data to send", this.navParams.get('parsedData').invoice.doNo);
    this.reqBody.doNumber = this.navParams.get("parsedData").invoice.doNo;

    this.http
      .post(
        "http://45.222.194.54:4448/service/getinvoicebydo",
        this.reqBody,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          console.log("service requests", data);
          this.invoiceData = data.result;
        },
        err => {
          console.log("Error Occured", err);
          // this.loading = false;
        }
      );

      // this.play();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad InvoiceDetailsPage");

  }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll(".tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map(key => {
        tabs[key].style.transform = "translateY(56px)";
      });
    } //
  }

  ionViewWillLeave() {
    let tabs = document.querySelectorAll(".tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map(key => {
        tabs[key].style.transform = "translateY(0)";
      });
    }
  }

  parseData(data) {
    return data.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }

  dropdownTapped() {
    this.show_drop_down = !this.show_drop_down;
    this.invert_drop_down = !this.invert_drop_down;
  }

  containerDropdownTapped() {
    this.show_container_drop_down = !this.show_container_drop_down;
    this.invert_container_drop_down = !this.invert_container_drop_down;
  }
  selectOption(invoice, index) {
    this.selected_invoice = invoice;
    console.log(this.selected_invoice);
    for (var i = 0; i < this.invoiceData.length; i++) {
      if (i == index) {
        if (this.invoiceData[i].selected) {
          this.invoiceData[index].selected = false;
          this.selected_invoice = { id: "Please choose your invoice" };
          this.show_drop_down = !this.show_drop_down;
          this.invert_drop_down = !this.invert_drop_down;
        } else {
          this.invoiceData[i].selected = true;
          this.show_drop_down = !this.show_drop_down;
          this.invert_drop_down = !this.invert_drop_down;
          let headers = new Headers({
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer ae7df5cb-6cce-4dbe-ade9-97fce1e77c22"
          });
          let options = new RequestOptions({ headers: headers });
          // console.log("data to send", this.navParams.get('parsedData').invoice.doNo);
          this.reqBody.invoiceId = this.selected_invoice.id;
          this.http
            .post(
              "http://45.222.194.54:4448/service/getcontainersforinvoice",
              this.reqBody,
              options
            )
            .map(res => res.json())
            .subscribe(
              data => {
                console.log("container requests", data);
                if (typeof data.result === "string") {
                  this.scheduleData = [];
                } else {
                  this.scheduleData = data.result;
                }
                this.loadingSchedule = false;
              },
              err => {
                console.log("Error Occured", err);
                // this.loading = false;
              }
            );
        }
      } else {
        this.invoiceData[i].selected = false;
        this.show_drop_down = !this.show_drop_down;
        this.invert_drop_down = !this.invert_drop_down;
      }
    }
  }

  selectContainerOption(container, index) {
    console.log(container[index]);
    this.selected_container = container;
    // console.log(this.selected_invoice);
    for (var i = 0; i < this.scheduleData.length; i++) {
      if (i == index) {
        if (this.scheduleData[i].selected) {
          this.scheduleData[index].selected = false;
          this.selected_container = {
            containerNumber: "Please choose your container"
          };
          this.show_container_drop_down = !this.show_container_drop_down;
          this.invert_container_drop_down = !this.invert_container_drop_down;
        } else {
          this.scheduleData[i].selected = true;
          this.show_container_drop_down = !this.show_container_drop_down;
          this.invert_container_drop_down = !this.invert_container_drop_down;
        }
      } else {
        this.scheduleData[i].selected = false;
        this.show_container_drop_down = !this.show_container_drop_down;
        this.invert_container_drop_down = !this.invert_container_drop_down;
      }
    }
  }

  closeTapped(event) {
    console.log(this.parsedInvoice);
    if (this.parsedInvoice.gen === true) {
      console.log("popped");
      this.navCtrl.popToRoot();
    } else {
      console.log("removed");
      this.navCtrl.pop();
    }
  }

  goToRoot() {}
  onBackTapped(event) {
    this.navCtrl.pop();
  }
  selectSectionItem(itemSelected) {
    if (itemSelected == "invoice") {
      this.invoiceSelected = true;
      this.paymentSelected = false;
      this.scheduleSelected = false;
    } else if (itemSelected == "payment") {
      this.invoiceSelected = false;
      this.paymentSelected = true;
      this.scheduleSelected = false;
    } else if (itemSelected == "schedule") {
      this.invoiceSelected = false;
      this.paymentSelected = false;
      this.scheduleSelected = true;
    }
  }

  handleAnimation(anim: any) {
    this.anim = anim
  }

  play() {
    // this.anim.play();
  }

}
