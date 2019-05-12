import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthenticateService } from '../services/authentication.service';
import { DatabaseService } from '../services/databases.service';
import { NavigationExtras } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {

  constructor(private router: Router, private dbService : DatabaseService, private navCtrl:NavController,
  private authService : AuthenticateService, private alertController : AlertController, private spinnerDialog: SpinnerDialog) { }

  uid : string = "";
  array = [[],[]];
  users
  products;
  getProducts;
  likedProducts = [];
  private db = firebase.database();

  checkUser(){
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        this.uid = user.uid;
        this.getAllDetails();
      }
      else {
        this.router.navigateByUrl('tabs/tab5/login');
      }
    });
  }


getAllDetails(){
  this.users = firebase.database().ref('users/' + this.uid + '/likedProduct');
  this.users.on("value",(snapshot)=>{
    for(var i = 0; i < Object.values(snapshot.val()).length; i++){
      this.likedProducts.push(Object.values(snapshot.val())[i]);
    }
  this.getProducts = firebase.database().ref('posts/');
  
});
}

  
  ngOnInit()
  {
  //this.getAllDetails();
  }

  ionViewWillEnter() {
    if(this.uid == ""){
      this.checkUser();
    }
    else {
     //   this.getLikedPostsDetails();
     this.getAllDetails();

    }
  }


  goToProductPage(pid)
  {
    let navigationExtras: NavigationExtras = {
      queryParams:{
        pid: pid
      }
    }
    this.navCtrl.navigateForward(['product'], navigationExtras);
  }

}
