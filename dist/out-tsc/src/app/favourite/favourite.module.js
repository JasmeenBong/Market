import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FavouritePage } from './favourite.page';
var routes = [
    {
        path: '',
        component: FavouritePage
    }
];
var FavouritePageModule = /** @class */ (function () {
    function FavouritePageModule() {
    }
    FavouritePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [FavouritePage]
        })
    ], FavouritePageModule);
    return FavouritePageModule;
}());
export { FavouritePageModule };
//# sourceMappingURL=favourite.module.js.map