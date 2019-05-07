import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { DatabaseService } from '../services/databases.service';
import { Router } from '@angular/router';
import {UserArea} from '../profile/area';
import { Camera } from '@ionic-native/camera/ngx';
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

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private router: Router,
    private area: UserArea,
    private camera: Camera,
    private AlertController:AlertController,
    private ToastController: ToastController
  
  ) { }

  ngOnInit() {
  }

  async presentToast(msg) {
    const toast = await this.ToastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  changePass(){
   let newPassword =  (<HTMLInputElement>document.getElementById('npassword')).value;
  let repeatPassword = (<HTMLInputElement>document.getElementById('rnpassword')).value;

if(newPassword===repeatPassword){
  if(newPassword.length < 9){
    this.presentToast("Password Too Short!");
  }else{
    firebase.auth().currentUser.updatePassword(newPassword).then(function(){
    }).catch(function(error){
      this.presentToast(error);
    });
    this.presentToast("Sucessfully Changed The Password");
  }
  }
  else{
    this.presentToast("Please Make Sure Both Passwords Match");
  }

  }

  backProfile(){
    this.navCtrl.navigateBack('tabs/tab5');
  }
}


