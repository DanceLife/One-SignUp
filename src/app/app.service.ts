import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  
  authKey = {"apiKey": null,"authDomain": null}  
  authKeySubject = new Subject<{"apiKey": null,"authDomain": null}>();
 
  setAuthKey(apiKey, authDomain){
    this.authKey = {"apiKey": apiKey,"authDomain": authDomain}
    localStorage.setItem("OneSignUp-authKey", JSON.stringify(this.authKey));
    this.authKeySubject.next(this.authKey);
  }

  clearAuthKey(){
    localStorage.removeItem("OneSignUp-authKey");
    this.authKey = {'apiKey': null,'authDomain': null}  
    this.authKeySubject.next(this.authKey);
  }

  getAuthKey(){
console.log("getAuthKey")   
    if(this.authKey.apiKey == null || this.authKey.authDomain == null){
    this.authKey = JSON.parse(localStorage.getItem("OneSignUp-authKey"));
    console.log("this.authKey",this.authKey);
    }
    this.authKeySubject.next(this.authKey);
    return this.authKey;
  
  }

  initializeApp(){
    if(!firebase.app){
      this.authKey = JSON.parse(localStorage.getItem("OneSignUp-authKey"))
      this.authKeySubject.next(this.authKey);
      console.log("Initializing app with ", this.authKey)          
      firebase.initializeApp({
      apiKey: this.authKey.apiKey,           
      authDomain: this.authKey.authDomain 
      });
    }else{
      console.log("Firebase app already inizialiced as: ", firebase.app.name);
    }
  }

  constructor() { }
}
