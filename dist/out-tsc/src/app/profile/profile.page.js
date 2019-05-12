import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserArea } from '../profile/area';
import { Camera } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase/app';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, authService, router, area, camera, AlertController, ToastController, formBuilder) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.router = router;
        this.area = area;
        this.camera = camera;
        this.AlertController = AlertController;
        this.ToastController = ToastController;
        this.formBuilder = formBuilder;
        this.images = [];
        this.areaOptions = [];
        this.noRegion = true;
        this.noArea = true;
        this.enabled = false;
        this.validation_messages = {
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Please enter a valid email.' }
            ],
            'password': [
                { type: 'required', message: 'Password is required.' },
                { type: 'minLength', message: 'Password must be at least 8 characters long.' }
            ]
        };
    }
    ProfilePage.prototype.ngOnInit = function () {
    };
    ProfilePage.prototype.ionViewWillEnter = function () {
        this.fetchUser();
    };
    ProfilePage.prototype.fetchUser = function () {
        var user = firebase.auth().currentUser;
        if (user) {
            this.uid = user.uid;
            return firebase.database().ref('/users/' + this.uid).once('value').then(function (snapshot) {
                var username = (snapshot.val() && snapshot.val().name) || 'Anonymous';
                var pNumber = (snapshot.val() && snapshot.val().phoneNumber) || 'Anonymous';
                var birthday = (snapshot.val() && snapshot.val().birthday) || null;
                var location = (snapshot.val() && snapshot.val().location) || 'Anonymous';
                var gender = (snapshot.val() && snapshot.val().gender) || 'Anonymous';
                var url = (snapshot.val() && snapshot.val().url) || null;
                var area = (snapshot.val() && snapshot.val().area) || null;
                document.getElementById('profilePicture').setAttribute('src', url);
                document.getElementById('uname').value = username;
                document.getElementById('phoneNumber').value = pNumber;
                document.getElementById('birthDay').value = birthday;
                document.getElementById('gender').value = gender;
                document.getElementById('region').value = location;
                document.getElementById('selectedArea').value = area;
                return firebase.database().ref('location').once('value').then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var regions = document.createElement('ion-select-option');
                        var regionval = document.createTextNode(childSnapshot.val().region);
                        regions.appendChild(regionval);
                        document.getElementById('region').appendChild(regions);
                    });
                });
            });
        }
        else {
            this.router.navigateByUrl("tabs/tab5/login");
        }
    };
    ProfilePage.prototype.AccessGallery = function () {
        this.camera.getPicture({
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: this.camera.DestinationType.DATA_URL
        }).then(function (img) {
            if (img != "") {
                var reviewImage = 'data:image/jpeg;base64,' + img;
                document.getElementById('profilePicture').setAttribute('src', reviewImage);
            }
            else {
                var userId = firebase.auth().currentUser.uid;
                return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
                    var url = (snapshot.val() && snapshot.val().url);
                    document.getElementById('profilePicture').setAttribute('src', url);
                });
            }
        }, function (err) {
            console.log(err);
        });
    };
    ProfilePage.prototype.AccessCamera = function () {
        this.camera.getPicture({
            targetWidth: 512,
            targetHeight: 512,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.DATA_URL
        }).then(function (img) {
            if (img != "") {
                var reviewImage = 'data:image/jpeg;base64,' + img;
                document.getElementById('profilePicture').setAttribute('src', reviewImage);
            }
            else {
                var userId = firebase.auth().currentUser.uid;
                return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
                    var url = (snapshot.val() && snapshot.val().url);
                    document.getElementById('profilePicture').setAttribute('src', url);
                });
            }
        }, function (err) {
            console.log(err);
        });
    };
    ProfilePage.prototype.onRegionChange = function (event) {
        if (event.target.value != "none") {
            this.noRegion = false;
        }
        this.areaOptions = this.area.getArea(event.target.value);
        this.userArea.value = "none";
    };
    ProfilePage.prototype.onAreaChange = function (event) {
        if (event.target.value != "none") {
            this.noArea = false;
        }
    };
    ProfilePage.prototype.editProfile = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.AlertController.create({
                            header: 'Edit Profile',
                            message: 'Are you sure you want to update your details?',
                            buttons: [
                                {
                                    text: 'No',
                                    role: 'cancel',
                                }, {
                                    text: 'Yes',
                                    handler: function () {
                                        var userId = firebase.auth().currentUser.uid;
                                        var usersRef = firebase.database().ref().child('users/' + userId);
                                        usersRef.update({
                                            name: document.getElementById('uname').value,
                                            phoneNumber: document.getElementById('phoneNumber').value,
                                            birthday: document.getElementById('birthDay').value,
                                            gender: document.getElementById('gender').value,
                                            location: document.getElementById('region').value,
                                            area: document.getElementById('selectedArea').value,
                                            url: document.getElementById('profilePicture').getAttribute('src')
                                        });
                                        _this.presentToast();
                                        _this.enabled = false;
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfilePage.prototype.presentToast = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ToastController.create({
                            message: 'Your settings have been saved.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfilePage.prototype.changePassword = function () {
        this.router.navigateByUrl('change-password');
    };
    ProfilePage.prototype.logoutUser = function () {
        var _this = this;
        this.authService.logoutUser()
            .then(function (res) {
            _this.uid = "";
            _this.navCtrl.navigateBack('tabs/tab1');
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    ProfilePage = tslib_1.__decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.page.html',
            styleUrls: ['./profile.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AuthenticateService,
            Router,
            UserArea,
            Camera,
            AlertController,
            ToastController,
            FormBuilder])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.page.js.map