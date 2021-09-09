import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Pages/Biblioteca',
    pathMatch: 'full'
  },
  {
    path: 'Pages/Perfil',
    loadChildren: () => import('./Pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'Pages/Loja',
    loadChildren: () => import('./Pages/loja/loja.module').then( m => m.LojaPageModule)
  },
  {
    path: 'Pages/Biblioteca',
    loadChildren: () => import('./Pages/biblioteca/biblioteca.module').then( m => m.BibliotecaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
