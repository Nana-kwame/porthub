import { NotificationPage } from "./../notification/notification";
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ModalController,
  Events
} from "ionic-angular";
import { WelcomePage } from "../welcome/welcome";
import { AzureBackendProvider } from "../../providers/azure-backend/azure-backend";
import { DomSanitizer } from "@angular/platform-browser";

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  new_not_alert: boolean;
  agentData: any;
  dateCreated: any;
  intiials: string;
  image: any;
  brokenImage = "./../../assets/imgs/undraw_profile_pic_ic5t.svg";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public events: Events,
    private azure: AzureBackendProvider,
    private sanitizer: DomSanitizer,
  ) {
    // events.subscribe("new_notification", (val) => {
    //   this.new_not_alert = val;
    //   console.log('What is new_not_alert: ', this.new_not_alert)
    // });

    this.new_not_alert = JSON.parse(localStorage.getItem('new_notification'));
    console.log(typeof this.new_not_alert);
    this.agentData = JSON.parse(localStorage.getItem('agentData'));

    // this.image = this.sanitizer.bypassSecurityTrustUrl(this.agentData.photo);

    console.log(this.image);
  }

  ionViewDidLoad() {


    let letters = this.agentData['firstName'].split(' ')
    console.log(letters);
    this.dateCreated = this._formatDate(this.agentData.dateCreated);
    this.getImage(this.agentData.photoUrl);

  }

  _formatDate(date?, long?) {
    if (date && long && long.trim()) {
      return new Date(Number(date)).toDateString() + ', ' + new Date(Number(date))
        .toLocaleTimeString();
    }

    if (date) {
      return new Date(date).toDateString() + ', ' + new Date(date).toLocaleTimeString();
    } else {
      return 'N/A';
    }
  }

  goToNotificationPage() {
    const modal = this.modalCtrl.create(NotificationPage);
    modal.present();
    this.new_not_alert = false;
  }

  getImage(photoUrl) {
    this.azure.getAgentImage(photoUrl).then((res: any) => {
      if (res.status) {
        console.log(res);
        return this.image = res;
      }
    }).catch(err => {
      console.error(err);
      return this.image = this.sanitizer.bypassSecurityTrustUrl(JSON.stringify('data:image/jpeg;base64,' + this.agentData.photo));
    })
  }

  updateImage($event) {
    this.image = './../../assets/imgs/undraw_profile_pic_ic5t.svg';
  }
}
