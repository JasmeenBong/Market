import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../services/databases.service';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { FilterModalPage } from '../filter-modal/filter-modal.page';
var CategoriesPage = /** @class */ (function () {
    function CategoriesPage(route, router, dbService, modalController, alertController, navController) {
        this.route = route;
        this.router = router;
        this.dbService = dbService;
        this.modalController = modalController;
        this.alertController = alertController;
        this.navController = navController;
        this.array = [[], []];
        this.location = "Malaysia";
        this.getCategoriesFromHomePage();
    }
    CategoriesPage.prototype.getCategoriesFromHomePage = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            if (params && params.category) {
                _this.category = params.category;
                _this.getProductListFromFireBase(_this.category, _this.location, null, null);
            }
        });
    };
    CategoriesPage.prototype.getProductListFromFireBase = function (category, location, price, time) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve(this.dbService.getProductListforEachCategories(category)).then(function (value) {
                            _this.products = Object.entries(value[0]);
                            if (price == "Lowest to Highest") {
                                _this.products.sort(function (a, b) {
                                    return parseFloat(a[1].price) - parseFloat(b[1].price);
                                });
                            }
                            else if (price == "Highest to Lowest") {
                                _this.products.sort(function (a, b) {
                                    return parseFloat(b[1].price) - parseFloat(a[1].price);
                                });
                            }
                            else {
                                _this.products = _this.products;
                            }
                            if (time == "Oldest to Newest") {
                                _this.products.sort(function (a, b) {
                                    var time1 = new Date(a[1].dateTime);
                                    var time2 = new Date(b[1].dateTime);
                                    return time1 - time2;
                                });
                            }
                            else if (time == "Newest to Oldest") {
                                _this.products.sort(function (a, b) {
                                    var time1 = new Date(a[1].dateTime);
                                    var time2 = new Date(b[1].dateTime);
                                    return time2 - time1;
                                });
                            }
                            else {
                                _this.products = _this.products;
                            }
                            if (location == "Malaysia") {
                                var count = 0;
                                for (var row = 0; row < (_this.products.length / 2); row++) {
                                    _this.array[row] = [];
                                    for (var col = 0; col < 2; col++) {
                                        _this.array[row][col] = _this.products[count][1];
                                        _this.array[row][col].pid = _this.products[count][0];
                                        count++;
                                    }
                                }
                            }
                            else {
                                var count = 0;
                                for (var row = 0; row < (_this.products.length / 2); row++) {
                                    _this.array[row] = [];
                                    for (var col = 0; col < 2; col++) {
                                        if (_this.products[count][1].area == _this.location) {
                                            _this.array[row][col] = _this.products[count][1];
                                            _this.array[row][col].pid = _this.products[count][0];
                                            count++;
                                        }
                                    }
                                }
                            }
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
                            _this.getProductListFromFireBase(_this.category, _this.location, null, null);
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
                                _this.getProductListFromFireBase(_this.category, _this.location, Object.values(data.data)[0], null);
                            }
                            if (!Object.values(data.data)[0] && Object.values(data.data)[1]) {
                                _this.getProductListFromFireBase(_this.category, _this.location, null, Object.values(data.data)[1]);
                            }
                            if (Object.values(data.data)[0] && Object.values(data.data)[1]) {
                                _this.getProductListFromFireBase(_this.category, _this.location, Object.values(data.data)[0], Object.values(data.data)[1]);
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
                                        handler: function () {
                                            console.log('Confirm Cancel');
                                        }
                                    }, {
                                        text: 'Ok',
                                        handler: function (data) {
                                            _this.category = data;
                                            _this.array = [[], []];
                                            _this.getProductListFromFireBase(_this.category, _this.location, null, null);
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
            AlertController, NavController])
    ], CategoriesPage);
    return CategoriesPage;
}());
export { CategoriesPage };
//# sourceMappingURL=categories.page.js.map