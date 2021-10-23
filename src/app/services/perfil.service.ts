import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { conta } from '../Class/conta';
import { ContaCRUDService } from './conta-crud.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private _conta : conta = new conta("","","",1,"")
  private data:any

  constructor(private _contaCRUDService:ContaCRUDService) {
  }

  public getConta() : conta{
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.data = this._contaCRUDService.getContas()
        this.data.forEach(data => {
          const lista = data as Array<any>
          lista.forEach(c => {
            if(user.email == c.data._id){
              this._conta.setID(c.data._id)
              this._conta.setApelido(c.data._apelido)
              this._conta.setNome(c.data._nome)
              this._conta.setIdade(c.data._idade)
              this._conta.setBiografia(c.data._biografia)
            }
          })
        });
      }
    })
    return this._conta
  }

  public setConta(_nome:string , _apelido:string , _idade:number , _biografia:string):void{
    this._conta.setNome(_nome)
    this._conta.setApelido(_apelido)
    this._conta.setIdade(_idade)
    this._conta.setBiografia(_biografia)
  }

}
