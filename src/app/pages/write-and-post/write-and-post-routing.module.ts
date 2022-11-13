import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WriteAndPostPage } from './write-and-post.page';

const routes: Routes = [
  {
    path: '',
    component: WriteAndPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WriteAndPostPageRoutingModule {}
