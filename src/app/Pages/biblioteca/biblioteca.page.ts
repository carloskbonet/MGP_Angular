import { Component, OnInit } from '@angular/core';
import { conta } from 'src/app/Class/conta';
import { jogo } from 'src/app/Class/jogo';
import { jogosComprados } from 'src/app/Class/jogosComprados';
import { JogoService } from 'src/app/services/jogo.service';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage implements OnInit {
  private lista_jogos : jogo[] = []
  private usuario : conta
  constructor(private _jogoService : JogoService , _perfilService : PerfilService) {
    this.usuario = _perfilService.getConta()
    let lista_jogos_aux : jogo[] = _jogoService.getJogos()
    let lista_jogos_comprados : jogosComprados[] = _jogoService.getJogosComprados()
    for(let i=0; i<lista_jogos_comprados.length; i++){
      if(lista_jogos_comprados[i].getNomeUsuario() == this.usuario.getNome()){
        for(let j=0; j<lista_jogos_aux.length; j++){
          if(lista_jogos_aux[j].getNome() == lista_jogos_comprados[i].getNome()){
            this.lista_jogos.push(lista_jogos_aux[j])
            break;
          }
        }
      }
    }
  }

  ngOnInit() {
  }

}
