import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ShoppagePageRoutingModule } from './shoppage-routing.module';

import { ShoppagePage } from './shoppage.page';

const routes: Routes=[
  {
    path: '',
    component:ShoppagePage


  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppagePageRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShoppagePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShoppagePageModule {}
