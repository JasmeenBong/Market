import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { DatabaseService } from '../services/databases.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {ToastController} from '@ionic/angular';
import * as firebase from 'firebase/app';
import { reference } from '@angular/core/src/render3';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { async } from '@angular/core/testing';
import { TestingCompiler } from '@angular/core/testing/src/test_compiler';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  validatePassword : FormGroup;
  password;
  repeatpass;
  currentPass;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController:AlertController,
    // private ToastController: ToastController
  
  ) {
    console.log(firebase.auth().currentUser);
    var user = firebase.auth().currentUser;
  }

  ngOnInit() {
    this.validatePassword = this.formBuilder.group({
      newPass: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$')   
      ])),
      confirmPass : new FormControl('', Validators.compose([
        Validators.required
      ]))
    }, {validator: this.checkMatch});
  }

  passwordValidationMsg = {
    'newPass': [
      {type: 'required', message: 'Insert your new password.'}, 
      {type: 'pattern', message: 'Password must contain at least one digit, upper case, and lower case with minimum 8 characters.'}
    ],
    'confirmPass' : [
      {type: 'required', message: 'Confirm password is required.'}
    ]
  };

  checkMatch(group: FormGroup){
    let newPassword = group.controls.newPass.value;
    let confirmPassword = group.controls.confirmPass.value;

    if(confirmPassword !== ''){
      return newPassword === confirmPassword ? null : { notEqual: true };
    }
  }

  async presentAlert(msg) {
    console.log(msg);
    const alert = await this.alertController.create({
      header: "Change password",
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  changePass(pass) {
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.currentPass
    );
    user.reauthenticateAndRetrieveDataWithCredential(credential).then((success) => {
        user.updatePassword(pass).then(() => {
          // Update successful.
          this.presentAlert("Your password has been changed.");
          console.log("SUCESS")
          this.navCtrl.navigateForward("tabs/tab5");
        }).catch(function(error) {
          this.presentAlert(error.message);
          console.log(error);
        });
    }, (error) => {
        this.presentAlert("Error: Wrong current password.");
        console.log(error);
    });
  }

  backProfile(){
    this.navCtrl.navigateBack('tabs/tab5');
  }
}


