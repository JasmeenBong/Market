import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotpassword_form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private router : Router
  ) { }

  validation_messages = {
    'email': [
      {type: 'required', message: 'Email is required.'},
      {type: 'pattern', message: 'Please enter a valid email.'}
    ]};

  ngOnInit() {
    this.forgotpassword_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  resetPassword(value){
    this.authService.forgotPassword(value);
  }

  goBackToLogin(){
    this.router.navigateByUrl("tabs/tab5/login");
  }

}
