import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaletPage } from './palet.page';

const routes: Routes = [
  {
    path: '',
    component: PaletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaletPageRoutingModule {}
