import { Injectable } from '@angular/core';
import { conta } from '../Class/conta';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private _conta : conta[] = []
  constructor() { }

  public getConta() : conta[]{
    return this._conta
  }

  public insertConta(conta : conta):void{
    this._conta.push(conta)
  }

}
