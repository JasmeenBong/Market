import * as tslib_1 from "tslib";
//services for register, login, logout, and get user details
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import * as firebase from 'firebase/app';
var AuthenticateService = /** @class */ (function () {
    function AuthenticateService(googlePlus, platform, facebook) {
        this.googlePlus = googlePlus;
        this.platform = platform;
        this.facebook = facebook;
    }
    AuthenticateService.prototype.registerUser = function (value) {
        return new Promise(function (resolve, reject) {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    AuthenticateService.prototype.loginUser = function (value) {
        return new Promise(function (resolve, reject) {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    AuthenticateService.prototype.googleLogin = function () {
        var _this = this;
        //   const provider = new firebase.auth.GoogleAuthProvider();
        //
        //   firebase.auth().signInWithRedirect(provider).then( () => {
        //     firebase.auth().getRedirectResult().then( result => {
        //     // This gives you a Google Access Token.
        //     // You can use it to access the Google API.
        //     var token = result.credential.accessToken;
        //     // The signed-in user info.
        //     var user = result.user;
        //     console.log(token, user);
        //   }).catch(function(error) {
        //     // Handle Errors here.
        //     console.log(error.message);
        //   });
        // });
        return new Promise(function (resolve, reject) {
            _this.googlePlus.login({
                'webClientId': '859739031584-6ms3gn9hs1gu6lovpagbeg26vdn93g3h.apps.googleusercontent.com',
                'offline': true
            })
                .then(function (res) {
                var googleCredential = firebase.auth.GoogleAuthProvider
                    .credential(res.idToken);
                if (_this.platform.is('ios') || _this.platform.is("android") || _this.platform.is('mobileweb')) {
                    firebase.auth().signInWithCredential(googleCredential)
                        .then(function (response) {
                        console.log("Firebase successful sign in with Google " + JSON.stringify(response));
                        resolve(response);
                    });
                }
                else {
                    firebase.auth().signInWithRedirect(googleCredential)
                        .then(function (response) {
                        console.log("Firebase successful sign in with Google " + JSON.stringify(response));
                        resolve(response);
                    });
                }
            }, function (err) { return reject(err); });
        });
    };
    AuthenticateService.prototype.facebookLogin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.facebook.login(['email'])
                .then(function (response) {
                var facebookCredential = firebase.auth.FacebookAuthProvider
                    .credential(response.authResponse.accessToken);
                if (_this.platform.is('ios') || _this.platform.is("android") || _this.platform.is('mobileweb')) {
                    firebase.auth().signInWithCredential(facebookCredential)
                        .then(function (success) {
                        console.log("Firebase successful sign in with Facebook " + JSON.stringify(success));
                    });
                }
                else {
                    firebase.auth().signInWithRedirect(facebookCredential)
                        .then(function (success) {
                        console.log("Firebase successful sign in with Google " + JSON.stringify(success));
                    });
                }
            }, function (err) { return reject(err); });
        });
    };
    AuthenticateService.prototype.logoutUser = function () {
        return new Promise(function (resolve, reject) {
            if (firebase.auth().currentUser) {
                firebase.auth().signOut()
                    .then(function () {
                    console.log("LOG OUT");
                    resolve();
                }).catch(function (error) {
                    reject();
                });
            }
        });
    };
    AuthenticateService.prototype.userDetails = function () {
        return firebase.auth().currentUser;
    };
    ;
    AuthenticateService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [GooglePlus,
            Platform,
            Facebook])
    ], AuthenticateService);
    return AuthenticateService;
}());
export { AuthenticateService };
//# sourceMappingURL=authentication.service.js.map