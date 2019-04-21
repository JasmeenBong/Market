import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { DatabaseService } from '../services/databases.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  users;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService
  ) { }

  ngOnInit() {
    //temporary
    if(this.authService.isLoggedIn === false){
      this.navCtrl.navigateForward('/login');
    }


    //should check whether sessionStorage has user
  }

  logoutUser(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.authService.isLoggedIn = false;
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }

}
