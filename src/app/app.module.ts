import { ShipListingsPage } from './../pages/ship-listings/ship-listings';
import { FaqsPage } from "./../pages/faqs/faqs";
import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { CalculatorPage } from "../pages/calculator/calculator";
import { InvoicesPage } from "../pages/invoices/invoices";
import { TabsPage } from "../pages/tabs/tabs";
import { WelcomePage } from "../pages/welcome/welcome";
import { LoginPage } from "../pages/login/login";
import { TrackingPage } from "../pages/tracking/tracking";
import { ProfilePage } from "../pages/profile/profile";
import { VerificationPage } from "../pages/verification/verification";
import { NewsDetailsPage } from "../pages/news-details/news-details";
import { VideoDetailsPage } from "../pages/video-details/video-details";
import { InvoicingPage } from "../pages/invoicing/invoicing";
import { AgentRegistrationPage } from "../pages/agent-registration/agent-registration";
import { ShorehandlingPage } from "../pages/shorehandling/shorehandling";
import { CongratulationsPage } from "../pages/congratulations/congratulations";
import { InvoiceDetailsPage } from "../pages/invoice-details/invoice-details";
import { ShipmentInformationPage } from "../pages/shipment-information/shipment-information";
import { BillDetailsPage } from "../pages/bill-details/bill-details";
import { SendBillPage } from "../pages/send-bill/send-bill";
import { CalculatorItemsPage } from "../pages/calculator-items/calculator-items";
import { CalculatorItemsModalPage } from "../pages/calculator-items-modal/calculator-items-modal";
import { CalculatedResultPage } from "../pages/calculated-result/calculated-result";
import { EditCalculatorEntriesPage } from "../pages/edit-calculator-entries/edit-calculator-entries";
import { EditCalculatorEntriesModalPage } from "../pages/edit-calculator-entries-modal/edit-calculator-entries-modal";
import { VesselHandlingModulePage } from "../pages/vessel-handling-module/vessel-handling-module";
import { ComingSoonPage } from "../pages/coming-soon/coming-soon";
import { PortDuesAndStevedoreChargesPage } from "../pages/port-dues-and-stevedore-charges/port-dues-and-stevedore-charges";
import { DryBulkModuleModalPage } from "../pages/dry-bulk-module-modal/dry-bulk-module-modal";
import { LiquidBulkModuleModalPage } from "../pages/liquid-bulk-module-modal/liquid-bulk-module-modal";
import { BreakBulkModuleModalPage } from "../pages/break-bulk-module-modal/break-bulk-module-modal";
import { ContainerModuleModalPage } from "../pages/container-module-modal/container-module-modal";
import { VehicleModuleModalPage } from "../pages/vehicle-module-modal/vehicle-module-modal";
import { DryBulkModulePage } from "../pages/dry-bulk-module/dry-bulk-module";
import { LiquidBulkModulePage } from "../pages/liquid-bulk-module/liquid-bulk-module";
import { BreakBulkModulePage } from "../pages/break-bulk-module/break-bulk-module";
import { ContainerModulePage } from "../pages/container-module/container-module";
import { VehicleModulePage } from "../pages/vehicle-module/vehicle-module";
import { ModuleSummaryAndEditPage } from "../pages/module-summary-and-edit/module-summary-and-edit";
import { StevedorAndPortDuesResultPage } from "../pages/stevedor-and-port-dues-result/stevedor-and-port-dues-result";
import { ContentDetailsPage } from "../pages/content-details/content-details";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player";
import { MiscellaneousPage } from "../pages/miscellaneous/miscellaneous";
import { ShoreHandlingInvoicePage } from "../pages/shore-handling-invoice/shore-handling-invoice";
import { ShoreHandlingSummaryPage } from "../pages/shore-handling-summary/shore-handling-summary";
import { EditContainerContentModalPage } from "../pages/edit-container-content-modal/edit-container-content-modal";
import { LazyLoadImageModule } from "ng2-lazyload-image";
import { NewComerLoginPage } from "../pages/new-comer-login/new-comer-login";
import { LoginToContinuePage } from "../pages/login-to-continue/login-to-continue";
import { ChangePinPage } from "../pages/change-pin/change-pin";
import { ForgotOTPPage } from "../pages/forgot-otp/forgot-otp";
import { ForgotResetPasswordPage } from "../pages/forgot-reset-password/forgot-reset-password";
import { IonicImageLoader } from "ionic-image-loader";

//My imports
import { BrowserModule } from "@angular/platform-browser";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { LocalNotifications } from '@ionic-native/local-notifications';

import { HttpModule } from "@angular/http";
import { NotificationPage } from "../pages/notification/notification";
import { AzureBackendProvider } from "../providers/azure-backend/azure-backend";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Keyboard } from "@ionic-native/keyboard";
import { LottieAnimationViewModule } from "ng-lottie";

// For Firebase Notifications
import { Firebase } from "@ionic-native/firebase";
// import { AngularFireModule } from "angularfire2";
//  import { AngularFirestoreModule } from "angularfire2/firestore";
import { FcmProvider } from "../providers/fcm/fcm";
import { AuthProvider } from "../providers/auth/auth";
import { HomePage } from '../pages/home/home';

const firebase = {
  apiKey: "AIzaSyDcZEXoBXE5uJS0tTaiyR706YYoQERRJ9A",
  authDomain: "porthub-40455.firebaseapp.com",
  databaseURL: "https://porthub-40455.firebaseio.com",
  projectId: "porthub-40455",
  storageBucket: "porthub-40455.appspot.com",
  messagingSenderId: "408006147028"
};

@NgModule({
  declarations: [
    MyApp,
    CalculatorPage,
    InvoicesPage,
    HomePage,
    TabsPage,
    WelcomePage,
    LoginPage,
    TrackingPage,
    ProfilePage,
    VerificationPage,
    NewsDetailsPage,
    VideoDetailsPage,
    InvoicingPage,
    ShorehandlingPage,
    AgentRegistrationPage,
    CongratulationsPage,
    InvoiceDetailsPage,
    ShipmentInformationPage,
    BillDetailsPage,
    SendBillPage,
    CalculatorItemsPage,
    CalculatorItemsModalPage,
    CalculatedResultPage,
    EditCalculatorEntriesPage,
    EditCalculatorEntriesModalPage,
    VesselHandlingModulePage,
    ComingSoonPage,
    PortDuesAndStevedoreChargesPage,
    DryBulkModulePage,
    LiquidBulkModulePage,
    BreakBulkModulePage,
    ContainerModulePage,
    VehicleModulePage,
    ModuleSummaryAndEditPage,
    StevedorAndPortDuesResultPage,
    DryBulkModuleModalPage,
    LiquidBulkModuleModalPage,
    BreakBulkModuleModalPage,
    ContainerModuleModalPage,
    VehicleModuleModalPage,
    ContentDetailsPage,
    MiscellaneousPage,
    ShoreHandlingInvoicePage,
    ShoreHandlingSummaryPage,
    EditContainerContentModalPage,
    NewComerLoginPage,
    LoginToContinuePage,
    ChangePinPage,
    ForgotOTPPage,
    ForgotResetPasswordPage,
    NotificationPage,
    FaqsPage,
    ShipListingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false
    }),
    //  AngularFireModule.initializeApp(firebase),
    // AngularFirestoreModule,
    LottieAnimationViewModule.forRoot(),
    BrowserModule,
    HttpModule,
    LazyLoadImageModule,
    IonicImageLoader.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CalculatorPage,
    InvoicesPage,
    HomePage,
    TabsPage,
    WelcomePage,
    LoginPage,
    TrackingPage,
    ProfilePage,
    VerificationPage,
    NewsDetailsPage,
    VideoDetailsPage,
    InvoicingPage,
    ShorehandlingPage,
    AgentRegistrationPage,
    CongratulationsPage,
    InvoiceDetailsPage,
    ShipmentInformationPage,
    BillDetailsPage,
    SendBillPage,
    CalculatorItemsPage,
    CalculatorItemsModalPage,
    CalculatedResultPage,
    EditCalculatorEntriesPage,
    EditCalculatorEntriesModalPage,
    VesselHandlingModulePage,
    ComingSoonPage,
    PortDuesAndStevedoreChargesPage,
    DryBulkModulePage,
    LiquidBulkModulePage,
    BreakBulkModulePage,
    ContainerModulePage,
    VehicleModulePage,
    ModuleSummaryAndEditPage,
    StevedorAndPortDuesResultPage,
    DryBulkModuleModalPage,
    LiquidBulkModuleModalPage,
    BreakBulkModuleModalPage,
    ContainerModuleModalPage,
    VehicleModuleModalPage,
    ContentDetailsPage,
    MiscellaneousPage,
    ShoreHandlingInvoicePage,
    ShoreHandlingSummaryPage,
    EditContainerContentModalPage,
    NewComerLoginPage,
    LoginToContinuePage,
    ChangePinPage,
    ForgotOTPPage,
    ForgotResetPasswordPage,
    NotificationPage,
    FaqsPage,
    ShipListingsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    YoutubeVideoPlayer,
    Firebase,
    SplashScreen,
    StatusBar,
    AzureBackendProvider,
    InAppBrowser,
    AuthProvider,
    Keyboard,
    LocalNotifications
    //  FcmProvider
  ]
})
export class AppModule {}
