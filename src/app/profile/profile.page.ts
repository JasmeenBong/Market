import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { DatabaseService } from '../services/databases.service';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  users;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private router: Router
  ) { }

  ngOnInit() {
    //check whether user is login or logout
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        //...
      }
      else {
        this.router.navigateByUrl('tabs/tab5/login');
      }
    })
  }

  logoutUser(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }

}
