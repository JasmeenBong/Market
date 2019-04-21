import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router'
import { DatabaseService } from '../services/databases.service';

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

  constructor(public router: Router,   private dbService : DatabaseService) {
  this.getCategoriesFromFireBase()
  }

  getCategoriesFromFireBase(){
   Promise.resolve(this.dbService.getCategoryIcon()).then(value=> {
      this.categories = Object.values(value[0]);
      var count = 0;
      for(var row=0; row<(this.categories.length/3); row++){
        for(var col=0; col<3; col++){
          this.array[row][col] = this.categories[count];
          count++;
        }
      }
    });
 }

  getProductsBasedonSearchBar(ev){
    Promise.resolve(this.dbService.getAllProducts()).then(value=> {
       this.products = Object.values(value[0]);
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
