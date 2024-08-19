import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstruccionPageRoutingModule } from './instruccion-routing.module';

import { InstruccionPage } from './instruccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstruccionPageRoutingModule
  ],
  declarations: [InstruccionPage]
})
export class InstruccionPageModule {}
