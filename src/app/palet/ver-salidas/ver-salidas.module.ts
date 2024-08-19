import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerSalidasPageRoutingModule } from './ver-salidas-routing.module';

import { VerSalidasPage } from './ver-salidas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerSalidasPageRoutingModule
  ],
  declarations: [VerSalidasPage]
})
export class VerSalidasPageModule {}
