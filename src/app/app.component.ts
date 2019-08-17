import { ProfilePage } from "./../pages/profile/profile";
import { ContentDetailsPage } from "./../pages/content-details/content-details";
import { FcmProvider } from "./../providers/fcm/fcm";
import { Component } from "@angular/core";
import { Platform, ToastController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { TabsPage } from "../pages/tabs/tabs";
import { WelcomePage } from "../pages/welcome/welcome";
import { NewComerLoginPage } from "../pages/new-comer-login/new-comer-login";
import { LoginToContinuePage } from "../pages/login-to-continue/login-to-continue";
import { LoginPage } from "../pages/login/login";
import { ChangePinPage } from "../pages/change-pin/change-pin";
import { tap } from "rxjs/operators";
import { InvoicesPage } from "../pages/invoices/invoices";
import { CalculatorPage } from "../pages/calculator/calculator";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  // For themeing purposes
  rootPage: any;

  constructor(
    platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    toastCtrl: ToastController
  ) {
    if (!localStorage.getItem("pin_code")) {
      this.rootPage = NewComerLoginPage;
      // For theming and styling purposes

    }
    else {

      this.rootPage = LoginToContinuePage;
    }

    platform.ready().then(() => {
      // For the push notifications

      // Get the FCM token

      // fcm.getToken();

      //Listen to the incoming messages using the token
      // fcm.listenToNotifications().pipe(
      //   tap(msg => {
      //     // Show a toast
      //     const toast = toastCtrl.create({
      //       message: msg.body,
      //       duration: 3000
      //     });
      //     toast.present();
      //   })
      // ).subscribe();

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      localStorage.setItem("itemsList", JSON.stringify([]));
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    localStorage.setItem("testURL", "http://10.10.97.199:8080/");
    localStorage.setItem("liveURL", "http://52.176.108.222/");
    localStorage.setItem("clipboardDataCount", JSON.stringify(0));
    localStorage.setItem("dryBulkData", JSON.stringify([]));
    localStorage.setItem("liquidBulkData", JSON.stringify(""));
    localStorage.setItem("containerData", JSON.stringify([]));
    localStorage.setItem("breakBulkData", JSON.stringify([]));
    localStorage.setItem("vehicleData", JSON.stringify([]));
    localStorage.removeItem("selectedActivity");
    localStorage.setItem("login_status", "");
    localStorage.setItem("show_back", "true");
    localStorage.setItem(
      "final_content_json",
      JSON.stringify({ imex: "", calculable_containers: [] })
    );
    localStorage.setItem("show_alert", "false");
    localStorage.setItem("testURL", "http://10.10.97.199:8080/");

    // localStorage.setItem('pin_code', '389521');
  }
  hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
    }
  }
}
