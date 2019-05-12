import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatabaseService } from '../services/databases.service';
import { DatePipe } from '@angular/common';
var ReportPage = /** @class */ (function () {
    function ReportPage(modalController, navParams, formBuilder, dbService, alertController, datePipe) {
        this.modalController = modalController;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.dbService = dbService;
        this.alertController = alertController;
        this.datePipe = datePipe;
        this.report_validation_messages = {
            'name': [
                { type: 'required', message: 'Name is required.' },
                { type: 'maxLength', message: 'Maximum 60 characters.' }
            ],
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Enter a valid email.' }
            ],
            'phonenumber': [
                { type: 'pattern', message: 'Enter a valid phone number.' }
            ],
            'description': [
                { type: 'required', message: 'Please tell us what is wrong with this.' }
            ]
        };
        this.postName = this.navParams.get('postName');
        this.ownerEmail = this.navParams.get('ownerEmail');
        this.reportForm = this.formBuilder.group({
            name: new FormControl('', Validators.compose([
                Validators.required,
                Validators.maxLength(60)
            ])),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            phonenumber: new FormControl('', Validators.compose([
                Validators.pattern('^[0-9]{10}$')
            ])),
            description: new FormControl('', Validators.compose([
                Validators.required
            ]))
        });
        this.initializeElement();
    }
    ReportPage.prototype.closeModal = function () {
        this.modalController.dismiss();
    };
    ReportPage.prototype.logForm = function () {
        this.dbService.addReporttoFirebase(this.reportForm.value, this.ownerEmail, this.postName, this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss'));
        this.presentAlert("Your report is submitted!");
    };
    ReportPage.prototype.presentAlert = function (msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Success',
                            message: msg,
                            buttons: [
                                {
                                    text: 'Ok',
                                    handler: function () {
                                        _this.modalController.dismiss();
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ReportPage.prototype.ngOnInit = function () {
    };
    ReportPage.prototype.initializeElement = function () {
        this.name = document.getElementById("name");
        this.email = document.getElementById("email");
        this.phonenumber = document.getElementById("phonenumber");
        this.description = document.getElementById("description");
    };
    ReportPage = tslib_1.__decorate([
        Component({
            selector: 'app-report',
            templateUrl: './report.page.html',
            styleUrls: ['./report.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController, NavParams, FormBuilder,
            DatabaseService, AlertController, DatePipe])
    ], ReportPage);
    return ReportPage;
}());
export { ReportPage };
//# sourceMappingURL=report.page.js.map