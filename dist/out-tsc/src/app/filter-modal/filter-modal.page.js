import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
var FilterModalPage = /** @class */ (function () {
    function FilterModalPage(modalController) {
        this.modalController = modalController;
    }
    FilterModalPage.prototype.closeModal = function () {
        this.modalController.dismiss();
    };
    FilterModalPage.prototype.passDataBack = function (price, postTime) {
        this.modalController.dismiss({ price: price, postTime: postTime });
    };
    FilterModalPage.prototype.ngOnInit = function () {
    };
    FilterModalPage = tslib_1.__decorate([
        Component({
            selector: 'app-filter-modal',
            templateUrl: './filter-modal.page.html',
            styleUrls: ['./filter-modal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController])
    ], FilterModalPage);
    return FilterModalPage;
}());
export { FilterModalPage };
//# sourceMappingURL=filter-modal.page.js.map