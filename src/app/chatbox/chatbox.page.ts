import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.page.html',
  styleUrls: ['./chatbox.page.scss'],
})
export class ChatboxPage implements OnInit {
  type : 'sender' | 'reciever'

  constructor(private route:ActivatedRoute) { }
  reciever;
  sender;
  message;
  retMsg;
  msg;
  msgRef;
  getMsgs = [];


  send(){
    this.msg = firebase.database().ref('messages');
    this.msgRef = this.msg.child('/').push();

    this.msgRef.set({
      sender: this.sender,
      reciever: this.reciever,
      message: this.message
    });
    this.message = "";
  }

  ngOnInit() {
    this.reciever = this.route.snapshot.paramMap.get('reciever');
    this.sender = this.route.snapshot.paramMap.get('sender');
    this.retMsg = firebase.database().ref('messages');
    this.retMsg.on("value",(snapshot)=>{
      this.getMsgs = [];

       snapshot.forEach((childSnapshot)=> {
         this.getMsgs.push(childSnapshot.val().message);
        });
    })
   }



}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
