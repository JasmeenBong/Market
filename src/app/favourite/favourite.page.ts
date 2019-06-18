import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthenticateService } from '../services/authentication.service';
import { DatabaseService } from '../services/databases.service';
import { NavigationExtras } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { snapshotChanges } from 'angularfire2/database';

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
  noLikedProduct = false;

  ngOnInit()
  {
    this.ionViewDidEnter();
  }

  //when the page is enter
  //if user is not login, go to login page
  //else get the likedproduct from firebase
  ionViewDidEnter() {
    if(!this.authService.user || this.authService.user == ""){
      this.navCtrl.navigateForward('swiped-tab/login');
    }
    else {
      this.uid = this.authService.user.uid;
        this.getLikedProduct();
    }
  }
  

  //get current user liked product id from firebase
  getLikedProduct(){
    Promise.resolve(this.dbService.getCurrentUser(this.uid)).then(value =>{
     this.likedProductIDarray = Object.values(value[0].likedProduct);
     if(this.likedProductIDarray.length){
     this.noLikedProduct = false;
     this.likedProductIDarray.forEach(value=>{
       console.log(value);
       if(this.likedProductarray.length != this.likedProductIDarray.length){
       this.likedProductarray = [];
       this.array = [[],[]];
       this.getProductDetails(value);
       }
     })
    }else{
       this.array = [[],[]];
      this.noLikedProduct = true;
      console.log(this.noLikedProduct);
    }
    }); 
  }

  //get the details of the product
  getProductDetails(id){
    Promise.resolve(this.dbService.getProductById(id)).then(value => {
      const found = this.likedProductarray.some(el=> el.id === id);
      if(!found){
        value[0].id = id;
       this.likedProductarray.push(value[0]);
      }
      var count = 0;
        for(var row =0; row < (this.likedProductarray.length/2); row++){
          {
            this.array[row] = [];
              for(var col=0; col<2; col++){
                if(this.likedProductarray[count]){
                this.array[row][col] = this.likedProductarray[count];
                this.array[row][col].pid = this.likedProductarray[count].id;
                if(count != this.likedProductarray.length){
                count++;
                }
              }
            }
          }
        }
    });
  }

  //remove the product from user liked product
  async removeFromLikedProduct(pid){
    const alert = await this.alertController.create({
      header: 'Remove',
      message: 'Remove the selected item from My Favourite List?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            var index = this.likedProductIDarray.indexOf(pid);
            if (index > -1) {
              this.likedProductIDarray.splice(index, 1);
            }
            this.dbService.addToCurrentUserLikedProduct(this.uid, this.likedProductIDarray);
            this.array = [[],[]];
            this.likedProductarray = [];
            this.likedProductIDarray = [];
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

  //go to product page when user click one of the product
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
