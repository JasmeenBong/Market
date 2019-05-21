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

  getLikedProduct(){
    console.log('start');
    var user = firebase.database().ref('users/' + this.uid);
    user.on("value",snapshot=>{
      this.likedProductIDarray = snapshot.val().likedProduct;
      if(this.likedProductIDarray.length){
        this.noLikedProduct = false;
        this.likedProductIDarray.forEach((id)=>{
          this.getProductDetails(id);
        });
      }else{
        this.likedProductarray = [];
        this.array = [[],[]];
        this.noLikedProduct = true;
      }
    });
  }

  getProductDetails(id){
  var likedProduct = firebase.database().ref('posts/'+id);
  likedProduct.on("value",snapshot=>{
    const found = this.likedProductarray.some(el => el.id === id);
    if(!found){
    var product = snapshot.val();
    product.id = id;
    this.likedProductarray.push(product);
    console.log(this.likedProductarray);
    if(this.likedProductarray.length == this.likedProductIDarray.length){
      var count = 0;
        for(var row =0; row < (this.likedProductarray.length/2); row++){
          {
            this.array[row] = [];
              for(var col=0; col<2; col++){
                if(this.likedProductarray[count]){
                this.array[row][col] = this.likedProductarray[count];
                console.log(this.array);
                this.array[row][col].pid = this.likedProductarray[count].id;
                if(count != this.likedProductarray.length){
                count++;
                console.log(count);
                }
                }
              }
            }
          }
      }
  
    }
  });
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
