import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
var ChatboxPage = /** @class */ (function () {
    function ChatboxPage(route) {
        var _this = this;
        this.route = route;
        this.reciever = this.route.snapshot.paramMap.get('reciever');
        this.sender = this.route.snapshot.paramMap.get('sender');
        this.retMsg = firebase.database().ref('messages');
        this.retMsg.on("value", function (snapshot) {
            _this.getMsgs = [];
            //console.log(snapshot.val());
            snapshot.forEach(function (childSnapshot) {
                if (_this.reciever == childSnapshot.val().reciever) {
                    _this.getMsgs.push(childSnapshot.val().message);
                }
            });
        });
    }
    ChatboxPage.prototype.send = function () {
        this.msg = firebase.database().ref('messages');
        this.msgRef = this.msg.child('/').push({
            sender: this.sender,
            reciever: this.reciever,
            message: this.message
        });
        this.message = "";
    };
    ChatboxPage.prototype.ngOnInit = function () {
        var _this = this;
        this.retMsg = firebase.database().ref('messages');
        this.retMsg.on("value", function (snapshot) {
            _this.getMsgs = [];
            //console.log(snapshot.val());
            snapshot.forEach(function (childSnapshot) {
                if (_this.reciever == childSnapshot.val().reciever) {
                    _this.getMsgs.push(childSnapshot.val().message);
                }
            });
        });
    };
    ChatboxPage.prototype.ionViewDidLoad = function () {
    };
    ChatboxPage = tslib_1.__decorate([
        Component({
            selector: 'app-chatbox',
            templateUrl: './chatbox.page.html',
            styleUrls: ['./chatbox.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute])
    ], ChatboxPage);
    return ChatboxPage;
}());
export { ChatboxPage };
//# sourceMappingURL=chatbox.page.js.map