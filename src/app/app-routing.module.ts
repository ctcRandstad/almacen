import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./paginas/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
 
  //palet
  {
    path: 'main1',
    loadChildren: () => import('./paginas/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'palets',
    loadChildren: () => import('./palet/palet/palet.module').then( m => m.PaletPageModule)
  },
 
  {
    path: 'comandas',
    loadChildren: () => import('./palet/comandas/comandas.module').then( m => m.ComandasPageModule)
  },
  {
    path: 'stock',
    loadChildren: () => import('./palet/stock/stock.module').then( m => m.StockPageModule)
  },
 
  {
    path: '',
    loadChildren: () => import('./palet/salida/salida.module').then( m => m.SalidaPageModule)
  },
  {
    path: 'salida/normal',
    loadChildren: () => import('./palet/salida/normal/normal.module').then( m => m.NormalPageModule)
  },
  {
    path: 'instruccion',
    loadChildren: () => import('./palet/instruccion/instruccion.module').then( m => m.InstruccionPageModule)
  },

  {
    path:'entrada/:id',   
    loadChildren: () => import('./Materiales/entrada/entrada.module').then( m => m.EntradaPageModule)
  },

  {
    path:'material/:id',   
    loadChildren: () => import('./Materiales/material/material.module').then( m => m.MaterialPageModule)
  },

  {
    path:'ubicarM/:id',   
    loadChildren: () => import('./Materiales/ubicar/ubicar.module').then( m => m.UbicarPageModule)
  },

  {
    path:'movimientosM/:id',   
    loadChildren: () => import('./Materiales/movimientos/movimientos.module').then( m => m.MovimientosPageModule)
  },

  {
    path:'stockM/:id',   
    loadChildren: () => import('./Materiales/stock/stock.module').then( m => m.StockPageModule)
  },
  {
    path: 'ubicaciones',
    loadChildren: () => import('./paginas/ubicaciones/ubicaciones.module').then( m => m.UbicacionesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
