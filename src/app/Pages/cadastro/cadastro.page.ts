import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PerfilService } from 'src/app/services/perfil.service';
import { conta } from 'src/app/Class/conta';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  private nome:string
  private apelido:string
  private idade:number
  private biografia:string

  constructor(private alertController: AlertController , private perfilService: PerfilService , private router:Router) { }

  ngOnInit() {
  }

  private cadastrar() : void {
    if(this.validar(this.nome) 
    && this.validar(this.apelido) 
    && this.validar(this.idade)){
      if(this.nome.length>=3 && this.apelido.length>=3){
        this.perfilService.setConta(this.nome , this.apelido , this.idade , this.biografia)
        this.presentAlert("Cadastro","","Cadastro realizado com sucesso.")
        this.router.navigate(['/Pages/Perfil'])
      }
      else{
        if(this.nome.length<3 && this.apelido.length>=3){
          this.presentAlert("Cadastro","","O campo nome deve conter ao menos 3 caracteres.")
        }
        if(this.nome.length>=3 && this.apelido.length<3){
          this.presentAlert("Cadastro","","O campo apelido deve conter ao menos 3 caracteres.")
        }
        if(this.nome.length<3 && this.apelido.length<3){
          this.presentAlert("Cadastro","","O campo nome deve conter ao menos 3 caracteres.\n"
          +"O campo apelido deve conter ao menos 3 caracteres.")
        }
      }
    }
    else
      this.presentAlert("Cadastro","","Todos os campos são obrigatórios.")
  }
  
  private validar(campo : any) : boolean{
    if(campo)
      return true
    else
      return false
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

  private backToHome() : void {
    this.router.navigate(['/Pages/Biblioteca'])
  }
}
