import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SellPage } from './sell.page';
var routes = [
    {
        path: '',
        component: SellPage
    }
];
var SellPageModule = /** @class */ (function () {
    function SellPageModule() {
    }
    SellPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                ReactiveFormsModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SellPage]
        })
    ], SellPageModule);
    return SellPageModule;
}());
export { SellPageModule };
//# sourceMappingURL=sell.module.js.map