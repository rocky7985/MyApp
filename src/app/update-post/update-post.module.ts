import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { UpdatePostPageRoutingModule } from './update-post-routing.module';

import { UpdatePostPage } from './update-post.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePostPage


  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    UpdatePostPageRoutingModule
  ],
  declarations: [UpdatePostPage]
})
export class UpdatePostPageModule { }
