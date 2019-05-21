import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as firebase from 'firebase/app';
import * as angulardb from 'angularfire2/database';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';

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

  constructor(private route:ActivatedRoute, public db: angulardb.AngularFireDatabase , private router: Router, private authService : AuthenticateService, private navCtrl: NavController) {
  }

  ionViewWillEnter(){
    if(!this.authService.user || this.authService.user == ""){
      this.navCtrl.navigateForward('swiped-tab/login');
    }
    else{
      this.currentUser = firebase.auth().currentUser;
      this.getMessage();
    }
  }

   getMessage(){
    this.subs = firebase.database().ref('messages');
    this.subs.on("value",(snapshot)=>{
      snapshot.forEach((childSnapshot)=> {
        if(childSnapshot.val().reciever == this.currentUser.email){
            firebase.database().ref('users').orderByChild('email').equalTo(childSnapshot.val().sender).on('value', (userSnapshot : any) =>{
            if(userSnapshot.val()){ 
              var user : any = Object.values(userSnapshot.val())[0];
              const found = this.showAllMsgs.some(el => el.email === childSnapshot.val().sender);
              if(!found){  
                   this.count++;
                   this.showAllMsgs.push({
                     email: childSnapshot.val().sender,
                     url: user.url,
                     count : this.count

                });
                this.count = 0;
              }
              else{
                const objIndex = this.showAllMsgs.findIndex((obj => obj.email == childSnapshot.val().sender));
                this.showAllMsgs[objIndex].count = this.showAllMsgs[objIndex].count + 1;
                console.log(this.showAllMsgs[objIndex].count);
                this.count = 0;
                }
            }else{
              const found = this.showAllMsgs.some(el => el.email === childSnapshot.val().sender);
              if(!found){  
              this.showAllMsgs.push({
                   email: childSnapshot.val().sender,
                     url: "https://banner2.kisspng.com/20180627/wio/kisspng-computer-icons-user-profile-avatar-jain-icon-5b332c5add9336.0201786915300803469076.jpg",
                     count : this.count
                });
                this.count = 0;
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
                });
              }
            }else{
              const found = this.showAllMsgs.some(el => el.email === childSnapshot.val().reciever);
              if(!found){  
              this.showAllMsgs.push({
                   email: childSnapshot.val().reciever,
                     url: "https://banner2.kisspng.com/20180627/wio/kisspng-computer-icons-user-profile-avatar-jain-icon-5b332c5add9336.0201786915300803469076.jpg"
                });
              }
            }
            });
          }
          
      });
    });
  }

  ngOnInit() {
  }

  getChat(chat){
    this.router.navigate(['/chatbox',{sender:firebase.auth().currentUser.email, reciever:chat}]);

  }

}
