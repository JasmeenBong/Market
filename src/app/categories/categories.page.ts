import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../services/databases.service';
import { NavigationExtras } from '@angular/router';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { FilterModalPage } from '../filter-modal/filter-modal.page';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  category;
  categories;
  products;
  array = [[],[]]
  names;

  constructor(private route: ActivatedRoute, private router: Router, private dbService : DatabaseService, private modalController: ModalController,
    private alertController: AlertController, private navController: NavController) {
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

  async getProductListFromFireBase(category){
  await Promise.resolve(this.dbService.getProductListforEachCategories(category)).then(value=> {
      this.products = Object.entries(value[0]);
      var count = 0;
      for(var row =0; row < (this.products.length/2); row++)
      {
        this.array[row] = [];
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

  async openLocationModal() {
  const modal = await this.modalController.create({
    component: ModalPage,
    cssClass: 'my-custom-modal-css'
  });
  modal.onDidDismiss().then(data => {

  });
  await modal.present();
}

  async openFilterModal() {
    const modal = await this.modalController.create({
      component: FilterModalPage,
      cssClass: 'my-custom-modal-css'
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
            handler: () => {
              console.log('Confirm Cancel');
            }
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

  goToHomePage(){
    this.navController.navigateBack('tabs/tab1');
  }

  ngOnInit() {
  }
}
