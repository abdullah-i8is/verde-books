import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewstatementsPage } from './viewstatements.page';

const routes: Routes = [
  {
    path: '',
    component: ViewstatementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewstatementsPageRoutingModule {}
