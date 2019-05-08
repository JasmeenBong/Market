import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SwipedTabPage } from './swiped-tab.page';
var routes = [
    {
        path: '',
        component: SwipedTabPage
    }
];
var SwipedTabPageModule = /** @class */ (function () {
    function SwipedTabPageModule() {
    }
    SwipedTabPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SwipedTabPage]
        })
    ], SwipedTabPageModule);
    return SwipedTabPageModule;
}());
export { SwipedTabPageModule };
//# sourceMappingURL=swiped-tab.module.js.map