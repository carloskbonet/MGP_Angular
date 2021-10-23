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
  private lista_jogos: jogo[] = []
  private data: any

  constructor(private router: Router, private _jogoService: JogoService) {
    this.data = this._jogoService.getJogos()
    this.data.forEach(data => {
      const lista = data as Array<any>
      lista.forEach(c => {
        let _jogo = new jogo(c.data._nome, c.data._descricao, c.data._preco)
        this.lista_jogos.push(_jogo)
      })
    });
  }

  ngOnInit() {
  }

  private expandir(jogos: jogo): void {
    this.router.navigateByUrl("/Jogo-Selecionado", { state: { objeto: jogos } })
  }

}
