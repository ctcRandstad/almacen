import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevolverPage } from './devolver.page';

const routes: Routes = [
  {
    path: '',
    component: DevolverPage
  },
  {
    path: 'dev-normal',
    loadChildren: () => import('./dev-normal/dev-normal.module').then( m => m.DevNormalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevolverPageRoutingModule {}
