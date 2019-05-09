import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {

  constructor(private router: Router) { }

  uid : string = "";

  ionViewWillEnter(){
    if(this.uid == ""){
      this.checkUser();
    }
    else {
      // this.getMyPostedAds(this.uid);
    }
  }

  checkUser(){
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        this.uid = user.uid;
        console.log(this.uid);
      }
      else {
        this.router.navigateByUrl('tabs/tab5/login');
      }
    });
  }

  ngOnInit() {
  }

}
