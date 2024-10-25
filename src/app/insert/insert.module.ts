import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { InsertPageRoutingModule } from './insert-routing.module';

import { InsertPage } from './insert.page';

const routes: Routes = [
  {
    path: '',
    component: InsertPage


  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    InsertPageRoutingModule
  ],
  declarations: [InsertPage]
})
export class InsertPageModule {}
