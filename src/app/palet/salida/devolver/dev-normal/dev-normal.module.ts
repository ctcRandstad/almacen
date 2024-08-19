import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevNormalPageRoutingModule } from './dev-normal-routing.module';

import { DevNormalPage } from './dev-normal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevNormalPageRoutingModule
  ],
  declarations: [DevNormalPage]
})
export class DevNormalPageModule {}
