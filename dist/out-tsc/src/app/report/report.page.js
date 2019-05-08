import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
var ReportPage = /** @class */ (function () {
    function ReportPage(modalController, navParams, formBuilder) {
        this.modalController = modalController;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.postName = this.navParams.get('postName');
        this.ownerName = this.navParams.get('ownerName');
        console.log(this.postName);
        console.log(this.ownerName);
    }
    ReportPage.prototype.closeModal = function () {
        this.modalController.dismiss();
    };
    ReportPage.prototype.ngOnInit = function () {
        // this.validations_form = this.formBuilder.group({
        //   name: new FormControl('', Validators.compose([
        //     Validators.required,
        //     Validators.pattern()
        //   ])),
        //   email: new FormControl('', Validators.compose([
        //     Validators.required,
        //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        //   ])),
        //   phonenumber: new FormControl(
        //   )
        // });
    };
    ReportPage = tslib_1.__decorate([
        Component({
            selector: 'app-report',
            templateUrl: './report.page.html',
            styleUrls: ['./report.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController, NavParams, FormBuilder])
    ], ReportPage);
    return ReportPage;
}());
export { ReportPage };
//# sourceMappingURL=report.page.js.map