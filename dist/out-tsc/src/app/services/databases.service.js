import * as tslib_1 from "tslib";
//services for accessing the database
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
var DatabaseService = /** @class */ (function () {
    function DatabaseService() {
        this.db = firebase.database();
        this.storage = firebase.storage();
    }
    DatabaseService.prototype.addNewUser = function (id, email) {
        this.db.ref("users/").child(id).set({
            url: 'https://firebasestorage.googleapis.com/v0/b/market-9d038.appspot.com/o/user%2F4ff36bf59e.png?alt=media&token=84f87924-bd66-4a68-8f13-91754de78a71',
            name: '',
            location: '',
            email: email,
            gender: '',
            birthday: ''
        }).catch(function (error) {
            console.error(error);
        });
    };
    DatabaseService.prototype.addNewAd = function (images, title, category, breed, age, weight, details, price, region, area, dateTime, uid) {
        this.db.ref("posts/").set({
            age: age,
            area: area,
            breed: breed,
            dateTime: dateTime,
            description: details,
            images: images,
            postCategory: category,
            postName: title,
            price: price,
            region: region,
            status: "unsold",
            uid: uid,
            weight: weight
        }).catch(function (error) {
            console.error(error);
        });
    };
    DatabaseService.prototype.updateAd = function (images, title, category, breed, age, weight, details, price, region, area, pid) {
        this.db.ref("posts/").child(pid).update({
            age: age,
            area: area,
            breed: breed,
            description: details,
            images: images,
            postCategory: category,
            postName: title,
            price: price,
            region: region,
            weight: weight
        }).catch(function (error) {
            console.error(error);
        });
    };
    DatabaseService.prototype.getCurrentUser = function (id) {
        return this.db.ref("users/" + id).once('value').then(function (snapshot) { return snapshot.val(); }).then(function (value) { return [value]; });
    };
    DatabaseService.prototype.getCategory = function () {
        return this.db.ref("categories/").once('value').then(function (snapshot) { return snapshot.val(); }).then(function (value) { return [value]; });
    };
    DatabaseService.prototype.getProductListforEachCategories = function (category) {
        return this.db.ref("posts/").orderByChild('postCategory').equalTo(category).once('value').then(function (snapshot) { return snapshot.val(); }).then(function (value) { return [value]; });
    };
    DatabaseService.prototype.getAllProducts = function () {
        return this.db.ref("posts/").once('value').then(function (snapshot) { return snapshot.val(); }).then(function (value) { return [value]; });
    };
    DatabaseService.prototype.getProductById = function (pid) {
        return this.db.ref("posts/" + pid).once('value').then(function (snapshot) { return snapshot.val(); }).then(function (value) { return [value]; });
    };
    DatabaseService.prototype.getProductByOwner = function (uid) {
        return this.db.ref("posts/").orderByChild('uid').equalTo(uid).once('value').then(function (snapshot) { return snapshot.val(); }).then(function (value) { return [value]; });
    };
    DatabaseService.prototype.getSellerImages = function (owner) {
        return this.db.ref("users/").orderByChild('name').equalTo(owner).once('value').then(function (snapshot) { return snapshot.val(); }).then(function (value) { return [value]; });
    };
    DatabaseService.prototype.getMalaysiaAreaList = function () {
        return this.storage.ref().child('json/malaysiaArea.json').getDownloadURL().then(function (downloadURL) { return downloadURL; }).then(function (value) { return [value]; });
    };
    DatabaseService.prototype.deleteAd = function (pid) {
        this.db.ref("posts/").child(pid).remove()
            .catch(function (error) {
            console.error(error);
        });
    };
    DatabaseService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], DatabaseService);
    return DatabaseService;
}());
export { DatabaseService };
//# sourceMappingURL=databases.service.js.map