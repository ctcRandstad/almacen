import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstruccionPage } from './instruccion.page';

const routes: Routes = [
  {
    path: '',
    component: InstruccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstruccionPageRoutingModule {}
