import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavePincodePageRoutingModule } from './save-pincode-routing.module';

import { SavePincodePage } from './save-pincode.page';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavePincodePageRoutingModule,
    MaterialModule,
    TranslateModule
  ],
  declarations: [SavePincodePage]
})
export class SavePincodePageModule {}
