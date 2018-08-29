import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'One-SignUp';

  constructor(private appService: AppService){}

  ngOnInit(): void {
    const currentApiKey = this.appService.getAuthKey().apiKey;
    const currentAuthDomain = this.appService.getAuthKey().authDomain;
    
    firebase.initializeApp({
      apiKey: currentApiKey,
      authDomain: currentAuthDomain    
    });

    console.log("Current authKey : ", {apiKey:currentApiKey, authDomain: currentAuthDomain})

  }
  
}
