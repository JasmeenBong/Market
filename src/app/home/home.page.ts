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

  categories = [];
  products;
  productList = [];
  array = [[],[]];
  val;
  takeMeToPost = [];
  carousel;
  posts;
  loading = true;
  recentposts = [];
  postsObject;
  recentlyPosted;
  loadingNotice;


  constructor(private datePipe : DatePipe,private menu: MenuController, public router: Router,   private dbService : DatabaseService, private spinnerDialog: SpinnerDialog) {
  this.getCategoriesFromFireBase();
  this.showCarouselPhoto();
  this.recentPosted();

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
      this.array[row] = [];
      for(var col=0; col<3; col++){
        if(this.categories[count]){
        this.array[row][col] = this.categories[count];
        count++;
        }
      }
    }
  });
  }else{
    this.spinnerDialog.hide();
  }
    this.recentlyPosted = "Recently Posted";
    this.loadingNotice = "Hang on";
 }

goToProduct(takeMeToPost){
console.log(takeMeToPost);
}

 sell(){
   this.router.navigate(['tabs/tab2']);
 }
moreInfo(){
  this.router.navigate(['about']);
}

async recentPosted(){
  let db = firebase.database();
  this.posts = db.ref('/posts');

    this.posts.once('value',(snapshot)=>{
      var count = 0;
      for(let i = Object.values(snapshot.val()).length; i > 0; i--){
        if(count < 4){
          this.recentposts.push(Object.values(snapshot.val())[i-1]);
          this.takeMeToPost.push(Object.keys(snapshot.val())[i-1]);
          count ++;
        }
        else {
          break;
        }
      }
      this.loading = false;
        });

}

async goToPost(index){
  let navigationExtras: NavigationExtras = {
    queryParams:{
      pid: this.takeMeToPost[index]
    }
  }
  this.router.navigate(['product'],navigationExtras);
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
    };
    this.router.navigate(['categories'],navigationExtras);
  }

  ngOnInit(){

  }
  

}
