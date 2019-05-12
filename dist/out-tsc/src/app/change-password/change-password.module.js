import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ChangePasswordPage } from './change-password.page';
var routes = [
    {
        path: '',
        component: ChangePasswordPage
    }
];
var ChangePasswordPageModule = /** @class */ (function () {
    function ChangePasswordPageModule() {
    }
    ChangePasswordPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ChangePasswordPage]
        })
    ], ChangePasswordPageModule);
    return ChangePasswordPageModule;
}());
export { ChangePasswordPageModule };
//# sourceMappingURL=change-password.module.js.map