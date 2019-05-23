import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router'
import { DatabaseService } from '../services/databases.service';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { MenuController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  categories;
  products;
  productList = [];
  array = [[],[]];
  val;
  carousel;
  posts;
  loading = true;
  recentposts = [];
  recentlyPosted;
  loadingNotice;


  constructor(private datePipe : DatePipe,private menu: MenuController, public router: Router,   private dbService : DatabaseService, private spinnerDialog: SpinnerDialog) {
  this.getCategoriesFromFireBase();
  this.showCarouselPhoto();
  this.recentPosted();

  }

  async getCategoriesFromFireBase(){
  this.spinnerDialog.show();
  await Promise.resolve(this.dbService.getCategory()).then(value=> {
      if(value){
        this.categories = Object.values(value[0]);
        this.spinnerDialog.hide();
      }else{
        setTimeout(() => {
          this.spinnerDialog.hide();
        }, 5000);
      }
      var count = 0;
      for(var row=0; row<(this.categories.length/3); row++){
        for(var col=0; col<3; col++){
          this.array[row][col] = this.categories[count];
          count++;
        }
      }
    });
    this.recentlyPosted = "Recently Posted";
    this.loadingNotice = "Hang on";
 }
moreInfo(){
  this.router.navigate(['about']);
}

async recentPosted(){
  let db = firebase.database();
  this.posts = db.ref('/posts');

    this.posts.once('value',(snapshot)=>{
      snapshot.forEach(child=>{
      let date1 = new Date();
      let formatedFetchDate = new Date(child.val().dateTime);
      let diffTime = Math.abs(formatedFetchDate.getTime() - date1.getTime());
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if(diffDays <= 5){
        this.recentposts.push(child.val());
      }
      });
      this.loading = false;
        });

}
  async getProductsBasedonSearchBar(){
    let navigationExtras: NavigationExtras = {
      queryParams:{
        category : "All"
      }
    }
    this.router.navigate(['categories'],navigationExtras);
  //   await Promise.resolve(this.dbService.getAllProducts()).then(value=> {
  //      this.products = Object.values(value[0]);
  //    });
  //   this.val = ev.target.value;
  //   if(this.val && this.val.trim() !== ''){
  //   this.productList = this.products.filter(product =>{
  //     return product.postName.toLowerCase().indexOf(this.val.toLowerCase()) > -1;
  //   });
  // }
  // else{
  //   this.productList = [];
  //   }
  }

  async showCarouselPhoto(){
    this.spinnerDialog.show();
    await Promise.resolve(this.dbService.getCarouselImage()).then(value=> {
       if(value){
         this.carousel= Object.values(value[0]);
         this.spinnerDialog.hide();
       }else{
         setTimeout(() => {
           this.spinnerDialog.hide();
         }, 5000);
       }
     });
  }


  goCategoriesPage(categoryName) {
    let navigationExtras: NavigationExtras = {
      queryParams:{
        category : categoryName
      }
    }
    this.router.navigate(['categories'],navigationExtras);
  }

  ngOnInit(){

  }
  

}
