import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayrolPage } from './payrol.page';

const routes: Routes = [
  {
    path: '',
    component: PayrolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrolPageRoutingModule {}
