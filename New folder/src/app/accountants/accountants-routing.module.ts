import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountantsPage } from './accountants.page';

const routes: Routes = [
  {
    path: '',
    component: AccountantsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountantsPageRoutingModule {}
