import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  token: string;
  savedEmail = new Subject();

  set theItem(email) {
    this.savedEmail.next(email); 
    window.localStorage.setItem('emailForSignIn', email);
  }

  get theItem() {
    return window.localStorage.getItem('emailForSignIn');
  }


  actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
 //   url: 'https://www.example.com/finishSignUp?cartId=1234',
    url: 'http://localhost/signup',
  
    // This must be true.
    handleCodeInApp: true,

    // iOS: {
    //   bundleId: 'com.example.ios'
    // },
    // android: {
    //   packageName: 'com.example.android',
    //   installApp: true,
    //   minimumVersion: '12'
    // }
  };
  

  constructor(private router: Router) {}

  // setSendEmail(email){
  //   this.savedEmail.n
  // }

  signupUser1(email: string, password: string) {
    console.log("Creating user: ", email);
    console.log("Password: ", password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      )
  }

  signupUser(email: string, password: string){
   return firebase.auth().sendSignInLinkToEmail(email, this.actionCodeSettings)
  }


  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            )
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  // getToken() {
  //   firebase.auth().currentUser.getIdToken()
  //     .then(
  //       (token: string) => this.token = token
  //     );
  //   return this.token;
  // }

  isAuthenticated() {
    return this.token != null;
  }
}
