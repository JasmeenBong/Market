import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FilterModalPage } from './filter-modal.page';
var routes = [
    {
        path: '',
        component: FilterModalPage
    }
];
var FilterModalPageModule = /** @class */ (function () {
    function FilterModalPageModule() {
    }
    FilterModalPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [FilterModalPage]
        })
    ], FilterModalPageModule);
    return FilterModalPageModule;
}());
export { FilterModalPageModule };
//# sourceMappingURL=filter-modal.module.js.map