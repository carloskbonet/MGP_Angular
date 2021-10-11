import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  private _formLogar : FormGroup
  isSubmitted = false;
  constructor(public alertController : AlertController,
    public router: Router,
    public FormBuilder : FormBuilder,
    public authService : AuthServiceService) { }

  ngOnInit() {
    this._formLogar = this.FormBuilder.group({
      email:['', [Validators.required, Validators.email]],
      senha:['', [Validators.required, Validators.minLength]],
    })
  }

  get errorControl(){
    return this._formLogar.controls;
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this._formLogar.valid){
      this.presentAlert("agenda", "SignIn", "Todos os campos são obrigatórios")
      return false;
    }else{
      this._signIn();
    }
  }

  private _signIn() : void{
    this.authService.signIn(
      this._formLogar.value['email'],
      this._formLogar.value['senha']
    )
    .then((res) => {
      this.presentAlert("Agenda","SignIn","Seja bem vindo!!")
      this.router.navigate(["/Pages/Biblioteca"])
    })
    .catch((error) => {
      this.presentAlert("Agenda","Erro ao Logar","Tente Novamente")
      console.log(error.message)
    })
  }
 
  private _signInGoogle() : void{
    this.authService.signinWithGoogle()
  }

  private _irParaSignUp (): void{
    this.router.navigate(["/signup"])
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