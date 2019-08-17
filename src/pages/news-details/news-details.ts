import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ImageLoaderConfig } from 'ionic-image-loader';

/*
  Generated class for the NewsDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-news-details',
  templateUrl: 'news-details.html'
})
export class NewsDetailsPage {
  tabs: any;
  parsedData: any;
  placeholder: any;
  shift: boolean;
  pageNews: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private imageLoaderConfig: ImageLoaderConfig) {
    //  this.tabs = document.querySelector('.tabbar');
    this.placeholder = "assets/img/ship.png"
    this.parsedData = this.navParams.get('feed');
    // decodeURI(this.parsedData.newsImages);
    if (this.parsedData.newsImages == "ship.png") {
      this.parsedData.newsImages == "assets/img/ship.png"
      this.shift = true;
    }

    let regex = /<img.*?src='(.*?)'/;
    this.pageNews = this.parsedData.body.replace(/<img .*?>/g, '');
    console.log(this.pageNews);
    console.log("feed", this.parsedData);
    this.imageLoaderConfig.setFallbackUrl('../../assets/img/ship.png');
    this.imageLoaderConfig.setBackgroundSize('cover');
    this.imageLoaderConfig.enableFallbackAsPlaceholder(true);
    this.imageLoaderConfig.enableSpinner(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsDetailsPage');

  }
  onImageLoad(){
    console.log("loaded");
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

  onBackTapped() {
    this.navCtrl.pop();
  }

}
