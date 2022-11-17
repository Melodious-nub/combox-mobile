import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavePincodePageRoutingModule } from './save-pincode-routing.module';

import { SavePincodePage } from './save-pincode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavePincodePageRoutingModule
  ],
  declarations: [SavePincodePage]
})
export class SavePincodePageModule {}
