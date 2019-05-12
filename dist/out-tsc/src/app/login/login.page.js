import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { DatabaseService } from '../services/databases.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, authService, formBuilder, router, dbService) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.router = router;
        this.dbService = dbService;
        this.errorMessage = '';
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
    LoginPage.prototype.ngOnInit = function () {
        this.validations_form = this.formBuilder.group({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.minLength(8),
                Validators.required
            ]))
        });
    };
    LoginPage.prototype.loginUser = function (value) {
        var _this = this;
        this.authService.loginUser(value)
            .then(function (res) {
            if (res.user.emailVerified == false) {
                _this.errorMessage = "Please verify your email.";
                _this.authService.sendVerificationMail();
            }
            else {
                console.log(res);
                _this.errorMessage = "";
                _this.navCtrl.navigateForward('tabs/tab1');
            }
        }, function (err) {
            _this.errorMessage = err.message;
        });
    };
    LoginPage.prototype.LoginWithGoogle = function () {
        var _this = this;
        this.authService.googleLogin()
            .then(function (res) {
            console.log(res);
            _this.errorMessage = "";
            _this.navCtrl.navigateForward('/tabs/tab1');
        }, function (err) {
            _this.errorMessage = err.message;
        });
    };
    LoginPage.prototype.LoginWithFacebook = function () {
        var _this = this;
        this.authService.facebookLogin()
            .then(function (res) {
            console.log(res);
            // this.errorMessage = "";
            // this.navCtrl.navigateForward('/tabs/tab1');
        }, function (err) {
            _this.errorMessage = err.message;
        });
    };
    LoginPage.prototype.goToRegisterPage = function () {
        this.navCtrl.navigateForward('/tabs/tab5/register');
    };
    LoginPage.prototype.forgotPassword = function () {
        this.router.navigate(['forgot-password']);
    };
    LoginPage.prototype.addToDb = function () {
        var newUser = firebase.auth().currentUser;
        var id = newUser.uid;
        var name = newUser.displayName;
        var image = newUser.photoURL;
        var email = newUser.email;
        this.dbService.addFacebookUser(id, name, email, image);
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AuthenticateService,
            FormBuilder,
            Router,
            DatabaseService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map