import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaletPageRoutingModule } from './palet-routing.module';

import { PaletPage } from './palet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaletPageRoutingModule
  ],
  declarations: [PaletPage]
})
export class PaletPageModule {}
