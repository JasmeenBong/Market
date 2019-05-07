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

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {
  uid: any
  images = [];
  areaOptions = [];
  noRegion: any = true;
  noArea : any = true;
  userArea : any;

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

  ionViewWillEnter(){
    this.checkUser();
  }

  checkUser(){
    firebase.auth().onAuthStateChanged(user => {
      if (user){

        this.uid = user.uid;
        var userId = firebase.auth().currentUser.uid;

        return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
          var username = (snapshot.val() && snapshot.val().name) || 'Anonymous';
          var pNumber = (snapshot.val() && snapshot.val().phoneNumber) || 'Anonymous';
          var birthday = (snapshot.val() && snapshot.val().birthday) || null;
          var location = (snapshot.val() && snapshot.val().location) || 'Anonymous';
          var gender = (snapshot.val() && snapshot.val().gender) || 'Anonymous';
          var url = (snapshot.val() && snapshot.val().url) || null;
          var area = (snapshot.val() && snapshot.val().area) || null;

          (<HTMLInputElement>document.getElementById('profilePicture')).setAttribute('src',url);
          (<HTMLInputElement>document.getElementById('uname')).value = username;
          (<HTMLInputElement>document.getElementById('phoneNumber')).value = pNumber;
          (<HTMLInputElement>document.getElementById('birthDay')).value = birthday;
          (<HTMLInputElement>document.getElementById('gender')).value = gender;
          (<HTMLInputElement>document.getElementById('region')).value = location;
          (<HTMLInputElement>document.getElementById('selectedArea')).value = area;
      });
      }
      else {
        this.router.navigateByUrl('tabs/tab5/login');
      }
    });
  }

  editProfile(){
    this.router.navigateByUrl('/profile');
  }
  
  logoutUser(){
    this.authService.logoutUser()
    .then(res => {
     // console.log(res);
      this.navCtrl.navigateBack('tabs/tab1');
    })
    .catch(error => {
      console.log(error);
    })
  }
}


