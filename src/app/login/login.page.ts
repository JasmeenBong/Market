import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { RouterModule } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: String = '';

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ]))
    });
  }

  validation_messages = {
    'email': [
      {type: 'required', message: 'Email is required.'},
      {type: 'pattern', message: 'Please enter a valid email.'}
    ],
    'password' : [
      {type: 'required', message: 'Password is required.'},
      {type: 'minLength', message: 'Password must be at least 8 characters long.'}
    ]
  };

  loginUser(value){
    this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.navCtrl.navigateForward('/profile');
    }, err => {
      this.errorMessage = err.message;
    })
  }

  LoginWithGoogle(){
    this.authService.googleLogin()
    .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.navCtrl.navigateForward('/tabs/tab1');
    }, err => {
          this.errorMessage = err.message;
    });
  }

  LoginWithFacebook(){
    this.authService.facebookLogin()
    .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.navCtrl.navigateForward('/tabs/tab1');
    }, err => {
          this.errorMessage = err.message;
    });
  }

  goToRegisterPage(){
    this.navCtrl.navigateForward('/tabs/tab5/register');
  }
}
