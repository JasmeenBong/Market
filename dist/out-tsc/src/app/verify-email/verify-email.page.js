import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthenticateService } from '../services/authentication.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
var VerifyEmailPage = /** @class */ (function () {
    function VerifyEmailPage(authService, router) {
        this.authService = authService;
        this.router = router;
        this.email = "";
        var user = firebase.auth().currentUser;
        this.email = user.email;
    }
    VerifyEmailPage.prototype.ngOnInit = function () {
    };
    VerifyEmailPage.prototype.goBackToLogin = function () {
        this.router.navigateByUrl("tabs/tab5/login");
    };
    VerifyEmailPage = tslib_1.__decorate([
        Component({
            selector: 'app-verify-email',
            templateUrl: './verify-email.page.html',
            styleUrls: ['./verify-email.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticateService,
            Router])
    ], VerifyEmailPage);
    return VerifyEmailPage;
}());
export { VerifyEmailPage };
//# sourceMappingURL=verify-email.page.js.map