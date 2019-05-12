import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as firebase from 'firebase/app';
import * as angulardb from 'angularfire2/database';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  sender;
  listOfMessages;
  subs;
  showAllMsgs = [];
  currentUser;
  constructor(private route:ActivatedRoute, public db: angulardb.AngularFireDatabase , private router: Router) { 
    this.subs = this.db.list('/messages').valueChanges().subscribe( data=>{
      this.listOfMessages = firebase.database().ref('messages');
      this.listOfMessages.on("value",(snapshot)=>{
         snapshot.forEach((childSnapshot)=> {
          if(childSnapshot.val().reciever == firebase.auth().currentUser.email){
            this.showAllMsgs = data;
          }
          });
          
          function remove(array, element) {
            const index = array.indexOf(element);
            array.splice(index, 1);
          }
          for(var i = 0; i < this.showAllMsgs.length - 1; i++){
            if(this.showAllMsgs[i].sender == this.showAllMsgs[i].sender ){
              remove(this.showAllMsgs,this.showAllMsgs[i].sender);
             }
          }
          for(var i = 0; i < this.showAllMsgs.length; i++){
            if(this.showAllMsgs[i].sender == firebase.auth().currentUser.email ){
              remove(this.showAllMsgs,this.showAllMsgs[i].sender);
             }
          }
          console.log(this.showAllMsgs);          

    });

  });

  }
  ngOnInit() {
  }
  getChat(chat){
    this.router.navigate(['/chatbox',{sender:firebase.auth().currentUser.email, reciever:chat}]);   

  }

}
