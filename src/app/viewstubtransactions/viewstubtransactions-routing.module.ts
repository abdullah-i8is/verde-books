import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ViewstubtransactionsPage } from './viewstubtransactions.page';

const routes: Routes = [
  {
    path: '',
    component: ViewstubtransactionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewstubtransactionsPageRoutingModule {}
