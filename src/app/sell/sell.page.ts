import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../services/databases.service';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Camera } from '@ionic-native/camera/ngx';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {

  //options for upload image on Android
  options: any;
  //count how many image uploaded
  counter: number = 0;
  MalaysiaAreaList = [];
  regionList = [];
  areaList = [];
  //action (post Ad/Edit Ad)
  action: any = "";
  //store edited product id
  productId: any = "";
  //title for the page
  title: any = "";
  //form group
  validatePost: FormGroup;
  //validate selected category
  noCategory: any = true;
  //validate selected region
  noRegion: any = true;


  noArea : any = true;
  //store the user id for seller
  uid : any;
  //store the Ad images
  images = [];
  //store the Ad information from database
  //when the seller edit their Ad
  myAd;
  //get the HTMLElement
  postTitle : any;
  postCategory : any;
  postBreed : any;
  postAge : any;
  postWeight : any;
  postDetails : any;
  postPrice : any;
  postArea : any;
  postRegion : any;

  constructor(
    private imagePicker: ImagePicker,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dbService : DatabaseService,
    private navCtrl : NavController,
    private alertController : AlertController,
    private datePipe : DatePipe,
    private camera : Camera
  ) { }

  ngOnInit() {
      this.validatePost = this.formBuilder.group({
        title: new FormControl('', Validators.compose([
          Validators.required,
          Validators.maxLength(60)
        ])),
        details: new FormControl('', Validators.compose([
          Validators.required
        ])),
        price: new FormControl('', Validators.compose([
          Validators.required
        ]))
      }
    );

    this.initializeElement();
    this.getMalaysiaAreaListFromFirebase();
  }

  ionViewWillEnter(){
    this.checkUser();
    this.route.queryParams.subscribe(params=> {
      if(params && params.action){
        this.action = params.action;
      }

      if(params && params.pid){
        this.productId = params.pid;
      }
    });

    if(this.action == "edit"){
      this.title = "Edit My Ad";
      this.getProductList(this.productId);
    }
    else {
      this.title = "Post an Ad";
    }
  }

  ad_validation_messages = {
    'title': [
      {type: 'required', message: 'Ad title is required.'},
      {type: 'maxLength', message: 'Your title is too long. Maximum 60 characters.'}
    ],
    'details': [
      {type: 'required', message: 'Ad detail is required.'}
    ],
    'price': [
      { type: 'required', message: 'Please enter the price.'}
    ]
  };

  initializeElement(){
    this.postTitle = (<HTMLInputElement>document.getElementById("postTitle"));
    this.postCategory = (<HTMLSelectElement>document.getElementById("selectedCategory"));
    this.postBreed = (<HTMLInputElement>document.getElementById("breed"));
    this.postAge = (<HTMLInputElement>document.getElementById("age"));
    this.postWeight = (<HTMLInputElement>document.getElementById("weight"));
    this.postDetails = (<HTMLInputElement>document.getElementById("details"));
    this.postPrice = (<HTMLInputElement>document.getElementById("price"));
    this.postRegion = (<HTMLSelectElement>document.getElementById("selectedRegion"));
    this.postArea = (<HTMLSelectElement>document.getElementById("selectedArea"));
  }

  async getMalaysiaAreaListFromFirebase(){
    await Promise.resolve(this.dbService.getMalaysiaAreaList()).then(value=> {
        this.MalaysiaAreaList = Object.values(value[0]);
        for(var i = 0; i < this.MalaysiaAreaList.length; i ++){
          this.regionList[i] = this.MalaysiaAreaList[i].region;
        }
    });
  }

  checkUser(){
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        this.uid = user.uid;
        console.log(this.uid);
      }
      else {
        this.router.navigateByUrl('tabs/tab5/login');
      }
    });
  }

  getProductList(pid){
    Promise.resolve(this.dbService.getProductById(pid)).then(value=> {
       this.myAd = value[0];
       this.images = Object.values(this.myAd.images);
       this.noCategory = false;
       this.noRegion = false;
       this.noArea = false;
       this.counter = this.images.length;

       this.setValue();
     });
  }

  setValue(){
    this.postTitle.value = this.myAd.postName;
    this.postCategory.value = this.myAd.postCategory;
    this.postBreed.value = this.myAd.breed;
    this.postAge.value = this.myAd.age;
    this.postWeight.value = this.myAd.weight;
    this.postDetails.value = this.myAd.description;
    this.postPrice.value = this.myAd.price;
    this.postRegion.value = this.myAd.region;
    this.getAreaList(this.myAd.region);
    this.postArea.value = this.myAd.area;
  }

  onCategoryChange(event: any){
    if(event.target.value != "none"){
      this.noCategory = false;
    }
  }

  onRegionChange(event: any){
    if(event.target.value != "none"){
      this.noRegion = false;
    }

    this.getAreaList(event.target.value);
    this.postArea.value = "none";
  }

  getAreaList(region){
    for(var i = 0; i < this.MalaysiaAreaList.length; i ++){
      if(this.MalaysiaAreaList[i].region == region){
        this.areaList = this.MalaysiaAreaList[i].area;
      }
    }
  }

  onAreaChange(event: any){
    if(event.target.value != "none"){
      this.noArea = false;
    }
  }

  // uploadImage() {
  //   this.options = {
  //     // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
  //     // selection of a single image, the plugin will return it.
  //     //maximumImagesCount: 3,
  //
  //     // max width and height to allow the images to be.  Will keep aspect
  //     // ratio no matter what.  So if both are 800, the returned image
  //     // will be at most 800 pixels wide and 800 pixels tall.  If the width is
  //     // 800 and height 0 the image will be 800 pixels wide if the source
  //     // is at least that wide.
  //     width: 200,
  //     //height: 200,
  //
  //     // quality of resized image, defaults to 100
  //     quality: 25,
  //
  //     // output type, defaults to FILE_URIs.
  //     // available options are
  //     // window.imagePicker.OutputType.FILE_URI (0) or
  //     // window.imagePicker.OutputType.BASE64_STRING (1)
  //     outputType: 1
  //   };
  //   this.imagePicker.getPictures(this.options).then((results) => {
  //     for (var i = 0; i < results.length; i++) {
  //       console.log(results[i]);
  //       this.images.push('data:image/jpeg;base64,' + results[i]);
  //       this.counter ++;
  //     }
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

  uploadImage(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL

     }).then((img) => {

       if(img!=""){
         this.images.push('data:image/jpeg;base64,' + img);
         this.counter ++;
       }

     }, (err) => {
       console.log(err);
     });
  }

  takePicture(){
     this.camera.getPicture({
     targetWidth:512,
     targetHeight:512,
     correctOrientation:true,
     sourceType: this.camera.PictureSourceType.CAMERA,
     destinationType: this.camera.DestinationType.DATA_URL
       }).then((img) => {
         if(img!=""){
           this.images.push('data:image/jpeg;base64,' + img);
           this.counter ++;
         }
      }, (err) => {
        console.log(err);
      });
  }

  cancelImage(index){
    this.images.splice(index, 1);
    this.counter = this.counter - 1;
    console.log("image removed");
  }

  savePost(){
    if(this.postBreed.value == ""){
      this.postBreed.value = "not set";
    }

    if(this.postAge.value == ""){
      this.postAge.value = "not set";
    }

    if(this.postWeight.value == ""){
      this.postWeight.value = "not set";
    }

    if(this.action == "edit"){
      this.dbService.updateAd(this.images, this.postTitle.value, this.postCategory.value,
        this.postBreed.value, this.postAge.value, this.postWeight.value, this.postDetails.value,
        this.postPrice.value, this.postRegion.value, this.postArea.value, this.productId);

        this.presentAlert("Successfully updating your Ad details! Please refresh the page.");
        this.router.navigateByUrl("/tabs/tab2");
    }
    else {
      let currDate = new Date();
      let formatedDate = this.datePipe.transform(currDate, 'yyyy-MM-dd hh:mm');

      this.dbService.addNewAd(this.images, this.postTitle.value, this.postCategory.value,
        this.postBreed.value, this.postAge.value, this.postWeight.value, this.postDetails.value,
        this.postPrice.value, this.postRegion.value, this.postArea.value, formatedDate, this.uid);

        this.presentAlert("Successfully adding your new Ad! Please refresh the page.");
        this.router.navigateByUrl("/tabs/tab2");
    }
  }

  async presentAlert(msg) {

    const alert = await this.alertController.create({
      header: 'Success',
      message: msg,
      buttons: ['OK']
    });
    return await alert.present();
  }

  goback(){
    this.navCtrl.navigateBack("/tabs/tab2");
  }

}
