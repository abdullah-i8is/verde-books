import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EveryFridayPage } from './every-friday.page';

const routes: Routes = [
  {
    path: '',
    component: EveryFridayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EveryFridayPageRoutingModule {}
