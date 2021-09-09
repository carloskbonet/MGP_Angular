import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  private _editar:boolean = true

  private nome:string
  private apelido:string
  private idade:number
  private biografia:string

  constructor(private alertController: AlertController , private perfilService: PerfilService , private router:Router) {
  }

  ngOnInit() {
  }

  private alterarEdicao() : void{
    if (this._editar == true){
      this._editar = false;
    }else{
      this._editar = true;
    }
  }

  private validar(campo : any) : boolean{
    if(!campo){
      return false;
    }else{
      return true;
    }
  }

  private editar():void{
    let _edit:boolean = false
    if(this.validar(this.nome) && this.nome.length >=3){
      this.perfilService.getConta().setNome(this.nome)
      _edit = true
    }
    if(this.validar(this.idade)){
      this.perfilService.getConta().setIdade(this.idade)
      _edit = true
    }
    if(this.validar(this.apelido) && this.apelido.length >=3){
      this.perfilService.getConta().setApelido(this.apelido)
      _edit = true
    }
    if(this.validar(this.biografia)){
      this.perfilService.getConta().setBiografia(this.biografia)
      _edit = true
    }
    if(_edit){
      this.presentAlert("Edição","","Conta editada com sucesso.")
      this.router.navigate(['/Pages/Perfil'])
    }
    else{
      this.presentAlert("Edição","","Nenhum campo alterado.")
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

  private backToProfile() : void {
    this.router.navigate(['/Pages/Perfil'])
  }

}
