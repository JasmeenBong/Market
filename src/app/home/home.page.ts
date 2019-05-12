import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router'
import { DatabaseService } from '../services/databases.service';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  categories;
  products;
  productList;
  array = [[],[]];
  val;
  carousel;

  constructor(public router: Router,   private dbService : DatabaseService, private spinnerDialog: SpinnerDialog) {
  this.getCategoriesFromFireBase();
  this.showCarouselPhoto();
  }

  async getCategoriesFromFireBase(){
  this.spinnerDialog.show();
  await Promise.resolve(this.dbService.getCategory()).then(value=> {
      this.categories = Object.values(value[0]);
      if(this.categories){
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
 }

  async getProductsBasedonSearchBar(ev){
    this.spinnerDialog.show();
    await Promise.resolve(this.dbService.getAllProducts()).then(value=> {
       this.products = Object.values(value[0]);
       if(this.products){
         this.spinnerDialog.hide();
       }else{
         setTimeout(() => {
           this.spinnerDialog.hide();
         }, 5000);
       }
     });
    this.val = ev.target.value;
    if(this.val && this.val.trim() !== ''){
    this.productList = this.products.filter(product =>{
      return product.postName.toLowerCase().indexOf(this.val.toLowerCase()) > -1;
    });
  }
  else{
    this.productList = '';
    }
  }

  async showCarouselPhoto(){
    this.spinnerDialog.show();
    await Promise.resolve(this.dbService.getCarouselImage()).then(value=> {
       this.carousel= Object.values(value[0]);
       if(this.carousel){
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
