import { Component } from "@angular/core";
import { NavController, ActionSheetController } from "ionic-angular";
import { BillDetailsPage } from "../bill-details/bill-details";
import { CalculatorItemsPage } from "../calculator-items/calculator-items";
import { Http } from "@angular/http";
// import { CheckData } from '../../providers/check-data';
import { VesselHandlingModulePage } from "../vessel-handling-module/vessel-handling-module";
import { ComingSoonPage } from "../coming-soon/coming-soon";
import { PortDuesAndStevedoreChargesPage } from "../port-dues-and-stevedore-charges/port-dues-and-stevedore-charges";
import { ShorehandlingPage } from "../shorehandling/shorehandling";

@Component({
  selector: "page-calculator",
  templateUrl: "calculator.html"
})
export class CalculatorPage {
  categoryTypes: any;
  subCategoryTypes: any;
  categorySelectOptions: any;
  subCategorySelectOptions: any;
  subCategoryPlaceholder: any;
  selectedCategory: String;
  selectedSubCategory: String;
  loading: boolean;
  activateSubCat: boolean;
  constructor(
    public navCtrl: NavController,
    public http: Http,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.loading = false;
    this.activateSubCat = false;
    this.categoryTypes = [];
    this.subCategoryTypes = [];
    this.categoryTypes = [
      {
        categoryName: "Vessel Handling Charges",
        id: "C1"
      },
      {
        categoryName: "Port Dues And Stevedore Charges",
        id: "C2"
      },
      {
        categoryName: "Shore Handling Charges",
        id: "C3"
      }
    ];

    this.subCategoryTypes = [{}];
    this.selectedCategory = "false";
    this.subCategoryPlaceholder = "Please Select A Category first";

    this.categorySelectOptions = {
      title: "Category Types",
      cssClass: "categorySelect"
    };

    this.subCategorySelectOptions = {
      title: "Sub-Category Types",
      cssClass: "categorySelect"
    };
  }

  calculateTapped() {
    this.navCtrl.push(BillDetailsPage);
  }

  requestSubCategories(event) {
    this.subCategoryPlaceholder = "Loading...";
    this.http
      .post(
        "http://52.176.108.222/subCategory/searchSubCategories?categoryId=" +
          this.selectedCategory,
        ""
      )
      .map(res => res.json())
      .subscribe(data => {
        this.subCategoryTypes = data.result;
        if (this.subCategoryTypes) {
          this.subCategoryPlaceholder = "Select Sub-Category";
          this.activateSubCat = true;
        }
        console.log(this.subCategoryTypes);
      });
    console.log(this.selectedCategory);
  }

  getSubCategoryId() {
    console.log("selectedSubCategory", this.selectedSubCategory);
  }

  goItemsPage() {
    if (this.selectedCategory == "C1") {
      this.navCtrl.push(VesselHandlingModulePage);
    } else if (this.selectedCategory == "C2") {
      this.navCtrl.push(PortDuesAndStevedoreChargesPage);
    } else if (this.selectedCategory == "C3") {
      this.navCtrl.push(ShorehandlingPage);
    } else {
      this.navCtrl.push(ComingSoonPage);
    }

    console.log("What is in the id: ", this.selectedCategory);
  }

  onShowActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: "Choose a category",
      buttons: [
        {
          text: "Vessel Handling Charges",
          icon: 'boat',
          handler: () => {
            this.navCtrl.push(VesselHandlingModulePage);
          }
        },
        {
          text: "Port Dues & Stevedore",
          icon:'cash',
          handler: () => {
            this.navCtrl.push(PortDuesAndStevedoreChargesPage);
          }
        },
        {
          text: "Shore Handling Charges",
          icon:'pin',
          handler: () => {
            this.navCtrl.push(ShorehandlingPage);
          }
        }
      ]
    });

    actionSheet.present();
  }
}
