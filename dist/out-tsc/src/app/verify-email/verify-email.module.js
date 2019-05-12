import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { VerifyEmailPage } from './verify-email.page';
var routes = [
    {
        path: '',
        component: VerifyEmailPage
    }
];
var VerifyEmailPageModule = /** @class */ (function () {
    function VerifyEmailPageModule() {
    }
    VerifyEmailPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [VerifyEmailPage]
        })
    ], VerifyEmailPageModule);
    return VerifyEmailPageModule;
}());
export { VerifyEmailPageModule };
//# sourceMappingURL=verify-email.module.js.map