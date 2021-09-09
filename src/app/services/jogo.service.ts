import { Injectable } from '@angular/core';
import { jogo } from '../Class/jogo';
import { jogosComprados } from '../Class/jogosComprados';

@Injectable({
  providedIn: 'root'
})
export class JogoService {
  private _jogos : jogo[] = [
    new jogo("Koikatsu Party","Futanari",200),
    new jogo("ThunderSnacks","Um nacho poderoso que deve se vingar do rei geleia",100),
    new jogo("Tree Fanta","Uma árvore de fanta uva",250),
  ]

  private _jogosComprados : jogosComprados[] = []

  constructor() {}

  public getJogos() : jogo[]{
    return this._jogos
  }
  
  public getJogosComprados() : jogosComprados[]{
    return this._jogosComprados
  }

  public insertJogosComprados(jogo_inserir:jogosComprados):void{
    this._jogosComprados.push(jogo_inserir)
  }
}
