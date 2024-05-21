import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaychecklistPage } from './paychecklist.page';

const routes: Routes = [
  {
    path: '',
    component: PaychecklistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaychecklistPageRoutingModule {}
