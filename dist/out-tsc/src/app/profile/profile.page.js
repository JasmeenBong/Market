import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, authService, router) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.router = router;
    }
    ProfilePage.prototype.ngOnInit = function () {
    };
    ProfilePage.prototype.ionViewWillEnter = function () {
        this.checkUser();
    };
    ProfilePage.prototype.checkUser = function () {
        var _this = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                _this.uid = user.uid;
                var userId = firebase.auth().currentUser.uid;
                var ref = firebase.database().ref('location');
                ref.once("value")
                    .then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var opGroup = document.createElement("option");
                        opGroup.setAttribute('label', childSnapshot.val().area);
                        opGroup.setAttribute('id', childSnapshot.key);
                        var optGroupText = document.createTextNode(childSnapshot.val().area);
                        opGroup.appendChild(optGroupText);
                        document.getElementById('location').appendChild(opGroup);
                        // (<HTMLInputElement>document.getElementById(childSnapshot.key)).innerHTML += "<option>"+childSnapshot.val().area+"</option>"; 
                    });
                });
                return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
                    var username = (snapshot.val() && snapshot.val().name) || 'Anonymous';
                    var pNumber = (snapshot.val() && snapshot.val().phoneNumber) || 'Anonymous';
                    var birthday = (snapshot.val() && snapshot.val().birthday) || null;
                    var location = (snapshot.val() && snapshot.val().location) || 'Anonymous';
                    var gender = (snapshot.val() && snapshot.val().gender) || 'Anonymous';
                    var url = (snapshot.val() && snapshot.val().url) || null;
                    document.getElementById('profilePicture').setAttribute('src', url);
                    document.getElementById('uname').value = username;
                    document.getElementById('phoneNumber').value = pNumber;
                    document.getElementById('birthDay').value = birthday;
                    document.getElementById('gender').value = gender;
                    document.getElementById('location').value = location;
                });
            }
            else {
                _this.router.navigateByUrl('tabs/tab5/login');
            }
        });
    };
    ProfilePage.prototype.uploadPicture = function () {
        var file = document.getElementById("file");
        file.addEventListener("change", function () {
            document.getElementById('fileUploaded').innerHTML = "Image Selected: " + document.getElementById('file').value;
            // (<HTMLInputElement>document.getElementById('profilePicture')).setAttribute('src',(<HTMLInputElement>document.getElementById('file')).value);
        });
    };
    ProfilePage.prototype.editProfile = function () {
        var userId = firebase.auth().currentUser.uid;
        var usersRef = firebase.database().ref().child('users/' + userId);
        usersRef.update({
            name: document.getElementById('uname').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            birthday: document.getElementById('birthDay').value,
            gender: document.getElementById('gender').value,
            location: document.getElementById('location').value,
            url: document.getElementById('profilePicture').getAttribute('src')
        });
    };
    ProfilePage.prototype.logoutUser = function () {
        var _this = this;
        this.authService.logoutUser()
            .then(function (res) {
            // console.log(res);
            _this.navCtrl.navigateBack('tabs/tab1');
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    ProfilePage = tslib_1.__decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.page.html',
            styleUrls: ['./profile.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AuthenticateService,
            Router])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.page.js.map