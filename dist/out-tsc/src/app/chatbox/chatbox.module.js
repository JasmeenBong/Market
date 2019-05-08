import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ChatboxPage } from './chatbox.page';
var routes = [
    {
        path: '',
        component: ChatboxPage
    }
];
var ChatboxPageModule = /** @class */ (function () {
    function ChatboxPageModule() {
    }
    ChatboxPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ChatboxPage]
        })
    ], ChatboxPageModule);
    return ChatboxPageModule;
}());
export { ChatboxPageModule };
//# sourceMappingURL=chatbox.module.js.map