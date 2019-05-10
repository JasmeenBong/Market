import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../services/databases.service';
import { NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

import * as firebase from 'firebase/app';


@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.page.html',
  styleUrls: ['./my-product.page.scss'],
})
export class MyProductPage implements OnInit{

  productList;
  products;
  array = [[],[]];
  uid : string = "";
  noProduct = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dbService : DatabaseService,
    private alertController : AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    if(this.uid == ""){
      this.checkUser();
    }
    else {
      this.getMyPostedAds(this.uid);
    }
  }

  checkUser(){
    let user = firebase.auth().currentUser;
    if(!user){
      this.router.navigateByUrl('tabs/tab5/login');
    }
    else {
      this.uid = user.uid;
      this.getMyPostedAds(this.uid);
    }
  }

  async getMyPostedAds(uid){
    await Promise.resolve(this.dbService.getProductByOwner(uid)).then(value=> {
      if(value[0] == null || value[0] == undefined){
        this.noProduct = true;
      }
      else{
        this.products = Object.entries(value[0]);
        console.log(value);
        var count = 0;
        for(var row =0; row < (this.products.length/2); row++)
        {
          for(var col=0; col<2; col++){
            this.array[row][col] = this.products[count][1];
            this.array[row][col].pid = this.products[count][0];
            count++;
          }
        }
      }
    });
  }

  postNewAd(){
    let navigationExtras: NavigationExtras = {
      queryParams:{
        action : "post new"
      }
    }
    this.router.navigate(['sell'],navigationExtras);
  }

  viewProduct(pid){
    let navigationExtras: NavigationExtras = {
      queryParams:{
        pid: pid
      }
    }
    this.router.navigate(['product'],navigationExtras);
  }

  editPost(pid){
    let navigationExtras: NavigationExtras = {
      queryParams:{
        action : "edit",
        pid: pid
      }
    }
    this.router.navigate(['sell'],navigationExtras);
  }

  refreshPage(){
    this.getMyPostedAds(this.uid);
    console.log("refreshed");
  }

  deletePost(pid){
    this.dbService.deleteAd(pid);
    this.presentAlert("Successfully deleted! Please refresh the page.");
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Success',
      message: msg,
      buttons: ['OK']
    });
    return await alert.present();
  }
}
