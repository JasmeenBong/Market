import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { DatabaseService } from '../services/databases.service';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
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

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private router: Router,
    private imagePicker: ImagePicker

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

          (<HTMLInputElement>document.getElementById('profilePicture')).setAttribute('src',url);
          (<HTMLInputElement>document.getElementById('uname')).value = username;
          (<HTMLInputElement>document.getElementById('phoneNumber')).value = pNumber;
          (<HTMLInputElement>document.getElementById('birthDay')).value = birthday;
          (<HTMLInputElement>document.getElementById('gender')).value = gender;
          (<HTMLInputElement>document.getElementById('region')).value = location;

          return firebase.database().ref('location').once('value').then(function(snapshot){
            snapshot.forEach(function(childSnapshot) {
              var regions = document.createElement('ion-select-option');
              var regionval = document.createTextNode(childSnapshot.val().region);
              regions.appendChild(regionval);
              (<HTMLInputElement>document.getElementById('region')).appendChild(regions);
          });
          })
        });
      }
      else {
        this.router.navigateByUrl('tabs/tab5/login');
      }
    });
  }

  uploadPhoto() {
    var options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      //maximumImagesCount: 3,

      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 200,
      //height: 200,

      // quality of resized image, defaults to 100
      quality: 25,

      // output type, defaults to FILE_URIs.
      // available options are
      // window.imagePicker.OutputType.FILE_URI (0) or
      // window.imagePicker.OutputType.BASE64_STRING (1)
      outputType: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
        this.images.push('data:image/jpeg;base64,' + results[i]);
      }
    }, (err) => {
      console.log(err);
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
    location:(<HTMLInputElement>document.getElementById('region')).value,
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
