import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { conta } from 'src/app/Class/conta';
import { User } from 'src/app/Class/user';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ContaCRUDService } from 'src/app/services/conta-crud.service';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  private _editar: boolean = true
  private _account_to_update: conta
  private user_log: User
  private data: any

  private nome: string
  private apelido: string
  private idade: number
  private biografia: string

  constructor(private alertController: AlertController,
    private perfilService: PerfilService,
    private router: Router,
    private _contaCRUDService: ContaCRUDService,
    private auth_service: AuthServiceService) {
  }

  ngOnInit() {
  }

  private alterarEdicao(): void {
    if (this._editar == true) {
      this._editar = false;
    } else {
      this._editar = true;
    }
  }

  private validar(campo: any): boolean {
    if (!campo) {
      return false;
    } else {
      return true;
    }
  }

  private editar(): void {
    let _edit: boolean = false

    this._account_to_update = this.perfilService.getConta()

    if (this.validar(this.nome) && this.nome.length >= 3) {
      this._account_to_update.setNome(this.nome)
      _edit = true
    }
    if (this.validar(this.idade)) {
      this._account_to_update.setIdade(this.idade)
      _edit = true
    }
    if (this.validar(this.apelido) && this.apelido.length >= 3) {
      this._account_to_update.setApelido(this.apelido)
      _edit = true
    }
    if (this.validar(this.biografia)) {
      this._account_to_update.setBiografia(this.biografia)
      _edit = true
    }
    if (_edit) {
      this.user_log = this.auth_service.getUserLogado()
      this.data = this._contaCRUDService.getContas()
      this.data.forEach(data => {
        const lista = data as Array<any>
        lista.forEach(c => {
          if (this.user_log.email == c.data._id) {
            this._contaCRUDService.editarConta(c.key, this._account_to_update)
          }
        })
      })
      this.presentAlert("Edição", "", "Conta editada com sucesso.")
      this.router.navigate(['/Pages/Perfil'])
    }
    else {
      this.presentAlert("Edição", "", "Nenhum campo alterado.")
    }
  }

  async presentAlert(titulo: string, subtitulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensagem,
      buttons: ['Ok']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  private backToProfile(): void {
    this.router.navigate(['/Pages/Perfil'])
  }

}
