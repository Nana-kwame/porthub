import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { MiscellaneousPage } from '../miscellaneous/miscellaneous';
import { ShoreHandlingSummaryPage } from '../shore-handling-summary/shore-handling-summary';
import { CalculatorPage } from '../calculator/calculator';


/*
  Generated class for the ContentDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-content-details',
  templateUrl: 'content-details.html'
})
export class ContentDetailsPage {
  parsedData: any;
  contents: any;
  show_vehicle_options: boolean = false;
  show_engine_options: boolean = false;
  vehicleTypes: any;
  builtData: any = {};
  calculable_content: any = {};
  selectedVehicleTypes: any = [];
  clipboardCount: any;
  loading: boolean = true;
  counter: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: Http) {
    this.clipboardCount = JSON.parse(localStorage.getItem("final_content_json")).calculable_containers.length;
    this.parsedData = this.navParams.get('parsedData');
    console.log(this.parsedData);

    this.http.post(localStorage.getItem("liveURL") + 'ContainerContent/searchAll', "").map(res => res.json()).subscribe(data => {
      this.loading = false;
      this.contents = data.result;
      console.log(this.contents);
    })

    this.http.post(localStorage.getItem("liveURL") + 'VehicleType/searchAll', "").map(res => res.json()).subscribe(data => {
      this.vehicleTypes = data.result;
      console.log(this.contents);
    })


    // this.vehicleTypes = [
    //   {
    //     name: "Saloon",
    //     vehicleId: 1
    //   },
    //   {
    //     name: "Mini",
    //     vehicleId: 2
    //   },
    //   {
    //     name: "Utility",
    //     vehicleId: 3
    //   },
    //   {
    //     name: "Trailer",
    //     vehicleId: 4
    //   }
    // ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentDetailsPage');
  }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.transform = 'translateY(56px)';
      });
    } //

    this.clipboardCount = JSON.parse(localStorage.getItem("final_content_json")).calculable_containers.length;
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
    if (this.contents[index].itemSelected == true) {
      this.counter--
      if (this.contents[index].content == "Vehicles") {
        this.contents[index].show_vehicle_options = false;
      }

      else if (this.contents[index].content === "Engines & Spare parts") {
        this.contents[index].show_engine_options = false;
        this.contents[index].quantity = "";
      }
      this.contents[index].itemSelected = false;
      console.log("clicked1");
    }
    else {
      this.counter++
      if (this.contents[index].content == "Vehicles") {
        this.contents[index].show_vehicle_options = true;
      }

      else if (this.contents[index].content === "Engines & Spare parts") {
        this.contents[index].show_engine_options = true;
      }
      this.contents[index].itemSelected = true;
      console.log("clicked2");

    }


  }

  vehicleTypeClicked(index, obj) {
    console.log("clicked");
    if (this.vehicleTypes[index].itemSelected == true) {
      this.vehicleTypes[index].itemSelected = false;
      this.vehicleTypes[index].quantity = "";
      console.log("clicked1");
    }
    else {
      this.vehicleTypes[index].itemSelected = true;
      console.log("clicked2");
      this.showPrompt(index);

    }

  }

  showPrompt(index) {
    let prompt = this.alertCtrl.create({
      title: '',
      message: "Please enter the number of vehicles of this type",
      inputs: [
        {
          name: 'quantity',
          placeholder: 'Quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.vehicleTypes[index].quantity = data.quantity;

            console.log("edited array", this.vehicleTypes[index]);
          }
        }
      ]
    });
    prompt.present();
  }

  goToMisc() {
    // this.builtData = JSON.parse(localStorage.getItem("final_content_json"));

    // if (!this.builtData.imex) {
    //   this.builtData.imex = this.parsedData.imex;
    // }
    this.calculable_content = this.parsedData;
    this.calculable_content.contents = this.contents;
    for (var i = 0; i < this.contents.length; i++) {
      if (this.contents[i].content === "Vehicles") {
        this.contents[i].vehicles = this.vehicleTypes;
      }
      //   if (this.contents[i].itemSelected) {
      //     if (this.contents[i].content == "Engines & Spare parts") {
      //       this.calculable_content.contents.engines_and_spare_parts = parseFloat(this.contents[i].quantity);
      //     }

      //     else if (this.contents[i].content == "Vehicles") {
      //       for (var j = 0; j < this.vehicleTypes.length; j++) {
      //         if (this.vehicleTypes[j].itemSelected) {
      //           this.vehicleTypes[j].vehicleId=this.vehicleTypes[j].id;
      //           this.selectedVehicleTypes.push(this.vehicleTypes[j]);
      //         }
      //       }
      //       this.calculable_content.contents.vehicle = this.selectedVehicleTypes;
      //     }
      //     else if (this.contents[i].content == "DG I") {
      //       this.calculable_content.contents.dgI = this.contents[i].itemSelected;
      //     }
      //     else if (this.contents[i].content == "DG II") {
      //       this.calculable_content.contents.dgII = this.contents[i].itemSelected;
      //     }
      //     else if (this.contents[i].content == "Plant & Equipment") {
      //       this.calculable_content.contents.plants_and_equipment = this.contents[i].itemSelected;
      //     }
      //     else if (this.contents[i].content == "Personal Effects") {
      //       this.calculable_content.contents.personal_effects = this.contents[i].itemSelected;
      //     }

      //   }

    }
    // this.calculable_containers.push(this.calculable_content);
    console.log("build data", this.calculable_content);
    this.navCtrl.push(MiscellaneousPage, { parsedData: this.calculable_content });


  }

  goToClipboard() {
    this.navCtrl.push(ShoreHandlingSummaryPage)
  }

  navToRoot(event) {
    localStorage.setItem("final_content_json", JSON.stringify({ "imex": "", "calculable_containers": [] }));
    localStorage.setItem("show_back", "true");
    this.navCtrl.push(CalculatorPage);
  }




}
