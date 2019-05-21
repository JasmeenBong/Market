import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { DatabaseService } from '../services/databases.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import {UserArea} from '../profile/area';
import { Camera } from '@ionic-native/camera/ngx';
import {ToastController} from '@ionic/angular';
import * as firebase from 'firebase/app';
import { reference } from '@angular/core/src/render3';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  uid: any
  images = [];
  areaOptions = [];
  noRegion: any = true;
  noArea : any = true;
  userArea : any;
  profileImg:any;
  username:any;
  birthday:any;
  phoneNumber:any;
  gender:any;
  profileImage: any;
  enabled : any = false;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private router: Router,
    private area: UserArea,
    private camera: Camera,
    private AlertController:AlertController,
    private ToastController: ToastController,
    private formBuilder: FormBuilder) {}

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

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    if(!this.authService.user || this.authService.user == ""){
      this.navCtrl.navigateForward('swiped-tab');
    }
    else {
      this.uid = this.authService.user.uid;
      this.getProfileDetails();
    }
  }

  getProfileDetails(){

    firebase.database().ref('/users/' + this.uid).once('value').then(snapshot => {
      this.username = (snapshot.val() && snapshot.val().name) || 'Anonymous';
      this.phoneNumber = (snapshot.val() && snapshot.val().phoneNumber) || 'Anonymous';
      this.birthday = (snapshot.val() && snapshot.val().birthday) || null;
      this.gender = (snapshot.val() && snapshot.val().gender) || 'Anonymous';
      this.profileImage = (snapshot.val() && snapshot.val().url) || null;
      var area = (snapshot.val() && snapshot.val().area) || null;
      var location = (snapshot.val() && snapshot.val().location) || 'Anonymous';

      (<HTMLInputElement>document.getElementById('region')).value = location;
      (<HTMLInputElement>document.getElementById('selectedArea')).value = area;

      firebase.database().ref('location').once('value').then(function(snapshot){
        snapshot.forEach(function(childSnapshot) {
          var regions = document.createElement('ion-select-option');
          var regionval = document.createTextNode(childSnapshot.val().region);
          regions.appendChild(regionval);
          (<HTMLInputElement>document.getElementById('region')).appendChild(regions);
      });
      });

    });
  }


  AccessGallery(){
    this.camera.getPicture({
       sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
       destinationType: this.camera.DestinationType.DATA_URL
      }).then((img) => {

        if(img!=""){
          this.profileImage = 'data:image/jpeg;base64,' + img;
          }else{
            var userId = firebase.auth().currentUser.uid;
            return firebase.database().ref('/users/' + userId).once('value').then(snapshot => {
              this.profileImage = (snapshot.val() && snapshot.val().url);
            });
          }
           }, (err) => {
        console.log(err);
      });
   }
   AccessCamera(){
    this.camera.getPicture({
    targetWidth:512,
    targetHeight:512,
    correctOrientation:true,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL
      }).then((img) => {
        if(img!=""){
          this.profileImage = 'data:image/jpeg;base64,' + img;
          }else{
            var userId = firebase.auth().currentUser.uid;
            return firebase.database().ref('/users/' + userId).once('value').then(snapshot => {
              this.profileImage = (snapshot.val() && snapshot.val().url);
            });
          }
            }, (err) => {
        console.log(err);
      });
   }

  onRegionChange(event: any){
    if(event.target.value != "none"){
      this.noRegion = false;
    }

    this.areaOptions = this.area.getArea(event.target.value);
    this.userArea.value = "none";

  }

  onAreaChange(event: any){
    if(event.target.value != "none"){
      this.noArea = false;
    }
  }

  async editProfile(){

    const alert = await this.AlertController.create({
    header: 'Edit Profile',
    message: 'Are you sure you want to update your details?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
      }, {
        text: 'Yes',
        handler: () => {
    var userId = firebase.auth().currentUser.uid;
    var usersRef = firebase.database().ref().child('users/' + userId);
    usersRef.update({
      name: this.username,
      phoneNumber:this.phoneNumber,
      birthday:this.birthday,
      gender:this.gender,
      location:(<HTMLInputElement>document.getElementById('region')).value,
      area:(<HTMLInputElement>document.getElementById('selectedArea')).value,
      url: this.profileImage
    });
    this.presentToast();
    this.enabled = false;

        }
      }
    ]
  });

  await alert.present();
  }
  async presentToast() {
    const toast = await this.ToastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }
changePassword(){
  this.router.navigateByUrl('change-password');
}
logoutUser(){
  this.authService.logoutUser()
  .then(res => {
    this.uid = "";
    this.authService.user = "";
    this.navCtrl.navigateBack('tabs/tab1');
  })
  .catch(error => {
    console.log(error);
  })
}


}
