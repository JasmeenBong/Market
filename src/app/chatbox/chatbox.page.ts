import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as firebase from 'firebase/app';
import * as angulardb from 'angularfire2/database';


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.page.html',
  styleUrls: ['./chatbox.page.scss'],
})
export class ChatboxPage implements OnInit {
  reciever;
  sender;
  subs;
  getMsgs = [];
  message;
  retMsg;
  msg;
  msgRef;
  sendEnabled = false;

  constructor(private route:ActivatedRoute, public db: angulardb.AngularFireDatabase) { 
    this.reciever = this.route.snapshot.paramMap.get('reciever');
    this.sender = this.route.snapshot.paramMap.get('sender');
    this.retMsg = firebase.database().ref('messages');
    console.log(this.reciever + ' '+this.sender);
    this.subs = this.db.list('/messages').valueChanges().subscribe( data=>{

      this.retMsg.on("value",(snapshot)=>{
         snapshot.forEach((childSnapshot)=> {
           if(this.sender == childSnapshot.val().sender && this.reciever == childSnapshot.val().reciever){
            this.getMsgs = data;
          }
          });
    });
  });
}

  
 
  send(){
    this.msg = firebase.database().ref('messages');
    this.msgRef = this.msg.child('/').push({
      sender: this.sender,
      reciever: this.reciever,
      message: this.message
    })

    this.message = "";
  }
  ionViewdidLoad(){
    
  }

  ngOnInit() {

  
   }

}       