import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router'
import { DatabaseService } from '../services/databases.service';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  categories = [];
  products;
  productList = [];
  array = [[],[]];
  val;
  carousel;

  constructor(public router: Router,   private dbService : DatabaseService, private spinnerDialog: SpinnerDialog) {
  this.getCategoriesFromFireBase();
  this.showCarouselPhoto();
  }

  async getCategoriesFromFireBase(){
  this.categories = [];
  this.spinnerDialog.show();
  var categoriesList = firebase.database().ref('/categories');
  if(categoriesList){
  categoriesList.on("value",snapshot=>{
    snapshot.forEach(childSnapshot=>{
      this.categories.push(childSnapshot.val())
    });
    this.spinnerDialog.hide();
    var count = 0;
    for(var row=0; row<(this.categories.length/3); row++){
      for(var col=0; col<3; col++){
        this.array[row][col] = this.categories[count];
        count++;
      }
    }
  });
  }else{
    this.spinnerDialog.hide();
  }
 }


moreInfo(){
  this.router.navigate(['about']);
}
  async getProductsBasedonSearchBar(){
    let navigationExtras: NavigationExtras = {
      queryParams:{
        category : "All"
      }
    }
    this.router.navigate(['categories'],navigationExtras);
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

  ngOnInit() {
  }

}
