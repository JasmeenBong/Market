import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { DatabaseService } from '../services/databases.service';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { reference } from '@angular/core/src/render3';


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
         // var location = (snapshot.val() && snapshot.val().location) || 'Anonymous';
          var gender = (snapshot.val() && snapshot.val().gender) || 'Anonymous';
          var url = (snapshot.val() && snapshot.val().url) || null;
          (<HTMLInputElement>document.getElementById('profilePicture')).setAttribute('src',url);

          (<HTMLInputElement>document.getElementById('uname')).value = username;
          (<HTMLInputElement>document.getElementById('phoneNumber')).value = pNumber;
          (<HTMLInputElement>document.getElementById('birthDay')).value = birthday;
          (<HTMLInputElement>document.getElementById('gender')).value = gender;
         // (<HTMLInputElement>document.getElementById('uname')).value = username;

   
          
        });
       
      }
      else {
        this.router.navigateByUrl('tabs/tab5/login');
      }
    });
  }

  uploadPicture(){
    let file = <HTMLElement>document.getElementById("file");
    file.addEventListener("change", () => {
     
      (<HTMLInputElement>document.getElementById('fileUploaded')).innerHTML = "Image Selected: "+(<HTMLInputElement>document.getElementById('file')).value;
    // (<HTMLInputElement>document.getElementById('profilePicture')).setAttribute('src',(<HTMLInputElement>document.getElementById('file')).value);

     });

  }
  
editProfile(){
  var userId = firebase.auth().currentUser.uid;
  var usersRef = firebase.database().ref().child('users/' + userId);
  usersRef.update({
    name: (<HTMLInputElement>document.getElementById('uname')).value,
    phoneNumber:(<HTMLInputElement>document.getElementById('phoneNumber')).value,
    birthday:(<HTMLInputElement>document.getElementById('birthDay')).value,
    gender:(<HTMLInputElement>document.getElementById('gender')).value,
    url:(<HTMLInputElement>document.getElementById('profilePicture')).getAttribute('src')
  });

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
