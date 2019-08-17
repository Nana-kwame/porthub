import { ShipListingsPage } from './../ship-listings/ship-listings';
import { AzureBackendProvider } from './../../providers/azure-backend/azure-backend';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { ShipmentInformationPage } from '../shipment-information/shipment-information';
import { AlertController } from 'ionic-angular';
import { ThrowStmt } from '@angular/compiler';

/*
  Generated class for the Tracking page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-tracking',
	templateUrl: 'tracking.html'
})
export class TrackingPage {
	vesselParams: string;
	loader: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public modalCtrl: ModalController,
		public azurebackend: AzureBackendProvider,
		public loadCtrl: LoadingController,
		public alertCtrl: AlertController
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TrackingPage');
	}

	trackVesselTapped() {
		if (this.vesselParams !== undefined && this.vesselParams.trim() !== '') {
			this.loader = this.loadCtrl.create({
				spinner: 'bubbles',
				content: 'Please wait...'
			});

			const alert = this.alertCtrl.create({
				title: 'Sorry',
				subTitle: 'No vessel matching the information provided !',
				buttons: [ 'Dismiss' ]
			});

			this.loader.present();
			const data = {
				vessel: this.vesselParams
			};

			this.azurebackend
				.searchVessel(data)
				.then((res: any) => {
          if (res.result.length > 0) {
            let modal = this.modalCtrl.create(ShipListingsPage, {
              vesselData: res.result
            });
  
            modal.present();
          } else {
            const alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Logs for vessel not found!',
              buttons: ['Dismiss']
            });

            alert.present();
          }
				
					this.loader.dismiss();
					console.log('The response from the call: ', res);
				})
				.catch((err) => {
					alert.present();
					this.loader.dismiss();
					console.log('Error from the vessel tracking: ', err);
				});
		}
	}

	trackBookingCode() {
		this.loader = this.loadCtrl.create({
			spinner: 'bubbles',
			content: 'Please wait...'
		});

		const alert = this.alertCtrl.create({
			title: 'Sorry',
			subTitle: 'No vessel matching the information provided !',
			buttons: [ 'Dismiss' ]
		});

		this.loader.present();

		const data = {
			bookingCode: this.vesselParams
		};

		this.azurebackend.searchBookingCode(data).then((res: any) => {
			console.log('The booking code call: ', res);
		});
	}

	get input() {
		return this.vesselParams;
	}
}
