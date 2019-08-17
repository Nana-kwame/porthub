import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShipListingsPage } from './ship-listings';

@NgModule({
  declarations: [
    ShipListingsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShipListingsPage),
  ],
})
export class ShipListingsPageModule {}
