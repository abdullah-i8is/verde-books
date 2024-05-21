import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountantsPageRoutingModule } from './accountants-routing.module';

import { AccountantsPage } from './accountants.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountantsPageRoutingModule
  ],
  declarations: [AccountantsPage]
})
export class AccountantsPageModule {}
