import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { DatabaseService } from '../services/databases.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {

  constructor(private router: Router, private dbService : DatabaseService) { }

  uid : string = "";
  likedProductIDarray;
  likedProductarray = new Array();
  array = [[],[]];
  // products;
  private db = firebase.database();

  ngOnInit()
  {

  }

  ionViewWillEnter() {
    if(this.uid == ""){
      this.checkUser();
    }
    else {
       this.getLikedProduct();
    }
  }

  checkUser(){
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        this.uid = user.uid;
         this.getLikedProduct();
      }
      else {
        this.router.navigateByUrl('tabs/tab5/login');
      }
    });
  }

  async getLikedProduct(){
    await Promise.resolve(this.dbService.getCurrentUser(this.uid)).then(value=> {
      this.likedProductIDarray = Object.values(value[0].likedProduct);
      this.likedProductIDarray.forEach((id)=>{
        console.log("get product");
        this.getProductDetails(id);
      });
      console.log("done");
    });
  }

  getProductDetails(id){
    this.likedProductarray = new Array();
    Promise.resolve(this.dbService.getProductById(id)).then(value=>{
      value[0].id = id;
      this.likedProductarray.push(value[0]);
      console.log("product added");
      console.log(this.likedProductarray.length);
    });
    // if(this.likedProductarray.length == this.likedProductIDarray.length){
      this.showProduct();
    // }
  }

  showProduct(){
    console.log("show product");
    var count = 0;
    for(var row =0; row < (this.likedProductarray.length/2); row++)
      {
        console.log(this.likedProductarray.length/2);
        this.array[row] = [];
        for(var col=0; col<2; col++){
          this.array[row][col] = this.likedProductarray[count];
          this.array[row][col].pid = this.likedProductarray[count].id;
          count++;

        //     if(!this.likedProductarray.length){
      //       this.array[row][col] = this.products[count][1];
      //       this.array[row][col].pid = this.products[count][0];
      //       this.array[row][col].buttonColor = '';
      //       console.log(this.array);
      //       count++;


      }
    }
    console.log(this.array);
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

}
