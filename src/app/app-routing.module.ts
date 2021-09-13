import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Cadastro',
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
  },
  {
    path: 'Cadastro',
    loadChildren: () => import('./Pages/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'Editar',
    loadChildren: () => import('./Pages/editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'Jogo-Selecionado',
    loadChildren: () => import('./Pages/jogo-selecionado/jogo-selecionado.module').then( m => m.JogoSelecionadoPageModule)
  },
  {
    path: 'Pages/Sobre',
    loadChildren: () => import('./Pages/sobre/sobre.module').then( m => m.SobrePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
