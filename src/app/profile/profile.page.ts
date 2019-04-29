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

  uid: any

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private router: Router,
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        this.uid = user.uid;
      }
      else {
        this.router.navigateByUrl('tabs/tab5/login');
      }
    });
  }

  logoutUser(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('tabs/tab1');
    })
    .catch(error => {
      console.log(error);
    })
  }

}
