import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jogo } from 'src/app/Class/jogo';
import { JogoService } from 'src/app/services/jogo.service';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.page.html',
  styleUrls: ['./loja.page.scss'],
})
export class LojaPage implements OnInit {
  private lista_jogos:jogo[] = []

  constructor(private router:Router , _jogoService:JogoService) {
    this.lista_jogos = _jogoService.getJogos()
  }

  ngOnInit() {
  }

  private expandir(jogos:jogo):void{
    this.router.navigateByUrl("/Jogo-Selecionado",{state: {objeto : jogos}})
  }

}
