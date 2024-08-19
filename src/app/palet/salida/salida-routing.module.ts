import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalidaPage } from './salida.page';

const routes: Routes = [
  {
    path: 'salida',
    component: SalidaPage,
    children: [
      {
        path: 'devolver',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./devolver/devolver.module').then(m => m.DevolverPageModule)
          }
        ]
      },
      {
        path: 'devolverP',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./devolver/dev-normal/dev-normal.module').then(m => m.DevNormalPageModule)
          }
        ]
      },
      {
        path: 'ver-salidas',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../ver-salidas/ver-salidas.module').then(m => m.VerSalidasPageModule)
          }
        ]
      },
      {
        path: 'verDevoluciones',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../sobrantes/sobrantes.module').then(m => m.SobrantesPageModule)
          }
        ]
      },
      {
        path: 'normal',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./normal/normal.module').then(m => m.NormalPageModule)
          }
        ]
      },
      {
        path: 'instruccion',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./instruccion/instruccion.module').then(m => m.InstruccionPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/salida/normal',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/salida/normal',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalidaPageRoutingModule {}
