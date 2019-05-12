import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../services/databases.service';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase/app';
var MyProductPage = /** @class */ (function () {
    function MyProductPage(route, router, dbService, alertController) {
        this.route = route;
        this.router = router;
        this.dbService = dbService;
        this.alertController = alertController;
        this.array = [[], []];
        this.uid = "";
        this.noProduct = false;
    }
    MyProductPage.prototype.ngOnInit = function () {
    };
    MyProductPage.prototype.ionViewWillEnter = function () {
        if (this.uid == "") {
            this.checkUser();
        }
        else {
            this.getMyPostedAds(this.uid);
        }
    };
    MyProductPage.prototype.checkUser = function () {
        var user = firebase.auth().currentUser;
        if (!user) {
            this.router.navigateByUrl('tabs/tab5/login');
        }
        else {
            this.uid = user.uid;
            this.getMyPostedAds(this.uid);
        }
    };
    MyProductPage.prototype.getMyPostedAds = function (uid) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve(this.dbService.getProductByOwner(uid)).then(function (value) {
                            if (value[0] == null || value[0] == undefined) {
                                _this.noProduct = true;
                            }
                            else {
                                _this.products = Object.entries(value[0]);
                                console.log(value);
                                var count = 0;
                                for (var row = 0; row < (_this.products.length / 2); row++) {
                                    for (var col = 0; col < 2; col++) {
                                        _this.array[row][col] = _this.products[count][1];
                                        _this.array[row][col].pid = _this.products[count][0];
                                        count++;
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
    MyProductPage.prototype.postNewAd = function () {
        var navigationExtras = {
            queryParams: {
                action: "post new"
            }
        };
        this.router.navigate(['sell'], navigationExtras);
    };
    MyProductPage.prototype.viewProduct = function (pid) {
        var navigationExtras = {
            queryParams: {
                pid: pid
            }
        };
        this.router.navigate(['product'], navigationExtras);
    };
    MyProductPage.prototype.editPost = function (pid) {
        var navigationExtras = {
            queryParams: {
                action: "edit",
                pid: pid
            }
        };
        this.router.navigate(['sell'], navigationExtras);
    };
    MyProductPage.prototype.refreshPage = function () {
        this.getMyPostedAds(this.uid);
        console.log("refreshed");
    };
    MyProductPage.prototype.deletePost = function (pid) {
        this.dbService.deleteAd(pid);
        this.presentAlert("Successfully deleted! Please refresh the page.");
    };
    MyProductPage.prototype.presentAlert = function (msg) {
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
    MyProductPage = tslib_1.__decorate([
        Component({
            selector: 'app-my-product',
            templateUrl: './my-product.page.html',
            styleUrls: ['./my-product.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            Router,
            DatabaseService,
            AlertController])
    ], MyProductPage);
    return MyProductPage;
}());
export { MyProductPage };
//# sourceMappingURL=my-product.page.js.map