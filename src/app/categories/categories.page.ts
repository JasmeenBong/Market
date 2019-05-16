import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../services/databases.service';
import { NavigationExtras } from '@angular/router';
import { ModalController, AlertController, NavController, ToastController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { FilterModalPage } from '../filter-modal/filter-modal.page';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import * as firebase from 'firebase/app';
import { AuthenticateService } from '../services/authentication.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  category;
  categories;
  products;
  array = [[],[]];
  names;
  location : any = "Malaysia";
  buttonColor;
  uid;
  likedProductarray = new Array();
  userInfo;
  noProductinCategories = false;

  constructor(private route: ActivatedRoute, private router: Router, private dbService : DatabaseService, private modalController: ModalController,
    private alertController: AlertController, private navController: NavController, private spinnerDialog: SpinnerDialog, private toastController : ToastController,
    private authService : AuthenticateService) {
    this.getCategoriesFromHomePage()
  }

  getCategoriesFromHomePage(){
     this.route.queryParams.subscribe(params=> {
       if(params && params.category){
         this.category = params.category;
         this.getProductListFromFireBase(this.category);
       }
     })
  }

  async checkCurrentUserWithoutLogin(){
    let user = this.authService.user;
    if(user){
      console.log(user.email);
      this.uid = user.uid;
      await Promise.resolve(this.dbService.getCurrentUser(this.uid)).then(value=> {
        this.userInfo  = value[0];
        this.likedProductarray = Object.values(this.userInfo.likedProduct);
      });
    }
  }

  async printOutProductList(){
    await this.checkCurrentUserWithoutLogin();
    var count = 0;
    for(var row =0; row < (this.products.length/2); row++)
    {
      this.array[row] = [];
      for(var col=0; col<2; col++){
        if(!this.likedProductarray.length){
          this.array[row][col] = this.products[count][1];
          this.array[row][col].pid = this.products[count][0];
          this.array[row][col].buttonColor = '';
          console.log(this.array);
          count++;
        }else{
          if(this.likedProductarray.includes(this.products[count][0]))
          {
            this.array[row][col] = this.products[count][1];
            this.array[row][col].pid = this.products[count][0];
            this.array[row][col].buttonColor = 'danger';
            console.log(this.array);
            count++;
          }else{
            this.array[row][col] = this.products[count][1];
            this.array[row][col].pid = this.products[count][0];
            this.array[row][col].buttonColor = '';
            console.log(this.array);
            count++;
          }
        }
      }
    }
  }

  sortByTime(time){
    if(time == "Oldest to Newest"){
      this.products.sort(function(a,b){
        var time1 : any = new Date(a[1].dateTime);
        var time2 : any = new Date(b[1].dateTime)
        return time1 - time2;
      });
    }else if(time == "Newest to Oldest"){
      this.products.sort(function(a,b){
        var time1 : any = new Date(a[1].dateTime);
        var time2 : any = new Date(b[1].dateTime)
        return time2 - time1;
      });
    }else{
      this.products = this.products;
    }
    this.printOutProductList();
  }

  sortByPrice(price){
    if(price == "Lowest to Highest"){
      this.products.sort(function(a, b) {
        return parseFloat(a[1].price) - parseFloat(b[1].price);
      });
    }else if(price == "Highest to Lowest"){
      this.products.sort(function(a, b) {
        return parseFloat(b[1].price) - parseFloat(a[1].price);
      });
    }else{
      this.products = this.products;
    }
    this.printOutProductList();
  }

  sortByLocation(){
    if(this.location == "Malaysia")
    {
      this.printOutProductList();
    }
    else{
      var count = 0;
      for(var row =0; row < (this.products.length/2); row++)
      {
        this.array[row] = [];
        for(var col=0; col<2; col++){
          if(this.products[count][1].area == this.location){
            this.array[row][col] = this.products[count][1];
            this.array[row][col].pid = this.products[count][0];
            count++;
          }
        }
      }
    }
  }

  async getProductListFromFireBase(category){
    this.spinnerDialog.show();
    await Promise.resolve(this.dbService.getProductListforEachCategories(category)).then(value=> {
      if(value[0] == null || value[0] == undefined){
        this.spinnerDialog.hide();
        this.noProductinCategories = true;
      }else
      {
        this.noProductinCategories = false;
        this.products = Object.entries(value[0]);
        this.spinnerDialog.hide();
      }
      this.printOutProductList();
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

  async openLocationModal() {
  const modal = await this.modalController.create({
    component: ModalPage,
    cssClass: 'my-custom-modal-css'
  });
  modal.onDidDismiss().then(data => {
    this.location = Object.values(data.data);
    this.sortByLocation();
  });
  await modal.present();
}

  async openFilterModal() {
    const modal = await this.modalController.create({
      component: FilterModalPage,
      cssClass: 'my-custom-modal-css'
    });
    modal.onDidDismiss().then(data => {
      if(Object.values(data.data)[0] && !Object.values(data.data)[1]) {
        this.sortByPrice(Object.values(data.data)[0]);
      }
      if(!Object.values(data.data)[0] && Object.values(data.data)[1]){
        this.sortByTime(Object.values(data.data)[1]);
      }
      if(Object.values(data.data)[0] && Object.values(data.data)[1]){
        this.sortByPrice(Object.values(data.data)[0]);
        this.sortByTime(Object.values(data.data)[1]);
      }
    });
    await modal.present();
  }

async openAlert(){
    var inputs = [];

  await Promise.resolve(this.dbService.getCategory()).then(value=> {
      this.categories = Object.values(value[0]);
    });

  for(var i=0; i < this.categories.length;i++){
    inputs.push({name: this.categories[i].categoryName, type:'radio', label: this.categories[i].categoryName, value: this.categories[i].categoryName});
  }

  const alert = await this.alertController.create({
        header: 'Please select a category',
        inputs: inputs,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          }, {
            text: 'Ok',
            handler: (data) => {
              this.category = data;
              this.array = [[],[]];
              this.getProductListFromFireBase(this.category);
            }
          }
        ]
      });

      await alert.present();

  }

  async checkCurrentUser(){
    if(!this.authService.user || this.authService.user == ""){
      this.askusertoLogin();
    }
    else {
      this.uid = this.authService.user.uid;
      await Promise.resolve(this.dbService.getCurrentUser(this.uid)).then(value=> {
        this.userInfo  = value[0];
      });
    }
  }

  async addtoLikedProduct(pid,col){
    await this.checkCurrentUser();
    if(this.userInfo){
      this.likedProductarray = Object.values(this.userInfo.likedProduct);
      if(!this.likedProductarray.includes(pid))
      {
        this.likedProductarray.push(pid);
        this.dbService.addToCurrentUserLikedProduct(this.uid, this.likedProductarray);
        col.buttonColor = "danger";
        this.presentToast('Added to my favourite list');
      }else{
        this.likedProductarray.splice(this.likedProductarray.indexOf(pid), 1 );
        this.dbService.addToCurrentUserLikedProduct(this.uid, this.likedProductarray);
        col.buttonColor = "";
        this.presentToast('Removed from my favourite list');
      }
    }
  }

  async presentToast(msg) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000
      });
      toast.present();
    }

  async askusertoLogin(){
      const alert = await this.alertController.create({
        header: 'Fantastic, you found something you like',
        message: 'Please log-in, for the best experience.',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.router.navigateByUrl('tabs/tab5/login');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
          }
        }
        ]
      });
      return await alert.present();
  }

  goToHomePage(){
    this.navController.navigateBack('tabs/tab1');
  }

  ngOnInit() {
  }
}
