import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { Router } from '@angular/router';
var ForgotPasswordPage = /** @class */ (function () {
    function ForgotPasswordPage(formBuilder, authService, router) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.router = router;
        this.validation_messages = {
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Please enter a valid email.' }
            ]
        };
    }
    ForgotPasswordPage.prototype.ngOnInit = function () {
        this.forgotpassword_form = this.formBuilder.group({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ]))
        });
    };
    ForgotPasswordPage.prototype.resetPassword = function (value) {
        this.authService.forgotPassword(value);
    };
    ForgotPasswordPage.prototype.goBackToLogin = function () {
        this.router.navigateByUrl("tabs/tab5/login");
    };
    ForgotPasswordPage = tslib_1.__decorate([
        Component({
            selector: 'app-forgot-password',
            templateUrl: './forgot-password.page.html',
            styleUrls: ['./forgot-password.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            AuthenticateService,
            Router])
    ], ForgotPasswordPage);
    return ForgotPasswordPage;
}());
export { ForgotPasswordPage };
//# sourceMappingURL=forgot-password.page.js.map