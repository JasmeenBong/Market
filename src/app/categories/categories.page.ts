import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../services/databases.service';
import { NavigationExtras } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private router: Router, private dbService : DatabaseService) {
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
  Promise.resolve(this.dbService.getProductListforEachCategories(category)).then(value=> {
    this.products = Object.entries(value[0]);
    var count = 0;
    for(var row =0; row < (this.products.length/2); row++)
    {
      for(var col=0; col<2; col++){
        this.array[row][col] = this.products[count][1];
        this.array[row][col].pid = this.products[count][0];
        count++;
      }
    }
  });
  }

  goToProductPage(pid)
  {
    let navigationExtras: NavigationExtras = {
      queryParams:{
        pid: pid
      }
    }
    this.router.navigate(['product'],navigationExtras);
  }

  ngOnInit() {
  }
}
