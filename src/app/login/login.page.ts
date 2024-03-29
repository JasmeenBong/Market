import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { DatabaseService } from '../services/databases.service';
import { Router } from '@angular/router';

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
    //initialize formGroup
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
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
      {type: 'required', message: 'Password is required.'}
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
        // console.log(res);
        this.errorMessage = "";
        this.authService.isLoggedin = true;
        this.authService.user = firebase.auth().currentUser;
        this.navCtrl.navigateForward('tabs/tab1');
      }
    }, err => {
      this.errorMessage = err.message;
    })
  }

  forgotPassword(){
    this.router.navigate(['forgot-password']);
  }

  //add to database
  async addToDb(){
    var newUser = firebase.auth().currentUser;

    var id = newUser.uid;
    var name = newUser.displayName;
    var image = newUser.photoURL;
    var email = newUser.email;

    await this.dbService.addFacebookUser(id, name, email, image);
  }

  back(){
    this.navCtrl.navigateBack("");
  }
}
