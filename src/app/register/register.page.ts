import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { DatabaseService } from '../services/databases.service';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: String = '';
  successMessage: String = '';

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private dbService : DatabaseService,
    private router : Router
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$')
      ])),
      reEnterPassword: new FormControl('', Validators.compose([
        Validators.required
      ])),
    }, {validator: this.checkMatch});
  }

  validation_messages = {
    'email': [
      {type: 'required', message: 'Email is required.'},
      {type: 'pattern', message: 'Enter a valid email.'}
    ],
    'password': [
      { type: 'required', message: 'Password is required.'},
      { type: 'pattern', message: 'Password must contain at least one digit, upper case, and lower case with minimum 8 characters.'}
    ],
    'reEnterPassword' : [
      { type: 'required', message: 'Please re-enter your password.'}
    ]
  };

  private checkMatch(group: FormGroup){
    let pass = group.controls.password.value;
    let reEnterPass = group.controls.reEnterPassword.value;

    if (reEnterPass!== ''){
      return pass === reEnterPass ? null : { notEqual: true };
    }
  }

  registerUser(value){
    this.authService.registerUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created.";
      this.addToDb();
      this.authService.sendVerificationMail();
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

  addToDb(){
    var newUser = firebase.auth().currentUser;

    var id = newUser.uid;
    var email = newUser.email;

    this.dbService.addNewUser(id, email);
  }
}
