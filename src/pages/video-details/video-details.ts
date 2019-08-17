import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';

/*
  Generated class for the VideoDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-video-details',
  templateUrl: 'video-details.html'
})
export class VideoDetailsPage {
  parsedData: any;
  videoUrl: SafeResourceUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams, private domSanitizer: DomSanitizer) {
    //  this.tabs = document.querySelector('.tabbar');
    this.parsedData = this.navParams.get('parsedData');
    console.log("video", this.parsedData);
     this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.parsedData.id.videoId)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsDetailsPage');
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


}
