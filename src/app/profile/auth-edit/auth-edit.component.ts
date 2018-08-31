import { Component, OnInit, ViewChild, AfterContentInit, AfterViewChecked } from '@angular/core';
import { AppService } from '../../app.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth-edit',
  templateUrl: './auth-edit.component.html',
  styleUrls: ['./auth-edit.component.scss']
})
export class AuthEditComponent implements OnInit, AfterViewChecked  {
  
  ngAfterViewChecked (): void {
    this.initForm();
  }

  @ViewChild('f') AuthEditForm: NgForm;
  apiKeyControl: string;
  authDomainControl: string; 
  editMode = false;
  apiKey: string;
  authDomain: string;
  
  constructor(private appService: AppService) { }

  initForm(){
    this.AuthEditForm.setValue({
      apiKey: this.apiKey,
       //apiKey: this.appService.authKey.apiKey,
      authDomain: this.authDomain  
     });    

  }

  ngOnInit() {
    
    this.appService.authKeySubject.subscribe(
       (authKey)=>{
         this.apiKey = authKey.apiKey;
         this.authDomain = authKey.authDomain;
       }
     );
     this.appService.getAuthKey();
  }

  // ngAfterViewInit(){
  //   this.slForm.setValue({
  //     apiKey: "Yes"
  //      //apiKey: this.appService.authKey.apiKey,
  //     // authDomain: this.appService.authKey.authDomain  
  //    });   
  // }

  onSubmit(form: NgForm) {   
    const value = form.value;
    console.log("Submitting new authKey ",value) 
    this.appService.setAuthKey(value.apiKey, value.authDomain);
    localStorage.setItem("OneSignUp-authKey", JSON.stringify(this.appService.authKey));
    this.appService.initializeApp()
  }

  onClear(){
    this.appService.clearAuthKey();
  }

}
