import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  authKey = {
    apiKey: null,
    authDomain: null  
  }
  
  authKeyChanged = new Subject<any>();

  saveAuthKey(apiKey, authDomain){
    localStorage.setItem("OneSignUp-apiKey", apiKey);
    localStorage.setItem("OneSignUp-authDomain", authDomain);
    this.authKey.apiKey = apiKey;
    this.authKey.authDomain = authDomain;
    this.authKeyChanged.next(this.authKey);
  }

  clearAuthKey(){
    localStorage.removeItem("OneSignUp-apiKey");
    localStorage.removeItem("OneSignUp-authDomain");
    this.authKey.apiKey = null;
    this.authKey.authDomain = null;
    this.authKeyChanged.next(this.authKey);
  }

  getAuthKey(){
    if(this.authKey.apiKey == null){
      this.authKey.apiKey = localStorage.getItem("OneSignUp-apiKey");
      
      if(this.authKey.apiKey != null){
        console.log("apiKey extracted from localStorage");
      }else{
        console.log("apiKey not present on localStorage");
      }
    }
    if(this.authKey.authDomain == null){
      this.authKey.authDomain = localStorage.getItem("OneSignUp-authDomain");     
      if(this.authKey.authDomain != null){
        console.log("authDomain retreived from localStorage");
      }else{
        console.log("authDomain not present into the localStorage");
      }
    }
    this.authKeyChanged.next(this.authKey);
    return this.authKey;
  }

  constructor() { }
}
