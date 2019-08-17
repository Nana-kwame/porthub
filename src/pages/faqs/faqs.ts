import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
/**
 * Generated class for the FaqsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-faqs',
  templateUrl: 'faqs.html',
})

export class FaqsPage {
  changeColor = false;
  shoudHide = true;
  faqs: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private http: Http) {
  }

  ionViewDidLoad() {
    let localData = this.http.get('../../assets/faqs.json').map(res => res.json().faqs)
    localData.subscribe(data => {
      this.faqs = data;
    })
    console.log('ionViewDidLoad FaqsPage');

  }
  close(){
    this.viewCtrl.dismiss();
  }

  viewMore(){
    this.shoudHide = !this.shoudHide;
  }

  toggleSection(i) {
    this.changeColor = !this.changeColor;
    this.faqs[i].open = !this.faqs[i].open;
    console.log('The test value ', this.faqs[i]);

  }

  toggleItem(i, j) {
    this.faqs[i].children[j].open = !this.faqs[i].children[j].open;
    console.log(this.faqs.children[j]);

  }
}
