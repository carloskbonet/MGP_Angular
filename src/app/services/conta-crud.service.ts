import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { conta } from '../Class/conta';
import { map } from'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContaCRUDService {
  private _PATH:string = 'conta/'

  constructor(private db:AngularFireDatabase) { }

  createConta(conta:conta){
    return this.db.database.ref(this._PATH).push(conta)
  }

  editarConta(key:any , conta:any){
    return this.db.database.ref(this._PATH).child(key).update(conta)
  }

  getConta(key:string){
    return this.db.list(this._PATH, ref=> ref.orderByKey().equalTo(key))
    .snapshotChanges().pipe(
      map((action) => {
        return action.map((dados) => ({
          key: dados.payload.key,
          data: dados.payload.val()
        }))
      })
    )
  }

}
