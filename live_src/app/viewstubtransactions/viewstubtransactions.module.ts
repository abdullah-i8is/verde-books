import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewstubtransactionsPageRoutingModule } from './viewstubtransactions-routing.module';

import { ViewstubtransactionsPage } from './viewstubtransactions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewstubtransactionsPageRoutingModule
    ],
  declarations: [ViewstubtransactionsPage]
})
export class ViewstubtransactionsPageModule {}
