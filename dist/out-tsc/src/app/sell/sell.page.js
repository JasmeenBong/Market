import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../services/databases.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Camera } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase/app';
var SellPage = /** @class */ (function () {
    function SellPage(imagePicker, formBuilder, route, router, dbService, navCtrl, alertController, datePipe, camera) {
        this.imagePicker = imagePicker;
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.dbService = dbService;
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.datePipe = datePipe;
        this.camera = camera;
        //count how many image uploaded
        this.counter = 0;
        this.MalaysiaAreaList = [];
        this.regionList = [];
        this.areaList = [];
        //action (post Ad/Edit Ad)
        this.action = "";
        //store edited product id
        this.productId = "";
        //title for the page
        this.title = "";
        //validate selected category
        this.noCategory = true;
        //validate selected region
        this.noRegion = true;
        this.noArea = true;
        //store the Ad images
        this.images = [];
        this.ad_validation_messages = {
            'title': [
                { type: 'required', message: 'Ad title is required.' },
                { type: 'maxLength', message: 'Your title is too long. Maximum 60 characters.' }
            ],
            'details': [
                { type: 'required', message: 'Ad detail is required.' }
            ],
            'price': [
                { type: 'required', message: 'Please enter the price.' }
            ]
        };
    }
    SellPage.prototype.ngOnInit = function () {
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
        });
        this.initializeElement();
        this.getMalaysiaAreaListFromFirebase();
    };
    SellPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.checkUser();
        this.route.queryParams.subscribe(function (params) {
            if (params && params.action) {
                _this.action = params.action;
            }
            if (params && params.pid) {
                _this.productId = params.pid;
            }
        });
        if (this.action == "edit") {
            this.title = "Edit My Ad";
            this.getProductList(this.productId);
        }
        else {
            this.title = "Post an Ad";
        }
    };
    SellPage.prototype.initializeElement = function () {
        this.postTitle = document.getElementById("postTitle");
        this.postCategory = document.getElementById("selectedCategory");
        this.postBreed = document.getElementById("breed");
        this.postAge = document.getElementById("age");
        this.postWeight = document.getElementById("weight");
        this.postDetails = document.getElementById("details");
        this.postPrice = document.getElementById("price");
        this.postRegion = document.getElementById("selectedRegion");
        this.postArea = document.getElementById("selectedArea");
    };
    SellPage.prototype.getMalaysiaAreaListFromFirebase = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve(this.dbService.getMalaysiaAreaList()).then(function (value) {
                            _this.MalaysiaAreaList = Object.values(value[0]);
                            for (var i = 0; i < _this.MalaysiaAreaList.length; i++) {
                                _this.regionList[i] = _this.MalaysiaAreaList[i].region;
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SellPage.prototype.checkUser = function () {
        var _this = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.uid = user.uid;
                console.log(_this.uid);
            }
            else {
                _this.router.navigateByUrl('tabs/tab5/login');
            }
        });
    };
    SellPage.prototype.getProductList = function (pid) {
        var _this = this;
        Promise.resolve(this.dbService.getProductById(pid)).then(function (value) {
            _this.myAd = value[0];
            _this.images = Object.values(_this.myAd.images);
            _this.noCategory = false;
            _this.noRegion = false;
            _this.noArea = false;
            _this.counter = _this.images.length;
            _this.setValue();
        });
    };
    SellPage.prototype.setValue = function () {
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
    };
    SellPage.prototype.onCategoryChange = function (event) {
        if (event.target.value != "none") {
            this.noCategory = false;
        }
    };
    SellPage.prototype.onRegionChange = function (event) {
        if (event.target.value != "none") {
            this.noRegion = false;
        }
        this.getAreaList(event.target.value);
        this.postArea.value = "none";
    };
    SellPage.prototype.getAreaList = function (region) {
        for (var i = 0; i < this.MalaysiaAreaList.length; i++) {
            if (this.MalaysiaAreaList[i].region == region) {
                this.areaList = this.MalaysiaAreaList[i].area;
            }
        }
    };
    SellPage.prototype.onAreaChange = function (event) {
        if (event.target.value != "none") {
            this.noArea = false;
        }
    };
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
    SellPage.prototype.uploadImage = function () {
        var _this = this;
        this.camera.getPicture({
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: this.camera.DestinationType.DATA_URL
        }).then(function (img) {
            if (img != "") {
                _this.images.push('data:image/jpeg;base64,' + img);
                _this.counter++;
            }
        }, function (err) {
            console.log(err);
        });
    };
    SellPage.prototype.takePicture = function () {
        var _this = this;
        this.camera.getPicture({
            targetWidth: 512,
            targetHeight: 512,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.DATA_URL
        }).then(function (img) {
            if (img != "") {
                _this.images.push('data:image/jpeg;base64,' + img);
                _this.counter++;
            }
        }, function (err) {
            console.log(err);
        });
    };
    SellPage.prototype.cancelImage = function (index) {
        this.images.splice(index, 1);
        this.counter = this.counter - 1;
        console.log("image removed");
    };
    SellPage.prototype.savePost = function () {
        if (this.postBreed.value == "") {
            this.postBreed.value = "not set";
        }
        if (this.postAge.value == "") {
            this.postAge.value = "not set";
        }
        if (this.postWeight.value == "") {
            this.postWeight.value = "not set";
        }
        if (this.action == "edit") {
            this.dbService.updateAd(this.images, this.postTitle.value, this.postCategory.value, this.postBreed.value, this.postAge.value, this.postWeight.value, this.postDetails.value, this.postPrice.value, this.postRegion.value, this.postArea.value, this.productId);
            this.presentAlert("Successfully updating your Ad details! Please refresh the page.");
            this.router.navigateByUrl("/tabs/tab2");
        }
        else {
            var currDate = new Date();
            var formatedDate = this.datePipe.transform(currDate, 'yyyy-MM-dd hh:mm');
            this.dbService.addNewAd(this.images, this.postTitle.value, this.postCategory.value, this.postBreed.value, this.postAge.value, this.postWeight.value, this.postDetails.value, this.postPrice.value, this.postRegion.value, this.postArea.value, formatedDate, this.uid);
            this.presentAlert("Successfully adding your new Ad! Please refresh the page.");
            this.router.navigateByUrl("/tabs/tab2");
        }
    };
    SellPage.prototype.presentAlert = function (msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Success',
                            message: msg,
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SellPage.prototype.goback = function () {
        this.navCtrl.navigateBack("/tabs/tab2");
    };
    SellPage = tslib_1.__decorate([
        Component({
            selector: 'app-sell',
            templateUrl: './sell.page.html',
            styleUrls: ['./sell.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ImagePicker,
            FormBuilder,
            ActivatedRoute,
            Router,
            DatabaseService,
            NavController,
            AlertController,
            DatePipe,
            Camera])
    ], SellPage);
    return SellPage;
}());
export { SellPage };
//# sourceMappingURL=sell.page.js.map