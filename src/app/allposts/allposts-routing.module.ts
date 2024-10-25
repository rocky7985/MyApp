import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllpostsPage } from './allposts.page';

const routes: Routes = [
  {
    path: '',
    component: AllpostsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllpostsPageRoutingModule {}
