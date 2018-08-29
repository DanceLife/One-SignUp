import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth-edit',
  templateUrl: './auth-edit.component.html',
  styleUrls: ['./auth-edit.component.scss']
})
export class AuthEditComponent implements OnInit {
  @ViewChild('f') slForm: NgForm;
  apiKey: string;
  authDomain: string; 
  editMode = false;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.apiKey = this.appService.getAuthKey().apiKey;
    this.authDomain = this.appService.getAuthKey().authDomain;
    this.slForm.setValue({
      apiKey: this.apiKey,
      authDomain: this.authDomain  
    });
  }


  onSubmit(form: NgForm) {   
    const value = form.value; 
    console.log("Submitting", value)
    if (this.editMode) {
      this.appService.saveAuthKey(value.apiKey, value.authDomain);
    } else {
      this.appService.saveAuthKey(value.apiKey, value.authDomain);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.appService.clearAuthKey();
  }

}
