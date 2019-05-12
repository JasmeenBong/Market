import * as tslib_1 from "tslib";
//services for register, login, logout, and get user details
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
var AuthenticateService = /** @class */ (function () {
    function AuthenticateService(googlePlus, platform, facebook, router) {
        this.googlePlus = googlePlus;
        this.platform = platform;
        this.facebook = facebook;
        this.router = router;
    }
    AuthenticateService.prototype.registerUser = function (value) {
        return new Promise(function (resolve, reject) {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    AuthenticateService.prototype.sendVerificationMail = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, firebase.auth().currentUser.sendEmailVerification()
                            .then(function () {
                            console.log("Verification email has been sent.");
                            _this.router.navigate(['verify-email']);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthenticateService.prototype.loginUser = function (value) {
        return new Promise(function (resolve, reject) {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    AuthenticateService.prototype.forgotPassword = function (passwordResetEmail) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, firebase.auth().sendPasswordResetEmail(passwordResetEmail)
                            .then(function () {
                            window.alert('Password reset email sent, check your inbox.');
                            _this.router.navigateByUrl("/tabs/tab5/login");
                        }).catch(function (error) {
                            window.alert(error);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthenticateService.prototype.googleLogin = function () {
        var _this = this;
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
            }, function (err) {
                reject(err);
            });
        });
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
    };
    AuthenticateService.prototype.facebookLogin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.facebook.login(['email', 'public_profile'])
                .then(function (response) {
                var facebookCredential = firebase.auth.FacebookAuthProvider
                    .credential(response.authResponse.accessToken);
                firebase.auth().signInWithCredential(facebookCredential)
                    .then(function (response) {
                    console.log("Firebase successful sign in with Facebook " + JSON.stringify(response));
                    resolve(response);
                });
            }, function (err) {
                reject(err);
            }).catch(function (error) {
                window.alert(error);
            });
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
    AuthenticateService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [GooglePlus,
            Platform,
            Facebook,
            Router])
    ], AuthenticateService);
    return AuthenticateService;
}());
export { AuthenticateService };
//# sourceMappingURL=authentication.service.js.map