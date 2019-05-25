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

password;
repeatpass;
currentPass;
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private AlertController:AlertController,
    private ToastController: ToastController
  
  ) {
    console.log(firebase.auth().currentUser);
    var user = firebase.auth().currentUser;
  

   }

  ngOnInit() {
  }

  async presentToast(msg) {
    const toast = await this.ToastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  changePass() {
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.currentPass
    )
    user.reauthenticateAndRetrieveDataWithCredential(credential).then(function(success) {
      var pass = (<HTMLInputElement>document.getElementById('password')).value;
      var repeatpass = (<HTMLInputElement>document.getElementById('repeatPassword')).value;

      if(pass === repeatpass){
      user.updatePassword(pass).then(function() {
        // Update successful.
      //  this.presentToast("Sucess");
     console.log("SUCESS")
      }).catch(function(error) {
       //this.presentToast("ERROR");
       console.log(error);

      });
    }else{
     //this.presentToast("Error");
     console.log("error");

    }

    }).catch(function(error) {
     // this.presentToast("ERROR");
     console.log(error);
    });

  
  }


  backProfile(){
    this.navCtrl.navigateBack('tabs/tab5');
  }
}


