import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOrganizationRoutingModule } from './add_organization-routing.module';

import { AddOrganizationComponent } from './add-organization.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddOrganizationRoutingModule
  ],
  declarations: [AddOrganizationComponent]
})
export class AddOrganizationModule {}
