import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { ConfirmedValidator } from 'src/app/Class/ConfirmedValidator';
import { conta } from 'src/app/Class/conta';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ContaCRUDService } from 'src/app/services/conta-crud.service';

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
    public authService : AuthServiceService,
    private _crudService : ContaCRUDService) { }

  ngOnInit() {
    this._formCadastrar = this.FormBuilder.group({
      email:['', [Validators.required, Validators.email]],
      senha:['', [Validators.required, Validators.minLength(6)]],
      confSenha:['', [Validators.required, Validators.minLength(6)]],
      nome:['',[Validators.required,Validators.minLength(3) , Validators.maxLength(16)]],
      apelido:['',[Validators.required,Validators.minLength(3) , Validators.maxLength(16)]],
      idade:['',[Validators.required, Validators.maxLength(3)]],
    } , {
      validator: ConfirmedValidator('senha','confSenha')
    })
  }

  get errorControl(){
    return this._formCadastrar.controls;
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this._formCadastrar.valid){
      this.presentAlert("MGP", "SignUp", "Todos os campos são obrigatórios")
      return false;
    }else{
      this._signUp();
    }
  }

  private _signUp() : void{
    this.authService.signUpWithEmailAndPass(
      this._formCadastrar.value['email'],
      this._formCadastrar.value['senha']
    )
    .then((res) => {
      let __conta = new conta(0,
        this._formCadastrar.value['nome'],
        this._formCadastrar.value['apelido'],
        this._formCadastrar.value['idade'],
        "")
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User logged in already or has just logged in.
          __conta.setID(user.uid)
          console.log("It just works");
        } else {
          // User not logged in or has just logged out.
          console.log("Not in a session")
        }
      })
      this._crudService.createConta(__conta)
      .then(() =>{
        this.presentAlert("MGP","SignUp","Cadastro Efetuado com Sucesso!!")
        this.router.navigate(["/signin"])
      })
      .catch((error) => {
        this.presentAlert("MGP","Erro","Erro ao Cadastrar!!")
        console.log(error.message)
      })
    })
    .catch((error) => {
      this.presentAlert("MGP","Erro","Erro ao Cadastrar!!")
      console.log(error.message)
    })
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