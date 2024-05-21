import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmploydetailPageRoutingModule } from './employdetail-routing.module';

import { EmploydetailPage } from './employdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmploydetailPageRoutingModule
  ],
  declarations: [EmploydetailPage]
})
export class EmploydetailPageModule {}
