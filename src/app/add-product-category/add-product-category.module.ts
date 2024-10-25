import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { AddProductCategoryPageRoutingModule } from './add-product-category-routing.module';

import { AddProductCategoryPage } from './add-product-category.page';

const routes: Routes = [
  {
    path: '',
    component: AddProductCategoryPage


  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AddProductCategoryPageRoutingModule
  ],
  declarations: [AddProductCategoryPage]
})
export class AddProductCategoryPageModule { }
