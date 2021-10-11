import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  private _formCadastrar : FormGroup
  isSubmitted = false;

  constructor(public alertController : AlertController,
    public router: Router,
    public FormBuilder : FormBuilder,
    public authService : AuthServiceService) { }

  ngOnInit() {
    this._formCadastrar = this.FormBuilder.group({
      email:['', [Validators.required, Validators.email]],
      senha:['', [Validators.required, Validators.minLength]],
      confSenha:['', [Validators.required, Validators.minLength]],
    })
  }

  get errorControl(){
    return this._formCadastrar.controls;
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this._formCadastrar.valid){
      this.presentAlert("agenda", "SignUp", "Todos os campos são obrigatórios")
      return false;
    }else{
      this._signUp();
    }
  }

  private _signUp() : void{
    console.log(this._formCadastrar.value['email'])
    console.log(this._formCadastrar.value['senha'])

    this.authService.signUpWithEmailAndPass(
      this._formCadastrar.value['email'],
      this._formCadastrar.value['senha']
    )
    .then((res) => {
      this.presentAlert("Agenda","SignUp","Cadastro Efetuado com Sucesso!!")
      this.router.navigate(["/signin"])
    })
    .catch((error) => {
      this.presentAlert("Agenda","Erro","Erro ao Cadastrar!!")
      console.log(error.message)
    })

    this.presentAlert("agenda", "SignUp", "Cadastrado com Sucesso")
    this.router.navigate(["/signin"]);
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