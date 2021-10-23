import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { conta } from 'src/app/Class/conta';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ContaCRUDService } from 'src/app/services/conta-crud.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  private _formLogar : FormGroup
  private data: any

  isSubmitted = false;
  constructor(public alertController : AlertController,
    public router: Router,
    public FormBuilder : FormBuilder,
    public authService : AuthServiceService,
    private _contaCRUDService : ContaCRUDService) { }

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
      this.presentAlert("MGP", "SignIn", "Todos os campos são obrigatórios")
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
      this.presentAlert("MGP","SignIn","Seja bem vindo!!")
      this.router.navigate(["/Pages/Biblioteca"])
    })
    .catch((error) => {
      this.presentAlert("MGP","Erro ao Logar","Tente Novamente")
      console.log(error.message)
    })
  }
 
  private _signInGoogle() : void{
    this.authService.signinWithGoogle()
    
    //Cria a conta para usuário da google
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.data = this._contaCRUDService.getContas()
        this.data.forEach(data => {
          const lista = data as Array<any>
          let verify = false as boolean
          lista.forEach(c => {
            if(user.email == c.data._id){
              verify = true
            }
          })
          if(!verify){
            let __conta = new conta(user.email,"","",0,"")
            this._contaCRUDService.createConta(__conta)
          }
        });

      } else {
        // User not logged in or has just logged out.
        console.log("Not in a session")
      }
    })
    
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