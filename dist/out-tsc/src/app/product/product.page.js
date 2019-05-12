import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../services/databases.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Platform } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ReportPage } from "../report/report.page";
import { ModalController, AlertController } from '@ionic/angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import * as firebase from 'firebase/app';
var ProductPage = /** @class */ (function () {
    function ProductPage(route, router, dbService, socialSharing, appAvailability, platform, callNumber, androidPermissions, emailComposer, alertController, modalController, spinnerDialog, sms) {
        this.route = route;
        this.router = router;
        this.dbService = dbService;
        this.socialSharing = socialSharing;
        this.appAvailability = appAvailability;
        this.platform = platform;
        this.callNumber = callNumber;
        this.androidPermissions = androidPermissions;
        this.emailComposer = emailComposer;
        this.alertController = alertController;
        this.modalController = modalController;
        this.spinnerDialog = spinnerDialog;
        this.sms = sms;
        this.getIdFromCategoriesPage();
    }
    ProductPage.prototype.getIdFromCategoriesPage = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            if (params && params.pid) {
                _this.pid = params.pid;
                _this.getProductDetailsById(_this.pid);
            }
        });
    };
    ProductPage.prototype.getProductDetailsById = function (pid) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerDialog.show();
                        return [4 /*yield*/, Promise.resolve(this.dbService.getProductById(pid)).then(function (value) {
                                _this.product = value[0];
                                _this.spinnerDialog.hide();
                                _this.images = Object.values(_this.product.images);
                                _this.getImagesforAvatar(_this.product.uid);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductPage.prototype.getImagesforAvatar = function (uid) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve(this.dbService.getSellerInformation(uid)).then(function (value) {
                            _this.seller = value[0];
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductPage.prototype.shareFacebook = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.socialSharing.shareViaFacebookWithPasteMessageHint("shareViaFacebook", null, this.images[0]).then(function () {
                    console.log("shareViaFacebook: Success");
                }).catch(function () {
                    console.error("shareViaFacebook: failed");
                });
                return [2 /*return*/];
            });
        });
    };
    ProductPage.prototype.shareWhatsApp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.socialSharing.shareViaWhatsApp("shareViaWhatsApp", null, this.images[0]).then(function () {
                    console.log("shareViaWhatsApp: Success");
                }).catch(function () {
                    console.error("shareViaWhatsApp: failed");
                });
                return [2 /*return*/];
            });
        });
    };
    ProductPage.prototype.shareInstagram = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.socialSharing.shareViaInstagram("shareViaInstagram", 'https://www.google.nl/images/srpr/logo4w.png').then(function () {
                    console.log("shareViaInstagram: Success");
                }).catch(function () {
                    console.error("shareViaInstagram: failed");
                });
                return [2 /*return*/];
            });
        });
    };
    ProductPage.prototype.callSeller = function () {
        this.callNumber.callNumber(this.seller.phoneNumber, false);
    };
    ProductPage.prototype.alertReport = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Report',
                            message: 'Do you want to make a report for this product sold by this seller?',
                            buttons: [{
                                    text: 'No',
                                    role: 'cancel',
                                }, {
                                    text: 'Yes',
                                    handler: function () {
                                        _this.gotoReportPage();
                                    }
                                }]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductPage.prototype.gotoReportPage = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: ReportPage,
                            cssClass: 'my-custom-modal-css',
                            componentProps: {
                                postName: this.product.postName,
                                ownerEmail: this.seller.email
                            },
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductPage.prototype.smsSeller = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options, e_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(function (result) { return console.log('Has permission?' + result.hasPermission); }, function (err) { return _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.SEND_SMS); });
                        options = {
                            replaceLineBreaks: true,
                            android: {
                                //intent: 'INTENT'  // send SMS with the native android SMS messaging
                                intent: '' // send SMS without opening any other app
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.sms.send(this.seller.phoneNumber, "hello")];
                    case 2:
                        _a.sent();
                        console.log("sent");
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log(JSON.stringify(e_1));
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductPage.prototype.sendEmail = function () {
        var email = {
            to: this.seller.email,
            subject: this.product.postName,
            body: 'Can I ask for more information about this product?',
            isHtml: true
        };
        this.emailComposer.open(email);
    };
    ProductPage.prototype.backtoCategoriesPage = function () {
        this.router.navigate(['/categories']);
    };
    ProductPage.prototype.ngOnInit = function () {
    };
    ProductPage.prototype.chat = function () {
        this.router.navigate(['/chatbox', { reciever: this.seller.email, sender: firebase.auth().currentUser.email }]);
    };
    ProductPage = tslib_1.__decorate([
        Component({
            selector: 'app-product',
            templateUrl: './product.page.html',
            styleUrls: ['./product.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, DatabaseService, SocialSharing,
            AppAvailability, Platform, CallNumber, AndroidPermissions, EmailComposer,
            AlertController, ModalController, SpinnerDialog, SMS])
    ], ProductPage);
    return ProductPage;
}());
export { ProductPage };
//# sourceMappingURL=product.page.js.map