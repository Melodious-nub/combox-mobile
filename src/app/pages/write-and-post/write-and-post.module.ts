import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WriteAndPostPageRoutingModule } from './write-and-post-routing.module';

import { WriteAndPostPage } from './write-and-post.page';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WriteAndPostPageRoutingModule,
    MaterialModule,
    TranslateModule,
  ],
  declarations: [WriteAndPostPage]
})
export class WriteAndPostPageModule {}
