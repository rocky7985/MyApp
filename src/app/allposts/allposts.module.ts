import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllpostsPageRoutingModule } from './allposts-routing.module';

import { AllpostsPage } from './allposts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllpostsPageRoutingModule
  ],
  declarations: [AllpostsPage]
})
export class AllpostsPageModule {}
