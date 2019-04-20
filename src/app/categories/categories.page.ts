import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  category;
  productList;
  products;
  array = [[],[]]

  constructor(private route: ActivatedRoute, private router: Router, public afd: AngularFireDatabase) {
    this.getCategoriesFromHomePage()
  }

  getCategoriesFromHomePage(){
     this.route.queryParams.subscribe(params=> {
       if(params && params.category){
         this.category = params.category;
         this.getProductListFromFireBase(this.category)
       }
     })
  }

  getProductListFromFireBase(category){
    this.afd.list('/posts/', ref => ref.orderByChild('postCategory').equalTo(category)).valueChanges().subscribe(
       data=>{
         this.products = data;
         var count = 0;
         for(var row=0; row<(this.products.length/2); row++){
           for(var col=0; col<2;col++){
             this.array[row][col] = this.products[count];
             count++;
           }
         }
        console.log(this.array);
      }
    );
  }

  ngOnInit() {
  }

}
