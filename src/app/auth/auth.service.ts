import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  token: string;
  savedEmail = new Subject();
  currentUser: any; 
  authKey = {"apiKey": null,"authDomain": null}  
  authKeySubject = new Subject<{"apiKey": null,"authDomain": null}>();
  appInitName: string;
  currentAppName = "One";

  getCurrentUser(){

    console.log("Current user: ",firebase.auth().currentUser)
  }

  actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    // url: 'https://www.example.com/finishSignUp?cartId=1234',
    url: 'http://localhost/signin',
  
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

  sendEmail(email: string){
    console.log("Sending email: ",email)
    return firebase.auth().sendSignInLinkToEmail(email, this.actionCodeSettings)
  }

  signupUser(email: string){
    return firebase.auth().sendSignInLinkToEmail(email, this.actionCodeSettings)
  }

  signupUser2(email: string, password: string){
   return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  signInUserWithEmail(email: string){
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

  initializeApp(){

    this.appInitName = firebase.apps[0] ? firebase.apps[0]["options_"].name : this.appInitName;
   
    if(this.appInitName){
      console.log("App from auth.services.ts was already initialized as: ", firebase.app.name)          
    }else{
      this.authKey = JSON.parse(localStorage.getItem("OneSignUp-authKey"))
      this.authKeySubject.next(this.authKey);
      console.log("Initializing app from auth.services.ts ", firebase.apps)                
      firebase.initializeApp({
      name: this.currentAppName,  
      apiKey: this.authKey.apiKey,           
      authDomain: this.authKey.authDomain 
      },"[DEFAULT]");

      console.log("App from auth.services.ts initialized as: ", firebase.apps[0]["options_"].name)          



    }

    // if(!firebase.app){
    // }else{
    //   console.log("Firebase app already inizialiced as: ", firebase.app.name);
    // }
  }

}
