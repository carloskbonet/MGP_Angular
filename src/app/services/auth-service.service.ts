import { Injectable, NgZone } from '@angular/core';
import { User } from '../Class/user';
import { auth } from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  userData : User;

  constructor(
    public afStore : AngularFirestore,
    public ngFireAuth : AngularFireAuth,
    public router : Router,
    public ngZone : NgZone) {
      this.ngFireAuth.authState.subscribe((user) => {
        if(user){
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData))
          JSON.parse(localStorage.getItem('user'))
        }
        else{
          localStorage.setItem('user' , null)
          JSON.parse(localStorage.getItem('user'))
        }
      })
    }

    public signIn(email:string , password:string){
      return this.ngFireAuth.signInWithEmailAndPassword(email,password)
    }

    public signUpWithEmailAndPass(email:string , password:string){
      return this.ngFireAuth.createUserWithEmailAndPassword(email , password)
    }

    public signinWithGoogle(){
      this.AuthLogin(new auth.GoogleAuthProvider())
    }

    public AuthLogin(provider){
      return this.ngFireAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(()=>{
          this.router.navigate(['home'])
        })
      })
      .catch((error) => {
        console.log(error)
      })
    }

    public setUserData(user){
      const userRef : AngularFirestoreDocument<any> = 
      this.afStore.doc(`user/${user.uid}`)
      const userDataConst : User = {
        uid : user.uid,
        email : user.email,
        displayName : user.displayName,
        photoURL : user.photoURL,
        emailVerified : user.emailVerified
      }
      return userRef.set(userDataConst , {merge:true})
    }

    public getUserLogado() : User {
      const user = JSON.parse(localStorage.getItem('user'))
      return (user != null) ? user : false;
    }

    public recuperarSenha(email : string){
      return this.ngFireAuth.sendPasswordResetEmail(email)
      .then(() => {
        console.log("Enviado por Email")
      })
      .catch((error) => {
        console.log(error)
      })
    }

    public signOut(){
      return this.ngFireAuth.signOut()
      .then(() => {
        localStorage.removeItem('user')
        this.router.navigate(['signin'])
      })
    }
}
