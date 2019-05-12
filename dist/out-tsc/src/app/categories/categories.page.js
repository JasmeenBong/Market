import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../services/databases.service';
import { ModalController, AlertController, NavController, ToastController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { FilterModalPage } from '../filter-modal/filter-modal.page';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import * as firebase from 'firebase/app';
var CategoriesPage = /** @class */ (function () {
    function CategoriesPage(route, router, dbService, modalController, alertController, navController, spinnerDialog, toastController) {
        this.route = route;
        this.router = router;
        this.dbService = dbService;
        this.modalController = modalController;
        this.alertController = alertController;
        this.navController = navController;
        this.spinnerDialog = spinnerDialog;
        this.toastController = toastController;
        this.array = [[], []];
        this.location = "Malaysia";
        this.likedProductarray = new Array();
        this.getCategoriesFromHomePage();
    }
    CategoriesPage.prototype.getCategoriesFromHomePage = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            if (params && params.category) {
                _this.category = params.category;
                _this.getProductListFromFireBase(_this.category);
            }
        });
    };
    CategoriesPage.prototype.checkCurrentUserWithoutLogin = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = firebase.auth().currentUser;
                        if (!user) return [3 /*break*/, 2];
                        this.uid = user.uid;
                        return [4 /*yield*/, Promise.resolve(this.dbService.getCurrentUser(this.uid)).then(function (value) {
                                _this.userInfo = value[0];
                                _this.likedProductarray = Object.values(_this.userInfo.likedProduct);
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CategoriesPage.prototype.printOutProductList = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var count, row, col;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkCurrentUserWithoutLogin()];
                    case 1:
                        _a.sent();
                        count = 0;
                        for (row = 0; row < (this.products.length / 2); row++) {
                            this.array[row] = [];
                            for (col = 0; col < 2; col++) {
                                if (!this.likedProductarray.length) {
                                    this.array[row][col] = this.products[count][1];
                                    this.array[row][col].pid = this.products[count][0];
                                    this.array[row][col].buttonColor = '';
                                    console.log(this.array);
                                    count++;
                                }
                                else {
                                    if (this.likedProductarray.includes(this.products[count][0])) {
                                        this.array[row][col] = this.products[count][1];
                                        this.array[row][col].pid = this.products[count][0];
                                        this.array[row][col].buttonColor = 'danger';
                                        console.log(this.array);
                                        count++;
                                    }
                                    else {
                                        this.array[row][col] = this.products[count][1];
                                        this.array[row][col].pid = this.products[count][0];
                                        this.array[row][col].buttonColor = '';
                                        console.log(this.array);
                                        count++;
                                    }
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CategoriesPage.prototype.sortByTime = function (time) {
        if (time == "Oldest to Newest") {
            this.products.sort(function (a, b) {
                var time1 = new Date(a[1].dateTime);
                var time2 = new Date(b[1].dateTime);
                return time1 - time2;
            });
        }
        else if (time == "Newest to Oldest") {
            this.products.sort(function (a, b) {
                var time1 = new Date(a[1].dateTime);
                var time2 = new Date(b[1].dateTime);
                return time2 - time1;
            });
        }
        else {
            this.products = this.products;
        }
        this.printOutProductList();
    };
    CategoriesPage.prototype.sortByPrice = function (price) {
        if (price == "Lowest to Highest") {
            this.products.sort(function (a, b) {
                return parseFloat(a[1].price) - parseFloat(b[1].price);
            });
        }
        else if (price == "Highest to Lowest") {
            this.products.sort(function (a, b) {
                return parseFloat(b[1].price) - parseFloat(a[1].price);
            });
        }
        else {
            this.products = this.products;
        }
        this.printOutProductList();
    };
    CategoriesPage.prototype.sortByLocation = function () {
        if (this.location == "Malaysia") {
            this.printOutProductList();
        }
        else {
            var count = 0;
            for (var row = 0; row < (this.products.length / 2); row++) {
                this.array[row] = [];
                for (var col = 0; col < 2; col++) {
                    if (this.products[count][1].area == this.location) {
                        this.array[row][col] = this.products[count][1];
                        this.array[row][col].pid = this.products[count][0];
                        count++;
                    }
                }
            }
        }
    };
    CategoriesPage.prototype.getProductListFromFireBase = function (category) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerDialog.show();
                        return [4 /*yield*/, Promise.resolve(this.dbService.getProductListforEachCategories(category)).then(function (value) {
                                _this.products = Object.entries(value[0]);
                                setTimeout(function () {
                                    _this.spinnerDialog.hide();
                                }, 5000);
                                _this.printOutProductList();
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CategoriesPage.prototype.goToProductPage = function (pid) {
        var navigationExtras = {
            queryParams: {
                pid: pid
            }
        };
        this.router.navigate(['product'], navigationExtras);
    };
    CategoriesPage.prototype.openLocationModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: ModalPage,
                            cssClass: 'my-custom-modal-css'
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            _this.location = Object.values(data.data);
                            _this.sortByLocation();
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CategoriesPage.prototype.openFilterModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: FilterModalPage,
                            cssClass: 'my-custom-modal-css'
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            if (Object.values(data.data)[0] && !Object.values(data.data)[1]) {
                                _this.sortByPrice(Object.values(data.data)[0]);
                            }
                            if (!Object.values(data.data)[0] && Object.values(data.data)[1]) {
                                _this.sortByTime(Object.values(data.data)[1]);
                            }
                            if (Object.values(data.data)[0] && Object.values(data.data)[1]) {
                                _this.sortByPrice(Object.values(data.data)[0]);
                                _this.sortByTime(Object.values(data.data)[1]);
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CategoriesPage.prototype.openAlert = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var inputs, i, alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inputs = [];
                        return [4 /*yield*/, Promise.resolve(this.dbService.getCategory()).then(function (value) {
                                _this.categories = Object.values(value[0]);
                            })];
                    case 1:
                        _a.sent();
                        for (i = 0; i < this.categories.length; i++) {
                            inputs.push({ name: this.categories[i].categoryName, type: 'radio', label: this.categories[i].categoryName, value: this.categories[i].categoryName });
                        }
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Please select a category',
                                inputs: inputs,
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                    }, {
                                        text: 'Ok',
                                        handler: function (data) {
                                            _this.category = data;
                                            _this.array = [[], []];
                                            _this.getProductListFromFireBase(_this.category);
                                        }
                                    }
                                ]
                            })];
                    case 2:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CategoriesPage.prototype.checkCurrentUser = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = firebase.auth().currentUser;
                        if (!!user) return [3 /*break*/, 1];
                        this.askusertoLogin();
                        return [3 /*break*/, 3];
                    case 1:
                        this.uid = user.uid;
                        return [4 /*yield*/, Promise.resolve(this.dbService.getCurrentUser(this.uid)).then(function (value) {
                                _this.userInfo = value[0];
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoriesPage.prototype.addtoLikedProduct = function (pid, col) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkCurrentUser()];
                    case 1:
                        _a.sent();
                        if (this.userInfo) {
                            this.likedProductarray = Object.values(this.userInfo.likedProduct);
                            if (!this.likedProductarray.includes(pid)) {
                                this.likedProductarray.push(pid);
                                this.dbService.addToCurrentUserLikedProduct(this.uid, this.likedProductarray);
                                col.buttonColor = "danger";
                                this.presentToast('Added to my favourite list');
                            }
                            else {
                                this.likedProductarray.splice(this.likedProductarray.indexOf(pid), 1);
                                this.dbService.addToCurrentUserLikedProduct(this.uid, this.likedProductarray);
                                col.buttonColor = "";
                                this.presentToast('Removed from my favourite list');
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CategoriesPage.prototype.presentToast = function (msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: msg,
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
    CategoriesPage.prototype.askusertoLogin = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Fantastic, you found something you like',
                            message: 'Please log-in, for the best experience.',
                            buttons: [
                                {
                                    text: 'Ok',
                                    handler: function () {
                                        _this.router.navigateByUrl('tabs/tab5/login');
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    handler: function () {
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CategoriesPage.prototype.goToHomePage = function () {
        this.navController.navigateBack('tabs/tab1');
    };
    CategoriesPage.prototype.ngOnInit = function () {
    };
    CategoriesPage = tslib_1.__decorate([
        Component({
            selector: 'app-categories',
            templateUrl: './categories.page.html',
            styleUrls: ['./categories.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, DatabaseService, ModalController,
            AlertController, NavController, SpinnerDialog, ToastController])
    ], CategoriesPage);
    return CategoriesPage;
}());
export { CategoriesPage };
//# sourceMappingURL=categories.page.js.map