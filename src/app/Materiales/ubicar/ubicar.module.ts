import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';

import { UbicarPageRoutingModule } from './ubicar-routing.module';

import { UbicarPage } from './ubicar.page';
import { FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    UbicarPageRoutingModule,
    FormsModule,
  ],
  declarations: [UbicarPage],
 
})
export class UbicarPageModule {}
