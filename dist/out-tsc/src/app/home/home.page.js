import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/databases.service';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
var HomePage = /** @class */ (function () {
    function HomePage(router, dbService, spinnerDialog) {
        this.router = router;
        this.dbService = dbService;
        this.spinnerDialog = spinnerDialog;
        this.array = [[], []];
        this.getCategoriesFromFireBase();
    }
    HomePage.prototype.getCategoriesFromFireBase = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerDialog.show();
                        return [4 /*yield*/, Promise.resolve(this.dbService.getCategory()).then(function (value) {
                                _this.categories = Object.values(value[0]);
                                _this.spinnerDialog.hide();
                                var count = 0;
                                for (var row = 0; row < (_this.categories.length / 3); row++) {
                                    for (var col = 0; col < 3; col++) {
                                        _this.array[row][col] = _this.categories[count];
                                        count++;
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
    HomePage.prototype.getProductsBasedonSearchBar = function (ev) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve(this.dbService.getAllProducts()).then(function (value) {
                            _this.products = Object.values(value[0]);
                        })];
                    case 1:
                        _a.sent();
                        this.val = ev.target.value;
                        if (this.val && this.val.trim() !== '') {
                            this.productList = this.products.filter(function (product) {
                                return product.postName.toLowerCase().indexOf(_this.val.toLowerCase()) > -1;
                            });
                        }
                        else {
                            this.productList = '';
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.goCategoriesPage = function (categoryName) {
        var navigationExtras = {
            queryParams: {
                category: categoryName
            }
        };
        this.router.navigate(['categories'], navigationExtras);
    };
    HomePage.prototype.ngOnInit = function () {
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, DatabaseService, SpinnerDialog])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map