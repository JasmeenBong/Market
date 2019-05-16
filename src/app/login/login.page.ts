import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { DatabaseService } from '../services/databases.service';
import { Router } from '@angular/router';
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
    private formBuilder: FormBuilder,
    private router : Router,
    private dbService : DatabaseService
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
      if(res.user.emailVerified == false){
        this.errorMessage = "Please verify your email."
        this.authService.sendVerificationMail();
      }
      else {
        console.log(res);
        this.errorMessage = "";
        this.authService.isLoggedin = true;
        this.authService.user = firebase.auth().currentUser;
        this.navCtrl.navigateForward('tabs/tab5');
      }
    }, err => {
      this.errorMessage = err.message;
    })
  }

  LoginWithGoogle(){
    this.authService.googleLogin()
    .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.authService.isLoggedin = true;
        this.authService.user = firebase.auth().currentUser;
        // this.navCtrl.navigateForward('/tabs/tab5');
    }, err => {
          this.errorMessage = err.message;
    });
  }

  LoginWithFacebook(){
    this.authService.facebookLogin()
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.authService.isLoggedin = true;
      this.authService.user = firebase.auth().currentUser;
      // this.navCtrl.navigateForward('/tabs/tab5');
    }, err => {
      this.errorMessage = err.message;
    })
  }

  goToRegisterPage(){
    this.navCtrl.navigateForward('/tabs/tab5/register');
  }

  forgotPassword(){
    this.router.navigate(['forgot-password']);
  }

  addToDb(){
    var newUser = firebase.auth().currentUser;

    var id = newUser.uid;
    var name = newUser.displayName;
    var image = newUser.photoURL;
    var email = newUser.email;

    this.dbService.addFacebookUser(id, name, email, image);
  }
}
