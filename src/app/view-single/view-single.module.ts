import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { ViewSinglePageRoutingModule } from './view-single-routing.module';

import { ViewSinglePage } from './view-single.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewSinglePageRoutingModule
  ],
  declarations: [ViewSinglePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewSinglePageModule {}
