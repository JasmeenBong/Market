import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../services/databases.service';
import { HttpClient } from '@angular/common/http';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
var ModalPage = /** @class */ (function () {
    function ModalPage(modalController, dbService, http, spinnerDialog) {
        this.modalController = modalController;
        this.dbService = dbService;
        this.http = http;
        this.spinnerDialog = spinnerDialog;
        this.regionList = [];
        this.MalaysiaAreaList = [];
        this.areaList = [];
        this.getMalaysiaAreaListFromFirebase();
    }
    ModalPage.prototype.closeModal = function () {
        this.modalController.dismiss();
    };
    ModalPage.prototype.getMalaysiaAreaListFromFirebase = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerDialog.show();
                        return [4 /*yield*/, Promise.resolve(this.dbService.getMalaysiaAreaList()).then(function (value) {
                                _this.MalaysiaAreaList = Object.values(value[0]);
                                _this.spinnerDialog.hide();
                                for (var i = 0; i < _this.MalaysiaAreaList.length; i++) {
                                    _this.regionList[i] = _this.MalaysiaAreaList[i].region;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalPage.prototype.getAreaList = function (region) {
        for (var i = 0; i < this.MalaysiaAreaList.length; i++) {
            if (this.MalaysiaAreaList[i].region == region) {
                this.areaList = this.MalaysiaAreaList[i].area;
            }
        }
    };
    ModalPage.prototype.passDataBack = function (area) {
        this.modalController.dismiss({ area: area });
    };
    ModalPage.prototype.ngOnInit = function () {
    };
    ModalPage = tslib_1.__decorate([
        Component({
            selector: 'app-modal',
            templateUrl: './modal.page.html',
            styleUrls: ['./modal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController, DatabaseService, HttpClient,
            SpinnerDialog])
    ], ModalPage);
    return ModalPage;
}());
export { ModalPage };
//# sourceMappingURL=modal.page.js.map