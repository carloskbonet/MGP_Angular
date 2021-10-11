import { Injectable } from '@angular/core';
import { conta } from '../Class/conta';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private _conta : conta
  constructor() {
    this._conta = new conta("","","",0,"")
  }

  public getConta() : conta{
    return this._conta
  }

  public setConta(_nome:string , _apelido:string , _idade:number , _biografia:string):void{
    this._conta.setNome(_nome)
    this._conta.setApelido(_apelido)
    this._conta.setIdade(_idade)
    this._conta.setBiografia(_biografia)
  }

}
