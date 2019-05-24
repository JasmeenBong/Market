import { Component, OnInit } from '@angular/core';
import { NavController, IonToggle } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/databases.service';
import { AuthenticateService } from '../services/authentication.service';
import { NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';


@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.page.html',
  styleUrls: ['./my-product.page.scss'],
})
export class MyProductPage implements OnInit{

  productList;
  products;
  array;
  now;
  due = [];
  uid : string = "";
  noProduct = false;
  isDisabled : Boolean = false;
  likedProductarray = [];

  constructor(
    private router: Router,
    private dbService : DatabaseService,
    private alertController : AlertController,
    private navCtrl : NavController,
    private authService : AuthenticateService,
    private spinnerDialog: SpinnerDialog
  ) { }

  ngOnInit() {
    this.spinnerDialog.show();

    // setTimeout(() => {
    //   this.spinnerDialog.hide();
    // }, 5000);
  }

  ionViewWillEnter(){
    this.spinnerDialog.show();
    if(!this.authService.user || this.authService.user == ""){
      this.navCtrl.navigateForward('swiped-tab/login');
      this.spinnerDialog.hide();
    }
    else {
      this.uid = this.authService.user.uid;
      this.getMyPostedAds(this.uid);
    }

  }

  async getMyPostedAds(uid){
    this.array = [[],[]];
    await Promise.resolve(this.dbService.getProductByOwner(uid)).then(value=> {
      if(value[0] == null || value[0] == undefined){
        this.noProduct = true;
        this.array = [[],[]];
        this.spinnerDialog.hide();
      }
      else{
        this.noProduct = false;
        this.products = Object.entries(value[0]);
        var count = 0;

        for(var row =0; row < (this.products.length/2); row++)
        {
          this.array[row]=[];
          for(var col=0; col<2; col++){
            this.array[row][col] = this.products[count][1];
            this.array[row][col].pid = this.products[count][0];

            this.now = new Date();
            let formatedFetchDate = new Date(this.array[row][col].dateTime );
            let diffTime = Math.abs(formatedFetchDate.getTime() - this.now.getTime());
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
           console.log(diffDays);
        
            count++;
          }
        }
        this.spinnerDialog.hide();
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
    this.ngOnInit();
    this.getMyPostedAds(this.uid);
    console.log("refreshed");
  }

  async deletePost(pid){
    // var allUser = firebase.database().ref("/users");
    // allUser.on("value",snapshot=>{
    //   snapshot.forEach(childSnapshot=>{
    //   if(childSnapshot.val().likedProduct != ""){}
    //      this.likedProductarray = childSnapshot.val().likedProduct;
    //      console.log(this.likedProductarray);
    //     //  this.likedProductarray.forEach(id=>{
    //     //    if(id != null || id != undefined){
    //     //    console.log(id);
    //     //    }
    //     //  })
    //     }
    //   });
    // });
    await this.dbService.deleteAd(pid);
    this.presentAlert("Successfully deleted! Please refresh the page.");
    this.refreshPage();
  }

  async postSold(pid){
      console.log("SOLD");
      this.isDisabled = true;
      this.presentAlert("Your ad has been sold hence the system will delete the ad.");
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
