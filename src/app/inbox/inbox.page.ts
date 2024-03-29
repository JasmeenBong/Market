import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as firebase from 'firebase/app';
import * as angulardb from 'angularfire2/database';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { DatabaseService } from '../services/databases.service';


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
  count = 0;
  getProfileImg;

  constructor(private route:ActivatedRoute, public db: angulardb.AngularFireDatabase , private router: Router, private authService : AuthenticateService, private navCtrl: NavController,
    private spinnerDialog: SpinnerDialog, private dbService : DatabaseService, private CD: ChangeDetectorRef) {
  }

  //check if user is login
  //if not ask user to login
  //if yes call the get message every 5 seconds
  ionViewWillEnter(){
    if(!this.authService.user || this.authService.user == ""){
      this.navCtrl.navigateForward('swiped-tab/login');
    }
    else{
      this.currentUser = firebase.auth().currentUser;
      this.getMessage();
      setInterval(() => { 
        this.getMessage();
     }, 5000);
    }
  }

  //get message from firebase which the sender/receiver is the user
   getMessage(){
    this.spinnerDialog.show();
    this.subs = firebase.database().ref('/messages');    
    this.subs.on("value",(snapshot)=>{
      this.showAllMsgs = [];
      this.spinnerDialog.hide();
      snapshot.forEach((childSnapshot)=> {
        if(childSnapshot.val().reciever == this.currentUser.email){
            firebase.database().ref('users').orderByChild('email').equalTo(childSnapshot.val().sender).on('value', (userSnapshot : any) =>{
            if(userSnapshot.val()){ 
              var user : any = Object.values(userSnapshot.val())[0];
              const found = this.showAllMsgs.some(el => el.email === childSnapshot.val().sender);
              if(!found){  
                if(childSnapshot.val().status == "unread"){
                  this.count = 1;
                }
                   this.showAllMsgs.push({
                     email: childSnapshot.val().sender,
                     url: user.url,
                     count : this.count
                });
                this.spinnerDialog.hide();
                this.count = 0;
              }else{
                const objIndex = this.showAllMsgs.findIndex((obj => obj.email == childSnapshot.val().sender));
                if(childSnapshot.val().status == "unread"){
                  this.showAllMsgs[objIndex].count = this.showAllMsgs[objIndex].count + 1;                      
                }
                this.count = 0;
                this.spinnerDialog.hide();
              }
            }else{
              const found = this.showAllMsgs.some(el => el.email === childSnapshot.val().sender);
              if(!found){
                if(childSnapshot.val().status == "unread"){
                  this.count =1;
                }
                this.showAllMsgs.push({
                  email: childSnapshot.val().sender,
                  url: "https://banner2.kisspng.com/20180627/wio/kisspng-computer-icons-user-profile-avatar-jain-icon-5b332c5add9336.0201786915300803469076.jpg",
                  count: this.count
                })
                this.count = 0;
                this.spinnerDialog.hide();
              }else{
                const objIndex = this.showAllMsgs.findIndex((obj => obj.email == childSnapshot.val().sender));
                if(childSnapshot.val().status == "unread"){
                  this.showAllMsgs[objIndex].count = this.showAllMsgs[objIndex].count + 1;                      
                }
                this.count = 0;
                this.spinnerDialog.hide();
              }
            }
          });
        }
        if(childSnapshot.val().sender == this.currentUser.email){
          firebase.database().ref('users').orderByChild('email').equalTo(childSnapshot.val().reciever).on('value', (userSnapshot : any) =>{
          if(userSnapshot.val()){ 
            var user : any = Object.values(userSnapshot.val())[0];
            const found = this.showAllMsgs.some(el => el.email === childSnapshot.val().reciever);
            if(!found){  
                 this.showAllMsgs.push({
                   email: childSnapshot.val().reciever,
                   url: user.url,
                   count : this.count
              });
              this.count = 0;
              this.spinnerDialog.hide();
            }
          }else{
            const found = this.showAllMsgs.some(el => el.email === childSnapshot.val().reciever);
            if(!found){
              this.showAllMsgs.push({
                email: childSnapshot.val().reciever,
                url: "https://banner2.kisspng.com/20180627/wio/kisspng-computer-icons-user-profile-avatar-jain-icon-5b332c5add9336.0201786915300803469076.jpg",
                count: this.count
              })
              this.count = 0;
              this.spinnerDialog.hide();
            }
          }
        });
      }
      });
    });
    }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  //go to the chate page
  getChat(chat){
    this.router.navigate(['/chatbox',{sender:firebase.auth().currentUser.email, reciever:chat}]);

  }
}
