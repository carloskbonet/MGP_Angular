import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JogoSelecionadoPageRoutingModule } from './jogo-selecionado-routing.module';

import { JogoSelecionadoPage } from './jogo-selecionado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JogoSelecionadoPageRoutingModule
  ],
  declarations: [JogoSelecionadoPage]
})
export class JogoSelecionadoPageModule {}
