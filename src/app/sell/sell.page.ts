import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Area } from './area';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../services/databases.service';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {

  imageResponse: any;
  //options for upload image on Android
  options: any;
  //count how many image uploaded
  counter: number = 0;
  //option for Area
  areaOptions = [];
  //action (post Ad/Edit Ad)
  action: any = "";
  //store edited product id
  productId: any = "";
  //title for the page
  title: any = "";
  //form group
  validatePost: FormGroup;
  //validate image uploaded
  noImage: any = true;
  //validate selected category
  noCategory: any = true;
  //validate selected region
  noRegion: any = true;
  //validate selected area
  noArea: any = true;
  uid : any;

  constructor(
    private imagePicker: ImagePicker,
    private formBuilder: FormBuilder,
    private area: Area,
    private route: ActivatedRoute,
    private router: Router,
    private dbService : DatabaseService,
    private navCtrl : NavController
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
    }
    else {
      this.title = "Post an Ad";
    }
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

  onCategoryChange(event: any){
    if(event.target.value != "none"){
      this.noCategory = false;
    }
  }

  onRegionChange(event: any){
    if(event.target.value != "none"){
      this.noRegion = false;
      this.areaOptions = this.area.getArea(event.target.value);
    }
  }

  onAreaChange(event: any){
    if(event.target.value != "none"){
      this.noArea = false;
    }
  }

  uploadImage() {
    this.options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      //maximumImagesCount: 3,

      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 200,
      //height: 200,

      // quality of resized image, defaults to 100
      quality: 25,

      // output type, defaults to FILE_URIs.
      // available options are
      // window.imagePicker.OutputType.FILE_URI (0) or
      // window.imagePicker.OutputType.BASE64_STRING (1)
      outputType: 1
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
      }

      this.counter += 1;
      this.noImage = false;
    }, (err) => {
      alert(err);
    });
  }

  // savePost(value){
  //check first post ad or save ad
  //for posting Ad
  // get date and time
  // get every data and add to database
  //for edit
  //update to database
  // go to my ad page
  // }

  //getDateTime function

  //deleteUploadedImg

  goback(){
    this.navCtrl.navigateBack("");
  }

}
