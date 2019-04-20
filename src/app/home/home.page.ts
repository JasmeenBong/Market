import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { NavigationExtras } from '@angular/router'

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

  constructor(public afd: AngularFireDatabase, public router: Router) {
  this.getCategoriesFromFireBase()
  this.getProductsFromFireBase()
  }

  getCategoriesFromFireBase(){
    this.afd.list('/categories/').valueChanges().subscribe(
      data=>{
        this.categories = data;
        var count = 0;
          for(var row = 0; row < (this.categories.length /3); row++){
            for(var col = 0; col < 3; col++){
                this.array[row][col] = this.categories[count];
                count++;
            }
          }
      }
    );
  }

  getProductsFromFireBase(){
    this.afd.list('/posts/').valueChanges().subscribe(
      data=>{
        this.products = data;
      }
    )
  }

  getProducts(ev){
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
