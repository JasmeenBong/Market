import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../services/databases.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Camera } from '@ionic-native/camera/ngx';

import * as firebase from 'firebase/app';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {
  //count how many image uploaded
  counter: number = 0;
  //store malaysia area list from firebabse
  MalaysiaAreaList = [];
  //store the region 
  regionList = [];
  //store area list based on region
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
  //validate selected arera
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
  selectedArea;
  permission = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dbService : DatabaseService,
    private navCtrl : NavController,
    private alertController : AlertController,
    private datePipe : DatePipe,
    private camera : Camera,
    private imagePicker : ImagePicker
  ) { }

  ngOnInit() {
    //initialize formGroup
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
        ])),
        category: new FormControl(),
        selectedRegion: new FormControl(),
        selectedArea: new FormControl()
      }
    );

    this.initializeElement();
    this.getMalaysiaAreaListFromFirebase();
  }

  ionViewWillEnter(){
    //ensure user is logged in
    this.checkUser();
    this.route.queryParams.subscribe(params=> {
      if(params && params.action){
        this.action = params.action;
      }

      if(params && params.pid){
        this.productId = params.pid;
      }
    });

    //set the page title based on the action
    if(this.action == "edit"){
      this.title = "Edit My Ad";
      this.getProductDetails(this.productId);
    }
    else {
      this.title = "Post an Ad";
    }
  }

  //initialize validation messages
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

  //initialize the html element
  initializeElement(){
    this.postTitle = (<HTMLInputElement>document.getElementById("postTitle"));
    this.postCategory = (<HTMLSelectElement>document.getElementById("selectedCategory"));
    this.postBreed = (<HTMLInputElement>document.getElementById("breed"));
    this.postAge = (<HTMLInputElement>document.getElementById("age"));
    this.postWeight = (<HTMLInputElement>document.getElementById("weight"));
    this.postDetails = (<HTMLInputElement>document.getElementById("details"));
    this.postPrice = (<HTMLInputElement>document.getElementById("price"));
    this.postRegion = (<HTMLSelectElement>document.getElementById("selectedRegion"));
  }

  //get the malaysia area list from firebase
  async getMalaysiaAreaListFromFirebase(){
    await Promise.resolve(this.dbService.getMalaysiaAreaList()).then(value=> {
        this.MalaysiaAreaList = Object.values(value[0]);
        for(var i = 0; i < this.MalaysiaAreaList.length; i ++){
          this.regionList[i] = this.MalaysiaAreaList[i].region;
        }
    });
  }

  //check user is logged in
  checkUser(){
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        this.uid = user.uid;
      }
      else {
        this.navCtrl.navigateForward('tabs/tab5/login');
      }
    });
  }

  //get the product details from database if it is edit product action
  getProductDetails(pid){
    Promise.resolve(this.dbService.getProductById(pid)).then(value=> {
       this.myAd = value[0];
       this.images = this.myAd.images;
       this.noCategory = false;
       this.noRegion = false;
       this.noArea = false;
       this.counter = this.images.length;

       this.setValue();
     });
  }

  //set the product details from database to the form
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
    this.selectedArea = this.myAd.area;
  }


  onCategoryChange(event: any){
    if(event.target.value != "none"){
      this.noCategory = false;
    }
  }

  onRegionChange(){
    if(this.postRegion.value != "none"){
      this.noRegion = false;
    }

    this.getAreaList(this.postRegion.value);
  }

  getAreaList(region){
    for(var i = 0; i < this.MalaysiaAreaList.length; i ++){
      if(this.MalaysiaAreaList[i].region == region){
        this.areaList = this.MalaysiaAreaList[i].area;
      }
    }
  }

  areaChange(area){
    if(area != "none"){
      this.noArea = false;
      console.log(area);
    }
  }

  uploadImage(){
    let options : ImagePickerOptions = {
      maximumImagesCount : 3,
      width: 500,
      height: 500,
      outputType: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++){
        this.images.push('data:image/jpeg;base64,' + results[i]);
        this.counter ++;
      }
    }, (err) => {
      alert(err);
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

  cancelImage(image){
    var index = this.images.indexOf(image);
    if(index != -1){
      this.images.splice(index, 1); 
    }
    this.counter = this.counter - 1;
    console.log("image removed");
  }

  async savePost(value){
    if(value.selectedArea == "none"){
      const alert = await this.alertController.create({
        header: 'Invalid',
        message: 'You have not selected your area.',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    else {
      console.log(value);
      if(this.postBreed.value == ""){
        this.postBreed.value = "not set";
      }
  
      if(this.postAge.value == ""){
        this.postAge.value = 0;
      }
  
      if(this.postWeight.value == ""){
        this.postWeight.value = 0;
      }
  
      if(this.action == "edit"){
        this.dbService.updateAd(this.images, value.title, value.category,
          this.postBreed.value, this.postAge.value, this.postWeight.value, value.details,
          value.price, value.selectedRegion, value.selectedArea, this.productId);
  
          this.presentAlert("Successfully updating your Ad details! Please refresh the page.");
          this.navCtrl.navigateForward("/tabs/tab2");
      }
      else {
        let currDate = new Date();
        let formatedDate = this.datePipe.transform(currDate, 'yyyy-MM-dd hh:mm');
  
        this.dbService.addNewAd(this.images, value.title, value.category,
          this.postBreed.value, this.postAge.value, this.postWeight.value, value.details, value.price, 
          value.selectedRegion, value.selectedArea, formatedDate, this.uid);
  
          this.presentAlert("Successfully adding your new Ad! Please refresh the page.");
          this.navCtrl.navigateForward("/tabs/tab2");
      }
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
