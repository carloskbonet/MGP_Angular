import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { present } from '@ionic/core/dist/types/utils/overlays';
import { conta } from 'src/app/Class/conta';
import { jogo } from 'src/app/Class/jogo';
import { jogosComprados } from 'src/app/Class/jogosComprados';
import { JogoService } from 'src/app/services/jogo.service';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-jogo-selecionado',
  templateUrl: './jogo-selecionado.page.html',
  styleUrls: ['./jogo-selecionado.page.scss'],
})
export class JogoSelecionadoPage implements OnInit {
  private jogo_selecionado: jogo
  private conta_usuario: conta
  private lista_jogos_comprados: jogosComprados[]
  constructor(private alertController: AlertController , private router: Router, _perfilService: PerfilService , private _jogoService: JogoService) {
    this.conta_usuario = _perfilService.getConta()
  }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation()
    this.jogo_selecionado = nav.extras.state.objeto
  }

  private backToStore(): void {
    this.router.navigateByUrl("/Pages/Loja")
  }

  private comprar(): void {
    let validar:boolean = false
    this.lista_jogos_comprados = this._jogoService.getJogosComprados()
    for(let i=0; i<this.lista_jogos_comprados.length; i++){
      if(this.lista_jogos_comprados[i].getNome() == this.jogo_selecionado.getNome()){
        this.presentAlert("Compra","","Você já possui o jogo.")
        validar = true
      }
    }
    if(validar == false){
      let compra_temp: jogosComprados = new jogosComprados(this.jogo_selecionado.getNome() , this.conta_usuario.getNome())
      console.log(compra_temp)
      this._jogoService.insertJogosComprados(compra_temp)
      this.presentAlert("Compra","","Compra realizada com Sucesso")
    }
  }

  async presentAlert(titulo:string, subtitulo: string, mensagem:string){
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensagem,
      buttons: ['Ok']
    });
    await alert.present();
    const {role} = await alert.onDidDismiss();
  }
}
