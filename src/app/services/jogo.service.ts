import { Injectable } from '@angular/core';
import { jogo } from '../Class/jogo';
import { jogosComprados } from '../Class/jogosComprados';

@Injectable({
  providedIn: 'root'
})
export class JogoService {
  private _jogos : jogo[] = [
    new jogo("Konosuba","Abunai Kazuma-kun", 2000),
    new jogo("Thunder Snacks","Um nacho poderoso que deve se vingar do Rei Geleia.", 100),
    new jogo("Thunder Snacks 2","A outra perspectiva da história: o Rei Geleia busca vingança.", 120),
    new jogo("Thunder Snacks 3: Return of The King","Após matar o El Nacho, o Rei Geleia percebe que suas ações foram contraditórias, e busca por redenção.", 350),
    new jogo("Thunder Snacks GOTY Edition","Um nacho poderoso que deve se vingar do rei geleia, dessa vez em HD!", 250),
    new jogo("Tree Fanta","Uma árvore de fanta laranja.", 25),
    new jogo("Gabimon","Tem que pegar todos!", 75),
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

  public reembolsarJogo(nome_jogo:string , nome_usuario:string) : void{
    for(let i=0; i<this._jogosComprados.length; i++){
      if(this._jogosComprados[i].getNome() == nome_jogo && this._jogosComprados[i].getNomeUsuario() == nome_usuario){
        this._jogosComprados.splice(i,1)
      }
    }
  }
}
