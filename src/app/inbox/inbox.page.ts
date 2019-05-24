import { Component, OnInit } from '@angular/core';
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

  constructor(private route:ActivatedRoute, public db: angulardb.AngularFireDatabase , private router: Router, private authService : AuthenticateService, private navCtrl: NavController,
    private spinnerDialog: SpinnerDialog, private dbService : DatabaseService) {
  }

  ionViewWillEnter(){
    if(!this.authService.user || this.authService.user == ""){
      this.navCtrl.navigateForward('swiped-tab/login');
    }
    else{
      this.currentUser = firebase.auth().currentUser;
      this.getMessage();
    //   setInterval(() => { 
    //     this.getMessage(); // Now the "this" still references the component
    //  }, 5000);
    }
  }

   getMessage(){
    this.spinnerDialog.show();
    this.showAllMsgs = [];
    Promise.resolve(this.dbService.getAllMessage()).then(value=> {
      this.subs = Object.values(value[0]);
      this.subs.forEach(msg =>{
        if(Object.values(msg)[1] == this.authService.user.email){
            Promise.resolve(this.dbService.getUserProfilebyEmail(Object.values(msg)[2])).then(value=>{
              if(value != null || value != undefined){ 
              const found = this.showAllMsgs.some(el => el.email === Object.values(msg)[2]);
              if(!found){
              if(Object.values(msg)[3] == "unread"){
                this.count =1;
              }
              this.showAllMsgs.push({
                email: Object.values(msg)[2],
                url: Object.values(Object.values(value[0])[0])[8],
                count: this.count
              })
              this.spinnerDialog.hide();
              this.count = 0;
              }else{
                const objIndex = this.showAllMsgs.findIndex((obj => obj.email == Object.values(msg)[2]));
                if(Object.values(msg)[3] == "unread"){
                  this.showAllMsgs[objIndex].count = this.showAllMsgs[objIndex].count + 1;                      
                }
              }
            }else{
              const found = this.showAllMsgs.some(el => el.email === Object.values(msg)[2]);
              if(!found){
                if(Object.values(msg)[3] == "unread"){
                  this.count =1;
                }
                this.showAllMsgs.push({
                  email: Object.values(msg)[2],
                  url: "https://banner2.kisspng.com/20180627/wio/kisspng-computer-icons-user-profile-avatar-jain-icon-5b332c5add9336.0201786915300803469076.jpg",
                  count: this.count
                })
                this.count = 0;
              }
            }
            })
          }
        if(Object.values(msg)[2] == this.authService.user.email){
          Promise.resolve(this.dbService.getUserProfilebyEmail(Object.values(msg)[1])).then(value=>{
            if(value != undefined || value != null){
            const found = this.showAllMsgs.some(el => el.email === Object.values(msg)[1]);
            if(!found){
              this.showAllMsgs.push({
                email: Object.values(msg)[1],
                url: Object.values(Object.values(value[0])[0])[8],
                count: this.count
              })
            }
          }
          else{
            const found = this.showAllMsgs.some(el => el.email === Object.values(msg)[1]);
            if(!found){
              this.showAllMsgs.push({
                email: Object.values(msg)[1],
                url: "https://banner2.kisspng.com/20180627/wio/kisspng-computer-icons-user-profile-avatar-jain-icon-5b332c5add9336.0201786915300803469076.jpg",
                count: this.count
              })
            }
          }
        })
        }
        })
      });
    }
  


    // this.spinnerDialog.show();
    // this.showAllMsgs = [];
    // this.subs = firebase.database().ref('messages');
    // this.subs.on("value",(snapshot)=>{
    //   snapshot.forEach((childSnapshot)=> {
    //     if(childSnapshot.val().reciever == this.currentUser.email){
    //         firebase.database().ref('users').orderByChild('email').equalTo(childSnapshot.val().sender).on('value', (userSnapshot : any) =>{
    //         if(userSnapshot.val()){ 
    //           var user : any = Object.values(userSnapshot.val())[0];
    //           if(childSnapshot.val().status == "unread"){
    //             this.count = 1;
    //           }
    //           const found = this.showAllMsgs.some(el => el.email === childSnapshot.val().sender);
    //           if(!found){  
    //                this.showAllMsgs.push({
    //                  email: childSnapshot.val().sender,
    //                  url: user.url,
    //                  count : this.count
    //             });
    //           }
    //           else{
    //             const objIndex = this.showAllMsgs.findIndex((obj => obj.email == childSnapshot.val().sender));
    //             if(childSnapshot.val().status == "unread"){
    //               this.showAllMsgs[objIndex].count = this.showAllMsgs[objIndex].count + 1;
    //             }
    //             }
    //             this.count = 0;
    //         }else{
    //           const found = this.showAllMsgs.some(el => el.email === childSnapshot.val().sender);
    //           if(!found){  
    //           this.showAllMsgs.push({
    //                email: childSnapshot.val().sender,
    //                  url: "https://banner2.kisspng.com/20180627/wio/kisspng-computer-icons-user-profile-avatar-jain-icon-5b332c5add9336.0201786915300803469076.jpg",
    //                  count : this.count
    //             });
    //           }
    //         }
    //         });    
    //         this.count = 0;
    //     }
    //     if(childSnapshot.val().sender == this.currentUser.email){
    //         firebase.database().ref('users').orderByChild('email').equalTo(childSnapshot.val().reciever).on('value', (userSnapshot : any) =>{
    //         if(userSnapshot.val()){ 
    //           var user : any = Object.values(userSnapshot.val())[0];
    //           const found = this.showAllMsgs.some(el => el.email === childSnapshot.val().reciever);
    //           if(!found){  
    //           this.showAllMsgs.push({
    //                email: childSnapshot.val().reciever,
    //                 url: user.url,
    //                 count : this.count
    //             });
    //             this.count = 0;
    //           }
    //         }else{
    //           const found = this.showAllMsgs.some(el => el.email === childSnapshot.val().reciever);
    //           if(!found){  
    //           this.showAllMsgs.push({
    //                email: childSnapshot.val().reciever,
    //                  url: "https://banner2.kisspng.com/20180627/wio/kisspng-computer-icons-user-profile-avatar-jain-icon-5b332c5add9336.0201786915300803469076.jpg",
    //                  count: this.count
    //             });
    //             this.count = 0; 
    //           }
    //         }
    //         });
    //       }
    //       this.spinnerDialog.hide();   
    //   }
    //   );
    // });
  // }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  getChat(chat){
    this.router.navigate(['/chatbox',{sender:firebase.auth().currentUser.email, reciever:chat}]);

  }
}
