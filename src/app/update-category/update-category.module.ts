import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { UpdateCategoryPageRoutingModule } from './update-category-routing.module';

import { UpdateCategoryPage } from './update-category.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateCategoryPage


  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    UpdateCategoryPageRoutingModule
  ],
  declarations: [UpdateCategoryPage]
})
export class UpdateCategoryPageModule {}
