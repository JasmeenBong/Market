import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../services/databases.service';
import { NavigationExtras } from '@angular/router';

import * as firebase from 'firebase/app';


@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.page.html',
  styleUrls: ['./my-product.page.scss'],
})
export class MyProductPage implements OnInit{

  myAds = [];
  uid : any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dbService : DatabaseService
  ) { }

  ngOnInit() {
      // this.myAds = [{images: "https://firebasestorage.googleapis.com/v0/b/market-9d038.appspot.com/o/postPhotos%2FCat03.jpg?alt=media&token=6d278ef3-e383-4b47-838b-5332cd563411",
      // postName: "CAT FOR SALE", description: "Anggora cat", price: "1200"}];
  }

  ionViewWillEnter(){
    this.checkUser();
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

  getMyPostedAds(){}

  postNewAd(){
    let navigationExtras: NavigationExtras = {
      queryParams:{
        action : "post new"
      }
    }
    this.router.navigate(['sell'],navigationExtras);
  }

  viewProduct(pid){

  }

}
