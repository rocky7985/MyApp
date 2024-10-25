import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HomePageRoutingModule } from './home-routing.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage


  }
];



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
