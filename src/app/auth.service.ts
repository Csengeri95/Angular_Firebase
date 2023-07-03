import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, public router: Router) { }


  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }


  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        if (result.user != null) {
          localStorage.setItem('email', <string>result.user.email)
          localStorage.setItem('displayname', <string>result.user.displayName);
        }
        this.router.navigate(['dashboard']);
      })
      .catch((error) => {
        console.log(error);
        alert(error)
      });
  }

  currentUser() {
    let displayname=localStorage.getItem('displayname');
    if(displayname!=null) {
      return displayname
    }
    return 'anonymus'
  }


  isLoggedIn(): boolean {


    let email = localStorage.getItem('email')
    let displayName = localStorage.getItem('displayname')

    return email != null && displayName != null
  }


  protectContent() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['home'])
    }
  }


  logout() {
    localStorage.clear();
    this.afAuth.signOut();
    this.router.navigate(['home']);
  }





}
