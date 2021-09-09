import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JogoSelecionadoPage } from './jogo-selecionado.page';

const routes: Routes = [
  {
    path: '',
    component: JogoSelecionadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JogoSelecionadoPageRoutingModule {}
