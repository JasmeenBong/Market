import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserArea } from '../profile/area';
import { Camera } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase/app';
var ChangePasswordPage = /** @class */ (function () {
    function ChangePasswordPage(navCtrl, authService, router, area, camera, AlertController, ToastController) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.router = router;
        this.area = area;
        this.camera = camera;
        this.AlertController = AlertController;
        this.ToastController = ToastController;
    }
    ChangePasswordPage.prototype.ngOnInit = function () {
    };
    ChangePasswordPage.prototype.presentToast = function (msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ToastController.create({
                            message: msg,
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChangePasswordPage.prototype.changePass = function () {
        var newPassword = document.getElementById('npassword').value;
        var repeatPassword = document.getElementById('rnpassword').value;
        if (newPassword === repeatPassword) {
            if (newPassword.length < 9) {
                this.presentToast("Password Too Short!");
            }
            else {
                firebase.auth().currentUser.updatePassword(newPassword).then(function () {
                }).catch(function (error) {
                    this.presentToast(error);
                });
                this.presentToast("Sucessfully Changed The Password");
            }
        }
        else {
            this.presentToast("Please Make Sure Both Passwords Match");
        }
    };
    ChangePasswordPage.prototype.backProfile = function () {
        this.navCtrl.navigateBack('tabs/tab5');
    };
    ChangePasswordPage = tslib_1.__decorate([
        Component({
            selector: 'app-change-password',
            templateUrl: './change-password.page.html',
            styleUrls: ['./change-password.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AuthenticateService,
            Router,
            UserArea,
            Camera,
            AlertController,
            ToastController])
    ], ChangePasswordPage);
    return ChangePasswordPage;
}());
export { ChangePasswordPage };
//# sourceMappingURL=change-password.page.js.map