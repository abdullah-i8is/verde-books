import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayshedPageRoutingModule } from './payshed-routing.module';

import { PayshedPage } from './payshed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayshedPageRoutingModule
  ],
  declarations: [PayshedPage]
})
export class PayshedPageModule {}
