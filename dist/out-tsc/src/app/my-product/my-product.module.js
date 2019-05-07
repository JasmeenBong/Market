import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MyProductPage } from './my-product.page';
var routes = [
    {
        path: '',
        component: MyProductPage
    }
];
var MyProductPageModule = /** @class */ (function () {
    function MyProductPageModule() {
    }
    MyProductPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MyProductPage]
        })
    ], MyProductPageModule);
    return MyProductPageModule;
}());
export { MyProductPageModule };
//# sourceMappingURL=my-product.module.js.map