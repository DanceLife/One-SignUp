import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy{
  ngOnDestroy(): void {
    this.authService.savedEmail.complete;
  }
 
  savedEmail: any;
 
  constructor(private authService: AuthService) { 
    authService.savedEmail.subscribe(
      (nextValue)=>{
        console.log("nextValue : ",nextValue);
        this.savedEmail = nextValue;
      }
    )
  }

  ngOnInit() {
    this.savedEmail = this.authService.theItem;
  }

  resendEmail(){
    this.authService.theItem = '';
    //savedEmail.next('');
    window.localStorage.setItem('emailForSignIn', '');
  }

  showEmail(){
    console.log(this.authService.theItem) 
  }
  showLocalEmail(){
    console.log("this.savedEmail: ",this.savedEmail);
  }


  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    let instance: any = this;
   // this.savedEmail = localStorage.getItem("emailForSignIn");

    this.authService.signupUser(email, password)
    .then(
      function() {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      console.log("The link was successfully sent. Email saved as: ",email);
      window.localStorage.setItem('emailForSignIn', email);
      instance.authService.theItem = email;     
    })
    .catch(function(error) {
      console.log("Error sending email: ",error)
      // Some error occurred, you can inspect the code: error.code
    });
 
 
  }

}
