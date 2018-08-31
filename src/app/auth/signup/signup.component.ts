import { Component, OnInit, OnDestroy, DoCheck, AfterContentInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy{
  
private subscription2SavedEmail: Subscription;

   savedEmail: any="";
 
  constructor(private authService: AuthService) { 
    authService.savedEmail.subscribe(
      (nextValue)=>{
        console.log("nextValue : ",nextValue);
        this.savedEmail = nextValue;
      }
    )
  }

  ngOnInit() {
    this.authService.getCurrentUser();
    this.authService.savedEmail.subscribe(
      (email)=>{
        this.savedEmail = email;
      }
    )
    this.authService.savedEmail.next(window.localStorage.getItem('emailForSignIn'));
  
  }
  
  ngOnDestroy(): void {
  //  this.authService.savedEmail.complete;
  }

  resendEmail(){
    this.authService.savedEmail.next('');
    window.localStorage.setItem('emailForSignIn', '');
  }

  showEmail(){
    console.log(this.authService.savedEmail) 
  }
  showLocalEmail(){
    console.log("this.savedEmail: ",this.savedEmail);
  }


  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    let instance: any = this;
   // this.savedEmail = localStorage.getItem("emailForSignIn");

    this.authService.signInUserWithEmail(email)
    .then(
      function() {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      console.log("The link was successfully sent. Email saved as: ",email);
      window.localStorage.setItem('emailForSignIn', email);
      instance.authService.savedEmail.next(email);     
    })
    .catch(function(error) {
      console.log("Error sending email: ",error)
      // Some error occurred, you can inspect the code: error.code
    });
 
 
  }

}
