import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavePincodePage } from './save-pincode.page';

const routes: Routes = [
  {
    path: '',
    component: SavePincodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavePincodePageRoutingModule {}
