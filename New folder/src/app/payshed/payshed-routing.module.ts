import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayshedPage } from './payshed.page';

const routes: Routes = [
  {
    path: '',
    component: PayshedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayshedPageRoutingModule {}
