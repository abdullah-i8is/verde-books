import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmploydetailPage } from './employdetail.page';

const routes: Routes = [
  {
    path: '',
    component: EmploydetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmploydetailPageRoutingModule {}
