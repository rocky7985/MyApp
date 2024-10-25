import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProductCategoryPage } from './add-product-category.page';

const routes: Routes = [
  {
    path: '',
    component: AddProductCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddProductCategoryPageRoutingModule {}
