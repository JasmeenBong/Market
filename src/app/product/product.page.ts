import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../services/databases.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  pid;
  product;
  seller

  constructor(private route: ActivatedRoute, private router: Router, private dbService : DatabaseService) {
  this.getIdFromCategoriesPage()
}

  getIdFromCategoriesPage(){
    this.route.queryParams.subscribe(params=> {
      if(params && params.pid){
        this.pid = params.pid;
        this.getProductDetailsById(this.pid);
      }
    })
  }

  goToChatBox(){
    
  }

  getProductDetailsById(pid){
    Promise.resolve(this.dbService.getProductById(pid)).then(value=> {
       this.product = value[0];
       console.log(this.product);
        this.getImagesforAvatar(this.product.owner);
     });
  }

  getImagesforAvatar(owner){
    Promise.resolve(this.dbService.getSellerImages(owner)).then(value=> {
       this.seller = Object.values(value[0]);
       console.log(this.seller[0].url);
     });
  }
  ngOnInit() {
  }

}
