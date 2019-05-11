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
  products;
  private db = firebase.database();

  checkUser(){
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        this.uid = user.uid;
         this.getLikedPostsDetails();
      }
      else {
        this.router.navigateByUrl('tabs/tab5/login');
      }
    });
  }

  getLikedPostsDetails(){
      this.likedProductarray = new Array()
      this.getListOfLikedProduct().then(data => {
      data.forEach(product => {
        this.db.ref("posts/" + product).once('value').then((snapshot) => {
          console.log(snapshot.val());
          this.likedProductarray.push((snapshot.val()));
        }).catch((err) => {
           console.log(err);
        });
      });
      console.log(this.likedProductarray);
      console.log(this.likedProductarray.length);
    }).catch(err =>{
      console.log(err);
    });
  }


  getListOfLikedProduct(){
    let items: any = [];
    var mList = [];
    return this.db.ref("users/" + this.uid + "/likedProduct").once('value').then((snapshot) => {
      snapshot.forEach(user => {
        mList.push(user.val());
      });
      return items = mList;
    }).catch((err) => {
      return err;
    });
  }

  // printOutProductList(){
  //   console.log(this.likedProductarray);
  //   // console.log(Objecthis.likedProductarray[0]);
  //   // console.log(this.likedProductarray.length);
  //   // var count = 0;
  //   // for(var row =0; row < (this.likedProductarray.length/2); row++)
  //   // {
  //   //   this.array[row] = [];
  //   //   for(var col=0; col<2; col++){
  //   //     console.log(this.likedProductarray[count]);
  //   //     console.log(count);
  //   //     count++;
  //   //       // this.array[row][col] = this.products[count];
  //   //       // this.array[row][col].pid = this.products[count].id;
  //   //       // count++;
  //   //   }
  //   // }
  // }

  // async getMyLikedAds(){
  //   await Promise.resolve(this.dbService.getCurrentUser(this.uid)).then(value=> {
  //     this.likedProductIDarray = Object.values(value[0].likedProduct);
  //     for(var i=0; i<this.likedProductIDarray.length; i++){
  //       this.getProductDetails(this.likedProductIDarray[i]);
  //     }
  //   });
  //   this.printOutProductList();
  // }
  //
  //
  // async getProductDetails(pid){
  //   this.likedProductarray = [];
  //   await Promise.resolve(this.dbService.getProductById(pid)).then(value=>{
  //       this.products = value[0];
  //       this.products.id = pid;
  //       this.likedProductarray.push(this.products);
  //   });
  // }
  
  ngOnInit()
  {

  }

  ionViewWillEnter() {
    if(this.uid == ""){
      this.checkUser();
    }
    else {
       this.getLikedPostsDetails();
    }
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
