import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppagePage } from './shoppage.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppagePageRoutingModule {}
