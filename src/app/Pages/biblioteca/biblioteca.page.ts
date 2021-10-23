import { Component, OnInit } from '@angular/core';
import { conta } from 'src/app/Class/conta';
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
  private lista_jogos : jogosComprados[]
  private usuario : conta

  constructor(private alertController:AlertController,
    private _jogoService : JogoService,
    private _perfilService : PerfilService) {
    this.usuario = _perfilService.getConta()
    this.lista_jogos = _jogoService.getJogosComprados()
  }

  public async delete_game(jogos:jogosComprados){        
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
            this._jogoService.reembolsarJogo(jogos.getNome() , this.usuario.getID())
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
