import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportPage } from './report.page';
var routes = [
    {
        path: '',
        component: ReportPage
    }
];
var ReportPageModule = /** @class */ (function () {
    function ReportPageModule() {
    }
    ReportPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                ReactiveFormsModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ReportPage]
        })
    ], ReportPageModule);
    return ReportPageModule;
}());
export { ReportPageModule };
//# sourceMappingURL=report.module.js.map