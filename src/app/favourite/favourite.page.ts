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
  likedProductIDarray;
  likedProductarray = [];
  array = [[],[]];
  // products;
  private db = firebase.database();

  ngOnInit()
  {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    if(!this.authService.user || this.authService.user == ""){
      this.navCtrl.navigateForward('tabs/tab5/login');
    }
    else {
      this.uid = this.authService.user.uid;
      this.getLikedProduct();
    }
  }

  async getLikedProduct(){
    await Promise.resolve(this.dbService.getCurrentUser(this.uid)).then(value=> {
      this.likedProductIDarray = Object.values(value[0].likedProduct);
      if(this.likedProductIDarray.length){
        this.likedProductIDarray.forEach((id)=>{
          this.getProductDetails(id);
        });
      }
      else{
            this.likedProductarray = [];
            this.array = [[],[]];
          }
      });
  }

  async getProductDetails(id){
    this.spinnerDialog.show();
    this.likedProductarray = [];
    this.array = [[],[]];
    await Promise.resolve(this.dbService.getProductById(id)).then(value=>{
      if(value){
        this.spinnerDialog.hide();
      }else{
        setTimeout(() => {
          this.spinnerDialog.hide();
        }, 5000);
      }
      value[0].id = id;
      this.likedProductarray.push(value);
      console.log(this.likedProductarray);
    });
    if(this.likedProductarray.length == this.likedProductIDarray.length && this.likedProductarray.length){
        var count = 0;
        for(var row =0; row < (this.likedProductarray.length/2); row++)
          {
            this.array[row] = [];
            for(var col=0; col<2; col++){
              this.array[row][col] = this.likedProductarray[count][0];
              this.array[row][col].pid = this.likedProductarray[count][0].id;
              console.log(count);
              console.log(this.array);
              count++;

            }
          }
      }
      else{
      }
  }

  async removeFromLikedProduct(pid){
    const alert = await this.alertController.create({
      header: 'Remove',
      message: 'Remove the selected item from My Favourite List?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.likedProductIDarray.splice(this.likedProductarray.indexOf(pid), 1 );
            this.dbService.addToCurrentUserLikedProduct(this.uid, this.likedProductIDarray);
            this.getLikedProduct();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
      }
      ]
    });
    return await alert.present();
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
