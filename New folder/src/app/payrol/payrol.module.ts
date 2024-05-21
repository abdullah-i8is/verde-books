import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayrolPageRoutingModule } from './payrol-routing.module';

import { PayrolPage } from './payrol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayrolPageRoutingModule
  ],
  declarations: [PayrolPage]
})
export class PayrolPageModule {}
