import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevNormalPage } from './dev-normal.page';

const routes: Routes = [
  {
    path: '',
    component: DevNormalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevNormalPageRoutingModule {}
