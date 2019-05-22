import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import * as angulardb from 'angularfire2/database';
import { DatePipe } from '@angular/common';



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

  ngOnInit(){
    
  }

  constructor(private route:ActivatedRoute, public db: angulardb.AngularFireDatabase, private datePipe :DatePipe,private authService : AuthenticateService, private router: Router) {
  this.showMessage();
  }

  showMessage(){
  this.reciever = this.route.snapshot.paramMap.get('reciever');
  this.sender = this.route.snapshot.paramMap.get('sender');
  this.retMsg = firebase.database().ref('messages');
  this.retMsg.on("value",(snapshot)=>{
        this.getMsgs = [];
        snapshot.forEach((childSnapshot)=> {
         if((this.sender == childSnapshot.val().sender && this.reciever == childSnapshot.val().reciever) || (this.reciever == childSnapshot.val().sender && this.sender == childSnapshot.val().reciever)){
           this.getMsgs.push(childSnapshot.val());
           if(childSnapshot.val().reciever == this.authService.user.email){
           this.retMsg.child(childSnapshot.key).update({
              status : "read"
           }).catch(function(error){
             console.error(error);
           });
           }
        }
        });
      });
  }
  
  send(){
    this.msg = firebase.database().ref('messages');
    this.msgRef = this.msg.child('/').push({
      sender: this.sender,
      reciever: this.reciever,
      message: this.message,
      timeStamp: this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      status: 'unread'
    })
    this.message = "";
   } 

  goBack(){
      this.router.navigate(['/product']);
  }

}
