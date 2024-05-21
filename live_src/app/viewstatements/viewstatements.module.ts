import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewstatementsPageRoutingModule } from './viewstatements-routing.module';

import { ViewstatementsPage } from './viewstatements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewstatementsPageRoutingModule
  ],
  declarations: [ViewstatementsPage]
})
export class ViewstatementsPageModule {}
