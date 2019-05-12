import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { DatabaseService } from '../services/databases.service';
var FavouritePage = /** @class */ (function () {
    function FavouritePage(router, dbService) {
        this.router = router;
        this.dbService = dbService;
        this.uid = "";
        this.array = [[], []];
        this.likedProducts = [];
        this.db = firebase.database();
    }
    FavouritePage.prototype.checkUser = function () {
        var _this = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.uid = user.uid;
                _this.getAllDetails();
            }
            else {
                _this.router.navigateByUrl('tabs/tab5/login');
            }
        });
    };
    FavouritePage.prototype.getAllDetails = function () {
        var _this = this;
        this.users = firebase.database().ref('users/' + this.uid + '/likedProduct');
        this.users.on("value", function (snapshot) {
            for (var i = 0; i < Object.values(snapshot.val()).length; i++) {
                _this.likedProducts.push(Object.values(snapshot.val())[i]);
            }
            _this.getProducts = firebase.database().ref('posts/');
        });
    };
    FavouritePage.prototype.ngOnInit = function () {
        //this.getAllDetails();
    };
    FavouritePage.prototype.ionViewWillEnter = function () {
        if (this.uid == "") {
            this.checkUser();
        }
        else {
            //   this.getLikedPostsDetails();
            this.getAllDetails();
        }
    };
    FavouritePage.prototype.goToProductPage = function (pid) {
        var navigationExtras = {
            queryParams: {
                pid: pid
            }
        };
        this.router.navigate(['product'], navigationExtras);
    };
    FavouritePage = tslib_1.__decorate([
        Component({
            selector: 'app-favourite',
            templateUrl: './favourite.page.html',
            styleUrls: ['./favourite.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, DatabaseService])
    ], FavouritePage);
    return FavouritePage;
}());
export { FavouritePage };
//# sourceMappingURL=favourite.page.js.map