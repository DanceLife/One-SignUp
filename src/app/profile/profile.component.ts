import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

  apiKey: string;
  authDomain: string; 
  private subscription: Subscription;
  constructor(private appService: AppService) { }

  ngOnInit() {

    this.subscription = this.appService.authKeyChanged
    .subscribe(
      (keyAuth: any) => {
        console.log("Changes Received",keyAuth);
         this.apiKey = keyAuth.apiKey;
         this.authDomain = keyAuth.authDomain;
      }
    )

  }

}
