import { NotificationPage } from "./../notification/notification";
import { Component } from "@angular/core";

import { HomePage } from "../home/home";
import { CalculatorPage } from "../calculator/calculator";
import { InvoicesPage } from "../invoices/invoices";
import { TrackingPage } from "../tracking/tracking";
import { ProfilePage } from "../profile/profile";
import { CalculatorItemsPage } from "../calculator-items/calculator-items";
import { CalculatedResultPage } from "../calculated-result/calculated-result";
import { VesselHandlingModulePage } from "../vessel-handling-module/vessel-handling-module";
import { ShoreHandlingInvoicePage } from "../shore-handling-invoice/shore-handling-invoice";
import { ModalController, Events } from "ionic-angular";
import { LoginToContinuePage } from "../login-to-continue/login-to-continue";
import { Keyboard } from "@ionic-native/keyboard";
import { Http } from "@angular/http";

@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = CalculatorPage;
  tab3Root: any = InvoicesPage;
  tab4Root: any = TrackingPage;
  tab5Root: any = ProfilePage;

  login_state: any;
  show_hidden: any = false;
  a_login: boolean;

  // For showing and hiding the tab bar on input focus
  hideTabValue = true;

  // For showing or hiding the notification indicator
  newsFeed: any;
  youTubeFeed: any;
  notificationAlert: boolean;
  badgeValue: any =' ';

  constructor(
    public modalCtrl: ModalController,
    public events: Events,
    public http: Http,
    public keyboard: Keyboard
  ) {
    this.login_state = localStorage.getItem("login_status");
    console.log("What is in login state: ", this.login_state);
    if (this.login_state === "true") {
      this.show_hidden = true;
    } else {
      this.show_hidden = false;
    }

    events.subscribe("a_login", data => {
      if (data) {
        this.a_login = true;
      }

      console.log("What is in data: ", data);
    });
  }
  onTabTapped() {
    console.log(this.login_state);
    if (localStorage.getItem("login_status") != "true") {
      this.presentLoginModal();
    }
  }

  presentLoginModal() {
    const loginModal = this.modalCtrl.create(LoginToContinuePage);
    loginModal.onDidDismiss(data => {});
    loginModal.present();
  }

  ionViewDidEnter() {
    window.addEventListener("keyboardWillShow", this.showListener);
    window.addEventListener("keyboardDidHide", this.hideListener);

    this.keyboard.onKeyboardShow().subscribe(() => {
      this.hideTabValue = false;
    });

    this.keyboard.onKeyboardHide().subscribe(() => {
      this.hideTabValue = true;
    });

    console.log();
  }

  ionViewWillEnter() {
    // Get the cached feeds

    this.getNewsFeed();
    this.getYouTubeFeed();

    if (this.newsFeed !== null) {
    }

    if (this.youTubeFeed !== null) {
    }
  }

  ionViewWillLeave() {
    window.removeEventListener("keyboardWillShow", this.showListener);
    window.removeEventListener("keyboardDidHide", this.hideListener);
  }

  showListener() {
    console.log("Keyboard is visible");
    document.getElementById("TabBarOpen").classList.add("keyboard-is-open");
  }

  hideListener() {
    console.log("keyboard is hidden");
    document.getElementById("TabBarOpen").classList.remove("keyboard-is-open");
  }

  getNewsFeed() {
    let oldNewsFeed: any = JSON.parse(
      localStorage.getItem("original_feed_list")
    );
    this.http
      .post("http://52.176.108.222/getNews?pageNumber=1" + "&pageSize=10", "")
      .map(res => res.json())
      .subscribe(data => {
        this.newsFeed = data.result;
        // this.compareFeeds(oldNewsFeed, this.newsFeed.splice(4));
      });
  }

  getYouTubeFeed() {
    let oldYouTubeFeed: any = JSON.parse(
      localStorage.getItem("original_video_list")
    );
    this.http
      .get(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCKJb-WIYA_f8Qbmsm5auxsQ&key=AIzaSyCK7LdOa5AradMLrdIao_d9EDXjbuIca0U&order=date"
      )
      .map(res => res.json())
      .subscribe(data => {
        this.youTubeFeed = data.items;
        // this.compareFeeds(oldYouTubeFeed, this.youTubeFeed.splice(4));
      });
  }

  // A function to compare if there's a difference between two arrays passed as an argument

  compareFeeds(oldFeeds: any[], newFeeds: any[]) {
    const finalArray = [];
    Array.prototype.forEach.call(newFeeds, newFeed => {
      oldFeeds.indexOf(newFeed) < 0 ? finalArray.push(newFeed) : null;
    });

   this.notificationAlert = finalArray.length !== 0  ? true : false;
   if(this.notificationAlert) {
     this.events.publish('new_notification', true);
     localStorage.setItem('new_notification', 'true');
   }
    console.log("What is in the final array: ", finalArray);
  }
}
