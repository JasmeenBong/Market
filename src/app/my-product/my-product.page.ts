import { Component, OnInit } from '@angular/core';
import { NavController, IonToggle } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/databases.service';
import { AuthenticateService } from '../services/authentication.service';
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
  isDisabled : Boolean = false;

  constructor(
    private router: Router,
    private dbService : DatabaseService,
    private alertController : AlertController,
    private navCtrl : NavController,
    private authService : AuthenticateService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    if(!this.authService.user || this.authService.user == ""){
      this.navCtrl.navigateForward('swiped-tab/login');
    }
    else {
      this.uid = this.authService.user.uid;
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
    this.navCtrl.navigateForward(['product'], navigationExtras);
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
    this.refreshPage();
  }

  async postSold(pid){
      console.log("SOLD");
      this.isDisabled = true;
      this.presentAlert("Your ad has been sold hence the system will delete the ad. Thank you for using our system.");
      await this.dbService.deleteAd(pid);
      this.refreshPage();
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
