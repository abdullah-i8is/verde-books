import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EveryFridayPageRoutingModule } from './every-friday-routing.module';

import { EveryFridayPage } from './every-friday.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EveryFridayPageRoutingModule
  ],
  declarations: [EveryFridayPage]
})
export class EveryFridayPageModule {}
