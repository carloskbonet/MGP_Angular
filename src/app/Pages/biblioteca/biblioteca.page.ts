import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { conta } from 'src/app/Class/conta';
import { jogo } from 'src/app/Class/jogo';
import { jogosComprados } from 'src/app/Class/jogosComprados';
import { JogoService } from 'src/app/services/jogo.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage implements OnInit {
  private lista_jogos : jogo[] = []
  private usuario : conta

  constructor(private alertController:AlertController , private router:Router , private _jogoService : JogoService , private _perfilService : PerfilService) {
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

  public async delete_game(jogos:jogo){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Reembolso',
      message: 'Realmente deseja reembolsar o jogo selecionado?',
      buttons: [
        {
          text: 'Não',
          cssClass: 'secondary'
        }, {
          text: 'Sim',
          handler: () => {
            this._jogoService.reembolsarJogo(jogos.getNome() , this._perfilService.getConta().getNome())
            let index = this.lista_jogos.indexOf(jogos)
            this.lista_jogos.splice(index,1)
          }
        }
      ]
    });

    await alert.present();

  }
  
  ngOnInit() {
  }

}
