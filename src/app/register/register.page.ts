import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';

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
      { type: 'minlength', message: 'Password must be at least 8 characters long.'}
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
      this.authService.isLoggedIn = true;
      //add user email to sessionStorage
      //....
      this.navCtrl.navigateForward('/profile');
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

  goLoginPage(){
    this.navCtrl.navigateForward('/login');
  }
}
