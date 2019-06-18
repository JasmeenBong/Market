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
  val;

  constructor(private route: ActivatedRoute, private router: Router, private dbService : DatabaseService, private modalController: ModalController,
    private alertController: AlertController, private navCtrl: NavController, private spinnerDialog: SpinnerDialog, private toastController : ToastController,
    private authService : AuthenticateService) {
    this.getCategoriesFromHomePage()
  }

  //when the page is enter
  //check if the user is login or not
  //if the likedproduct of the user is different that the likedproductarray that is previous stored, then print the product list
  ionViewWillEnter(){
    this.checkCurrentUserWithoutLogin();
    if(Object.values(this.userInfo.likedProduct) != this.likedProductarray){
    this.printOutProductList();
    }
  }

 //get category from the home page when user press one of the categories
  getCategoriesFromHomePage(){
     this.route.queryParams.subscribe(params=> {
       if(params && params.category){
         this.category = params.category;
         this.getProductListFromFireBase(this.category);
       }
     })
  }
 
  //check if the user is login or not
  //if yes, get the liked product array
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

  //print out the product list
  async printOutProductList(){
    this.array=[[],[]];
    await this.checkCurrentUserWithoutLogin();
    var count = 0;
    for(var row =0; row < (this.products.length/2); row++)
    {
      this.array[row] = [];
      for(var col=0; col<2; col++){
        if(!this.likedProductarray.length){
          if(this.products[count]){
          console.log(this.products[count]);
          this.array[row][col] = this.products[count][1];
          this.array[row][col].pid = this.products[count][0];
          this.array[row][col].buttonColor = '';
          // console.log(this.array);
          count++;
          }
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

  //sort the product list by time, location and price
  sortBy(time,location,price){
    if(this.location == "Malaysia")
    {
      if(time == "Oldest to Newest" && !price){
        this.products.sort(function(a,b){
        var time1 : any = new Date(a[1].dateTime);
        var time2 : any = new Date(b[1].dateTime)
        return time1 - time2;
      });
      this.printOutProductList();
      }
      if(time == "Newest to Oldest" && !price){
        this.products.sort(function(a,b){
              var time1 : any = new Date(a[1].dateTime);
              var time2 : any = new Date(b[1].dateTime)
              return time2 - time1;
        });
        this.printOutProductList();
      }
      if(time == "Oldest to Newest" && price =="Lowest to Highest"){
        this.products.sort(function(a,b){
          var time1 : any = new Date(a[1].dateTime);
          var time2 : any = new Date(b[1].dateTime)
          return time1 - time2;
        });
        this.products.sort(function(a, b) {
          return parseFloat(a[1].price) - parseFloat(b[1].price);
        });
        this.printOutProductList();
      }
      if(time == "Newest to Oldest" && price =="Lowest to Highest"){
        this.products.sort(function(a,b){
          var time1 : any = new Date(a[1].dateTime);
          var time2 : any = new Date(b[1].dateTime)
          return time2 - time1;
        });
        this.products.sort(function(a, b) {
          return parseFloat(a[1].price) - parseFloat(b[1].price);
        });
        this.printOutProductList();
      }
      if(time == "Oldest to Newest" && price =="Highest to Lowest"){
        this.products.sort(function(a,b){
          var time1 : any = new Date(a[1].dateTime);
          var time2 : any = new Date(b[1].dateTime)
          return time1 - time2;
        });
        this.products.sort(function(a, b) {
          return parseFloat(b[1].price) - parseFloat(a[1].price);
        });
        this.printOutProductList();
      }
      if(time == "Newest to Oldest" && price == "Highest to Lowest"){
        this.products.sort(function(a,b){
          var time1 : any = new Date(a[1].dateTime);
          var time2 : any = new Date(b[1].dateTime)
          return time2 - time1;
        });
        this.products.sort(function(a, b) {
          return parseFloat(b[1].price) - parseFloat(a[1].price);
        });
        this.printOutProductList();
      }
      if(!time && price == "Lowest to Highest"){
        this.products.sort(function(a, b) {
          return parseFloat(a[1].price) - parseFloat(b[1].price);
        });
        this.printOutProductList();
      }
      if(!time && price == "Highest to Lowest"){
        this.products.sort(function(a, b) {
          return parseFloat(b[1].price) - parseFloat(a[1].price);
        });
        this.printOutProductList();
      }
    }else{
        this.products = this.products.filter((o)=> o[1].area == this.location[0])
        if(time == "Oldest to Newest" && !price){
          this.products.sort(function(a,b){
          var time1 : any = new Date(a[1].dateTime);
          var time2 : any = new Date(b[1].dateTime)
          return time1 - time2;
        });
        this.printOutProductList();
        }
        if(time == "Newest to Oldest" && !price){
          this.products.sort(function(a,b){
                var time1 : any = new Date(a[1].dateTime);
                var time2 : any = new Date(b[1].dateTime)
                return time2 - time1;
          });
          this.printOutProductList();
        }
        if(time == "Oldest to Newest" && price =="Lowest to Highest"){
          this.products.sort(function(a,b){
            var time1 : any = new Date(a[1].dateTime);
            var time2 : any = new Date(b[1].dateTime)
            return time1 - time2;
          });
          this.products.sort(function(a, b) {
            return parseFloat(a[1].price) - parseFloat(b[1].price);
          });
          this.printOutProductList();
        }
        if(time == "Newest to Oldest" && price =="Lowest to Highest"){
          this.products.sort(function(a,b){
            var time1 : any = new Date(a[1].dateTime);
            var time2 : any = new Date(b[1].dateTime)
            return time2 - time1;
          });
          this.products.sort(function(a, b) {
            return parseFloat(a[1].price) - parseFloat(b[1].price);
          });
          this.printOutProductList();
        }
        if(time == "Oldest to Newest" && price =="Highest to Lowest"){
          this.products.sort(function(a,b){
            var time1 : any = new Date(a[1].dateTime);
            var time2 : any = new Date(b[1].dateTime)
            return time1 - time2;
          });
          this.products.sort(function(a, b) {
            return parseFloat(b[1].price) - parseFloat(a[1].price);
          });
          this.printOutProductList();
        }
        if(time == "Newest to Oldest" && price == "Highest to Lowest"){
          this.products.sort(function(a,b){
            var time1 : any = new Date(a[1].dateTime);
            var time2 : any = new Date(b[1].dateTime)
            return time2 - time1;
          });
          this.products.sort(function(a, b) {
            return parseFloat(b[1].price) - parseFloat(a[1].price);
          });
          this.printOutProductList();
        }
        if(!time && price == "Lowest to Highest"){
          this.products.sort(function(a, b) {
            return parseFloat(a[1].price) - parseFloat(b[1].price);
          });
          this.printOutProductList();
        }
        if(!time && price == "Highest to Lowest"){
          this.products.sort(function(a, b) {
            return parseFloat(b[1].price) - parseFloat(a[1].price);
          });
          this.printOutProductList();
        }
        this.printOutProductList();
    }
  }

  //get product list by category get from the home page from the firebase
  async getProductListFromFireBase(category){
    this.spinnerDialog.show();
    if(category == "All"){
      await Promise.resolve(this.dbService.getAllProducts()).then(value=>{
        if(value[0] == null || value[0] == undefined){
          this.spinnerDialog.hide();
        this.noProductinCategories = true;
        }
        else{

        this.products = Object.entries(value[0]);
        this.noProductinCategories = false;
        this.spinnerDialog.hide();
        }
      });
      this.printOutProductList();
    }else{
    await Promise.resolve(this.dbService.getProductListforEachCategories(category)).then(value=> {
      if(value[0] == null || value[0] == undefined){
        this.spinnerDialog.hide();
        this.noProductinCategories = true;
      }else
      {
        this.noProductinCategories = false;
        this.products = Object.entries(value[0]);
        console.log(this.products);
        this.spinnerDialog.hide();
      }
      this.printOutProductList();
    });
    }
  }

  //go to the product page when user press one of the product by passing the product id
  goToProductPage(pid)
  {
    let navigationExtras: NavigationExtras = {
      queryParams:{
        pid: pid
      }
    }
    this.router.navigate(['product'],navigationExtras);
  }

  //open location filter page as a modal
  //get the option selected by the user and sort/filter the product list
  async openLocationModal() {
  const modal = await this.modalController.create({
    component: ModalPage,
    cssClass: 'my-custom-modal-css'
  });
  modal.onDidDismiss().then(data => {
    this.location = Object.values(data.data);
    this.sortBy(null,this.location,null);
  });
  await modal.present();
}

//open time and price filter page as a modal
  //get the option selected by the user and sort/filter the product list
  async openFilterModal() {
    const modal = await this.modalController.create({
      component: FilterModalPage,
      cssClass: 'my-custom-modal-css'
    });
    modal.onDidDismiss().then(data => {
      if(Object.values(data.data)[0] && !Object.values(data.data)[1]) {
        this.sortBy(null,this.location,Object.values(data.data)[0]);
      }
      if(!Object.values(data.data)[0] && Object.values(data.data)[1]){
        this.sortBy(Object.values(data.data)[1],this.location,null);
      }
      if(Object.values(data.data)[0] && Object.values(data.data)[1]){
        this.sortBy(Object.values(data.data)[1],this.location,Object.values(data.data)[0]);
      }
    });
    await modal.present();
  }

//show alert when user click the categories tab
//get the option selected by the user and change the product list
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

  //for the heart icon
  //when user click the heart icon, if the user haven't login, ask user to login
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

  //when user click the heart icon, add or delete the product from the likedProduct 
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
      var index = this.likedProductarray.indexOf(pid);
        if (index > -1) {
          this.likedProductarray.splice(index, 1);
        }
        // this.likedProductarray.splice(this.likedProductarray.indexOf(pid), 1 );
        this.dbService.addToCurrentUserLikedProduct(this.uid, this.likedProductarray);
        col.buttonColor = "";
        this.presentToast('Removed from my favourite list');
      }
    }
  }

  //filter function for search bar
  getProductsBasedonSearchBar(ev){
    this.val = ev.target.value;
    if(this.val && this.val.trim() !== ''){
    this.products = this.products.filter(product =>{
      return product[1].postName.toLowerCase().indexOf(this.val.toLowerCase()) > -1;
    });
    this.array = [[],[]];
    this.printOutProductList();
    }
    else{
      this.getCategoriesFromHomePage();
    }
  }

  //toast when user click the heart icon of the product
  async presentToast(msg) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000
      });
      toast.present();
    }

  //alert asking user to login
  async askusertoLogin(){
      const alert = await this.alertController.create({
        header: 'Fantastic, you found something you like',
        message: 'Please log-in, for the best experience.',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.navCtrl.navigateForward('swiped-tab/login');
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

  //go back to home page
  goToHomePage(){
    this.navCtrl.navigateBack('tabs/tab1');
  }

  ngOnInit() {
  }
}