import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { DatabaseService } from '../services/databases.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, authService, formBuilder, dbService, router) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.dbService = dbService;
        this.router = router;
        this.errorMessage = '';
        this.successMessage = '';
        this.validation_messages = {
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Enter a valid email.' }
            ],
            'password': [
                { type: 'required', message: 'Password is required.' },
                { type: 'minlength', message: 'Password must be at least 8 characters long.' }
            ],
            'reEnterPassword': [
                { type: 'required', message: 'Please re-enter your password.' }
            ]
        };
    }
    RegisterPage.prototype.ngOnInit = function () {
        this.validations_form = this.formBuilder.group({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.minLength(8),
                Validators.required
            ])),
            reEnterPassword: new FormControl('', Validators.compose([
                Validators.required
            ])),
        }, { validator: this.checkMatch });
    };
    RegisterPage.prototype.checkMatch = function (group) {
        var pass = group.controls.password.value;
        var reEnterPass = group.controls.reEnterPassword.value;
        if (reEnterPass !== '') {
            return pass === reEnterPass ? null : { notEqual: true };
        }
    };
    RegisterPage.prototype.registerUser = function (value) {
        var _this = this;
        this.authService.registerUser(value)
            .then(function (res) {
            console.log(res);
            _this.errorMessage = "";
            _this.successMessage = "Your account has been created.";
            _this.addToDb();
            _this.authService.sendVerificationMail();
            // this.navCtrl.navigateForward('/tabs/tab1');
        }, function (err) {
            console.log(err);
            _this.errorMessage = err.message;
            _this.successMessage = "";
        });
    };
    RegisterPage.prototype.goLoginPage = function () {
        this.navCtrl.navigateForward('/tabs/tab5/login');
    };
    RegisterPage.prototype.addToDb = function () {
        var newUser = firebase.auth().currentUser;
        var id = newUser.uid;
        var email = newUser.email;
        this.dbService.addNewUser(id, email);
    };
    RegisterPage.prototype.back = function () {
        this.navCtrl.navigateBack('/tabs/tab5/login');
    };
    RegisterPage = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AuthenticateService,
            FormBuilder,
            DatabaseService,
            Router])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map