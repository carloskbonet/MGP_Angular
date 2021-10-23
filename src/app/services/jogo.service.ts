import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { jogosComprados } from '../Class/jogosComprados';
import { map } from 'rxjs/operators';
import { AuthServiceService } from './auth-service.service';
import { User } from '../Class/user';

@Injectable({
  providedIn: 'root'
})
export class JogoService {
  private _PATH: string = 'jogos/'
  private _PATH_Jogos_Comprados: string = 'biblioteca/'
  private User_Log: User
  private _jogosComprados: jogosComprados[] = []

  constructor(private db: AngularFireDatabase,
    private auth_service: AuthServiceService) {
    this.User_Log = auth_service.getUserLogado()
  }

  /*private _jogos : jogo[] = [
    new jogo("Konosuba","Abunai Kazuma-kun", 2000),
    new jogo("Thunder Snacks","Um nacho poderoso que deve se vingar do Rei Geleia.", 100),
    new jogo("Thunder Snacks 2","A outra perspectiva da história: o Rei Geleia busca vingança.", 120),
    new jogo("Thunder Snacks 3: Return of The King","Após matar o El Nacho, o Rei Geleia percebe que suas ações foram contraditórias, e busca por redenção.", 350),
    new jogo("Thunder Snacks GOTY Edition","Um nacho poderoso que deve se vingar do rei geleia, dessa vez em HD!", 250),
    new jogo("Tree Fanta","Uma árvore de fanta laranja.", 25),
    new jogo("Gabimon","Tem que pegar todos!", 75),
  ]*/


  getJogos() {
    return this.db.list(this._PATH)
      .snapshotChanges().pipe(
        map((action) => {
          return action.map((dados) => ({
            key: dados.payload.key,
            data: dados.payload.val()
          }))
        })
      )
  }

  private getJogosComprados_aux() {
    return this.db.list(this._PATH_Jogos_Comprados)
      .snapshotChanges().pipe(
        map((action) => {
          return action.map((dados) => ({
            key: dados.payload.key,
            data: dados.payload.val()
          }))
        })
      )
  }

  private data: any
  getJogosComprados(): jogosComprados[] {
    this._jogosComprados = []
    this.data = this.getJogosComprados_aux()
    this.data.forEach(data => {
      const lista = data as Array<any>
      lista.forEach(c => {
        if (this.User_Log.email == c.data._nomeUsuario) {
          //console.log("Jogo service : "+c.data._nomeUsuario + "  "+this.User_Log.email)
          //console.log(c.data._nome)
          let __jogocomprado = new jogosComprados(c.data._nome, c.data._nomeUsuario)
          this._jogosComprados.push(__jogocomprado)
        }
      })
    })
    return this._jogosComprados
  }

  insertJogosComprados(jogoComprado: jogosComprados) {
    console.log(jogoComprado.getNome() + " "+ jogoComprado.getNomeUsuario())
    return this.db.database.ref(this._PATH_Jogos_Comprados).push(jogoComprado)
    .then(function() {
      console.log("Push succeeded.")
    })
    .catch(function(error) {
      console.log("Push failed: " + error.message)
    });
  }

  reembolsarJogo(nome_jogo:string , nome_usuario:string){
    this._jogosComprados = []
    let _key:string
    this.data = this.getJogosComprados_aux()
    this.data.forEach(data => {
      const lista = data as Array<any>
      for(let i=0; i<lista.length; i++){
        if (nome_jogo == lista[i].data._nome
        && nome_usuario == lista[i].data._nomeUsuario) {
          _key = lista[i].key
          return this.db.object(this._PATH_Jogos_Comprados+"/"+_key).remove()
          .then(function() {
            console.log("Remove succeeded.")
          })
          .catch(function(error) {
            console.log("Remove failed: " + error.message)
          });
          break;
        }
      }
    })
  }
}
