import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerSalidasPage } from './ver-salidas.page';

const routes: Routes = [
  {
    path: '',
    component: VerSalidasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerSalidasPageRoutingModule {}
