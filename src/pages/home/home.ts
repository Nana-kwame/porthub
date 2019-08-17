import { FaqsPage } from "./../faqs/faqs";
import { NotificationPage } from "./../notification/notification";
import { AzureBackendProvider } from "./../../providers/azure-backend/azure-backend";
import { Component } from "@angular/core";
import { Http } from "@angular/http";
import { NavController, AlertController, ModalController, Platform, ToastController } from "ionic-angular";
import { NewsDetailsPage } from "../news-details/news-details";
import { VideoDetailsPage } from "../video-details/video-details";
// import { YoutubeVideoPlayer } from 'ionic-native';
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player";
import { ImageLoaderConfig } from "ionic-image-loader";
import { InAppBrowser } from "@ionic-native/in-app-browser"; //Nana Kwame import for opening the internal webview
import "rxjs/add/operator/map";
import { NewComerLoginPage } from "../new-comer-login/new-comer-login";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { LoginPage } from '../login/login';
import { LoginToContinuePage } from "../login-to-continue/login-to-continue";

declare var ImageCompressor: any;
//  window.onload = this.resizeAllGridItems();
let allItems = document.getElementsByClassName("eye_on_port_item");

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  activities: any;
  feeds: any;
  videos: any;
  next: any;
  pageNumber: any;
  placeholder: string;
  image_comp: any;
  loopData: any;
  searchQuery: any = "";
  e_o_p = true;
  news = false;
  newsActive: boolean;
  eyeActive: boolean = true;
  showBack: boolean;
  newsFillColor: string = "#000";

  eyeOnPortIcon = './../../assets/img/eye_on_port.png';
  newsIcon = './../../assets/img/'


  /**
   * Loads eye on port and top news feed.
   * Also sets initial segment to eye on port.
   */
  constructor(
    public navCtrl: NavController,
    public http: Http,
    private youtube: YoutubeVideoPlayer,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private imageLoaderConfig: ImageLoaderConfig,
    public azureBackend: AzureBackendProvider,
    public iab: InAppBrowser,
    private platform: Platform,
    private localNotifications: LocalNotifications,
    private toastCtrl: ToastController
  ) { }

  ionViewDidLoad() {
    localStorage.setItem("original_feed_list", JSON.stringify([]));
    localStorage.setItem("original_video_list", JSON.stringify([]));
    this.activities = "eop";
    this.pageNumber = 1;
    this.placeholder = "assets/img/placeholder.jpg";
    // this.imageLoaderConfig.setFallbackUrl("../../assets/img/placeholder.jpg");
    // this.imageLoaderConfig.setBackgroundSize("cover");
    // this.imageLoaderConfig.enableFallbackAsPlaceholder(true);
    // this.imageLoaderConfig.enableSpinner(true);
    //this.azureBackend.getNewsFeed(this.pageNumber);

    this.getNewsFeed();
    this.getYouTubeFeed();

    let login_status = localStorage.getItem("login_status");
    console.log("From the home page: ", login_status);

    if (login_status == "false") {
      this.showBack = true;
    } else {
      this.showBack = false;
    }

    this.resizeAllGridItems();

    this.getAgentInvoice();

  }

  searchItems(searchbar) {
    // set q to the value of the searchbar
    var q = this.searchQuery;
    console.log(this.searchQuery);
    this.initializeInvoices();
    if (this.news) {
      // if the value is an empty string don't filter the items
      if (q === "") {
        this.feeds = JSON.parse(localStorage.getItem("original_feed_list"));
        return;
      } else {
        this.feeds = this.feeds.filter(v => {
          if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            console.log(this.feeds);
            return true;
          }
          console.log(this.feeds);
          return false;
        });
      }
    } else if (this.e_o_p) {
      // if the value is an empty string don't filter the items
      if (q === "") {
        this.videos = JSON.parse(localStorage.getItem("original_video_list"));
        return;
      } else {
        this.videos = this.videos.filter(v => {
          if (v.snippet.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            console.log(this.feeds);
            return true;
          }
          console.log(this.feeds);
          return false;
        });
      }
    }
  }

  initializeInvoices() {
    this.feeds = JSON.parse(localStorage.getItem("original_feed_list"));
    this.videos = JSON.parse(localStorage.getItem("original_video_list"));
  }

  switchView() {
    this.e_o_p = !this.e_o_p;
    if (this.e_o_p) {
      this.eyeActive = true;
    } else {
      this.eyeActive = false;
    }

    this.news = !this.news;
    if (this.news) {
      this.newsActive = true;
      this.newsFillColor = "#0d92ff";
    } else {
      this.newsActive = false;
      this.newsFillColor = "#000";
    }
    // this.newsActive = !this.newsActive;
  }

  /**
   * Click listener for news item
   * navigates you to the news details page.
   */
  newsItemTapped(event, feed) {
    let newsDetailsModal = this.modalCtrl.create(NewsDetailsPage, {
      feed: feed
    });
    newsDetailsModal.present();
  }

  /**
   * Click listener for eye on port video item.
   * opens an instance of the youtube player withn the app
   */
  videoItemTapped(event, video) {
    //event parameter is not being used
    try {
      this.youtube.openVideo(video.id.videoId);
    } catch (error) {
      this.presentAlert();
    }
    // this.navCtrl.push(VideoDetailsPage, { "parsedData": video });
  }

  /**
   * Comment for method ´doSomething´.
   * @param target  Comment for parameter ´target´.
   * @returns       Comment for return value.
   */
  doRefresh(refresher) {
    if (this.activities === "eop") {
      this.http
        .get(
          "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCKJb-WIYA_f8Qbmsm5auxsQ&key=AIzaSyCK7LdOa5AradMLrdIao_d9EDXjbuIca0U&order=date"
        )
        .map(res => res.json())
        .subscribe(data => {
          this.videos = data.items;
          localStorage.setItem(
            "original_video_list",
            JSON.stringify(this.videos)
          );
          refresher.complete();
          console.log(this.videos);
        });
    } else {
      this.http
        .post("http://52.176.108.222/getNews?pageNumber=1&pageSize=10", "")
        .map(res => res.json())
        .subscribe(data => {
          this.feeds = data.result;
          localStorage.setItem(
            "original_feed_list",
            JSON.stringify(this.feeds)
          );
          refresher.complete();
          console.log(this.feeds);
        });
    }
  }

  doInfinite(infiniteScroll) {
    this.http
      .get(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCKJb-WIYA_f8Qbmsm5auxsQ&key=AIzaSyCK7LdOa5AradMLrdIao_d9EDXjbuIca0U&order=date&pageToken=" +
        this.next
      )
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        for (var i = 0; i < data.items.length; i++) {
          this.videos.push(data.items[i]);
        }
        localStorage.setItem(
          "original_video_list",
          JSON.stringify(this.videos)
        );
        this.next = data.nextPageToken;
        infiniteScroll.complete();
        console.log(this.next);
      });
  }

  doNewsInfinite(infiniteScroll) {
    this.pageNumber = this.pageNumber + 1;
    console.log(this.pageNumber);
    this.http
      .post(
        "http://52.176.108.222/getNews?pageNumber=" +
        this.pageNumber +
        "&pageSize=10",
        ""
      )
      .map(res => res.json())
      .subscribe(data => {
        for (var i = 0; i < data.result.length; i++) {
          this.feeds.push(data.result[i]);
        }
        localStorage.setItem("original_feed_list", JSON.stringify(this.feeds));
        console.log(data);
        infiniteScroll.complete();
        console.log(this.next);
      });
  }

  compressor(data) {
    this.image_comp = new ImageCompressor();
    this.loopData = data;
    let compressorSettings = {
      toWidth: 100,
      toHeight: 100,
      mimeType: "image/png",
      mode: "strict",
      quality: 0.6,
      grayScale: true,
      sepia: true,
      threshold: 127,
      speed: "low"
    };

    let jpegCompressorSettings = {
      toWidth: 100,
      toHeight: 100,
      mimeType: "image/jpeg",
      mode: "strict",
      quality: 0.6,
      grayScale: true,
      sepia: true,
      threshold: 127,
      speed: "low"
    };

    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      if (this.loopData[i].newsImages.endsWith("png")) {
        this.image_comp.run(
          "../../assets/img/logo.png",
          compressorSettings,
          function (compressedSrc) {
            console.log("what happened?", compressedSrc);
          }
        );
      }
      // else if ("../../assets/img/" || this.loopData.newsImage.endsWith("jpg")) {
      //   // debugger;
      //   this.image_comp.run(
      //     this.loopData[i].newsImage,
      //     jpegCompressorSettings,
      //     function (compressedSrc) {
      //       console.log("what happened?", compressedSrc);
      //     });
      // }
    }
  }

  imageCompressionCallBack(compressedSrc) {
    console.log("what happened?", compressedSrc);
  }

  presentAlert() {
    const alert = this.alertCtrl.create({
      title: "Error!",
      subTitle: "Please install the Youtube app to view this video.",
      buttons: [
        {
          text: "Ok",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    alert.present();
  }

  getNewsFeed() {
    this.azureBackend
      .getNewsFeed(this.pageNumber)
      .then((res: any) => {
        console.log("The revised data: ", res);
        let oldNews = JSON.parse(localStorage.getItem('original_feed_list'));
        this.feeds = res;

        // if (oldNews.length < this.feeds.length) {
        //   const alertInfo = {
        //     title: 'News Alert',
        //     message: 'New stories posted',
        //   };

        //   this.presentLocalNotifications(alertInfo.title, alertInfo.message);
        //   this.presentInAppAlert(alertInfo.message, 3500, 'news-alert');
        // }

        localStorage.setItem("original_feed_list", JSON.stringify(this.feeds));

        // ** DISPLAY THE LENGTH OF THE OLD & NEW FEED LENGTHS **//

        // TODO DELETE AFTERWARDS

        console.log('The old feed length: ', oldNews.length);
        console.log('The new feed length: ', this.feeds.length);
        
      })
      .catch((err: any) => {
        console.log(err);

      });

  }

  getYouTubeFeed() {
    this.http
      .get(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCKJb-WIYA_f8Qbmsm5auxsQ&key=AIzaSyCK7LdOa5AradMLrdIao_d9EDXjbuIca0U&order=date"
      )
      .map(res => res.json())
      .subscribe(data => {
        // ** Getting the length of the old list//
        const oldVids = JSON.parse(localStorage.getItem('original_video_list'));

        this.videos = data.items;

        // if (oldVids.length < this.videos.length) {
        //   let num = this.videos.length - oldVids.length;
        //   const alertInfo = {
        //     title: 'Eye On Port',
        //     message: JSON.stringify(num) + ' New Episodes from Eye on Port',
        //     icon: './../../assets/img/eye_on_port.png'
        //   }
        //   this.presentLocalNotifications(
        //     alertInfo.title,
        //     alertInfo.message,
        //     alertInfo.icon
        //   );

        //   this.presentInAppAlert(alertInfo.message, 3500, 'youtube-alert');


        // }
        localStorage.setItem("original_video_list", JSON.stringify(this.videos));
        this.next = data.nextPageToken;

          // ** DISPLAY THE LENGTH OF THE OLD & NEW VID LENGTHS **//

        // TODO DELETE AFTERWARDS
        console.log('The old video length :', oldVids.length);
        console.log('The new vid length: ', this.videos.lenght)

      });

    // this.azureBackend.getYouTubeFeed().then((res: any) => {
    //   this.videos =res.items;
    //     localStorage.setItem(
    //       "original_video_list",
    //       JSON.stringify(this.videos)
    //     );
    //     this.next = res.nextPageToken;
    //     console.log('Revised youtube feed call: ', this.videos);


    // })
  }

  openWebView(link: any) {
    const browser = this.iab.create(
      "https://www.youtube.com/results?search_query=" + link
    );
    browser.show();
  }

  openNotifications() {
    const notifcationModal = this.modalCtrl.create(NotificationPage);
    notifcationModal.present();
  }

  openFaqs() {
    const faqModal = this.modalCtrl.create(FaqsPage);
    faqModal.present();
  }

  goBack() {
    // this.navCtrl.setRoot(NewComerLoginPage);
    const modal = this.modalCtrl.create(NewComerLoginPage);
    modal.present();
  }

  // Masonary Layout
  resizeGridItem(item) {
    let grid = document.getElementsByClassName("eye_on_port")[0];
    let rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );

    let rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
    );
    let rowSpan = Math.ceil(
      (item.querySelector(".eye_on_port_item--card").getBoundingClientRect()
        .height +
        rowGap) /
      (rowHeight + rowGap)
    );
    item.style.gridRowEnd = "span " + rowSpan;
  }

  resizeAllGridItems() {
    let allItems = document.getElementsByClassName("eye_on_port_item");

    for (let i = 0; i < allItems.length; i++) {
      this.resizeGridItem(allItems[i]);
    }
  }

  resizeInstance(instance) {
    let item = instance.elements[0];
    this.resizeGridItem(item);
  };

  // Utility function to compare the values 

  compareArrays(array1, array2) {
    let baseArray = [], diff = [];

    for (let i = 0; i < array1.length; i++) {
      baseArray[array1[i]] = true;
    }

    for (let i = 0; i < array1.length; i++) {
      if (baseArray[array2[i]]) {
        delete baseArray[array2[i]]
      } else {
        baseArray[array2[i]] = true;
      }
    }

    for (let k in baseArray) {
      diff.push(k);
    }

    return diff;

    // const finalArray = [];
    // Array.prototype.forEach.call(array1, arr1 => {
    //   array2.indexOf(arr1) < 0 ? finalArray.push(arr1) : null;
    // });

  }

  // Preparing the local notifications
  presentLocalNotifications(title: string, text: string, icon?: string) {
    let count =
      this.localNotifications.schedule([{
        id: new Date().getTime(),
        title: title,
        text: text,
        icon: icon,
        led: '#0457DD'
      }, {
        id: new Date().getTime(),
        title: title,
        text: text,
        icon: icon,
        led: '#0457DD'
      },
      {
        id: new Date().getTime(),
        title: title,
        text: text,
        icon: icon,
        led: '#0457DD'
      }
      ]);

    ;
  };

  // Preparing the toasts to show on notify

  presentInAppAlert(message: string, duration: number, cssClass) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'top',
      cssClass: cssClass,
    });

    toast.present();
  }


  // ** The get invoices that have been paid for by agents call** //

  getAgentInvoice() {
    const data = {
      param: localStorage.getItem('agent_id'),
      limit: 0,
      offset: 10
    }

    this.azureBackend.getPaidForInvoice(data).then((res: any) => {
      if ([localStorage.getItem('paidForInvoices')].length < res.length) {
        let num = res.length - [localStorage.getItem('paidForInvoices')].length;
        this.presentLocalNotifications('Invoice Payment', JSON.stringify(num) + ' invoices successfully paid for', './../../assets/imgs/invoice_paid_.png')
        this.presentInAppAlert(JSON.stringify(num) + ' invoices successfully paid for', 35000, 'invoicePaid-alert')
      }
      let paidForInvocies = res;
      localStorage.setItem('paidForInvoices', paidForInvocies);
    }).catch((err: any) => {
      console.error(err);
    });
  }

  goToLoginPage() {
    this.navCtrl.setRoot(LoginToContinuePage);
  }
}
