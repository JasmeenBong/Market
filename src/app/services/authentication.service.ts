//services for register, login, logout, and get user details
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticateService{

  isLoggedin : Boolean;
  user;
  constructor(
    private router : Router
  ){}

  registerUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
      res => resolve(res),
      err => reject(err))
    })
  }

  async sendVerificationMail(){
   return await firebase.auth().currentUser.sendEmailVerification()
    .then(() => {
      // console.log("Verification email has been sent.")
      this.router.navigate(['verify-email']);
    })
  }

  loginUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then (
        res => resolve(res),
        err => reject(err))
    })
  }

  async forgotPassword(passwordResetEmail) {
    return await firebase.auth().sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
      this.router.navigateByUrl("swiped-tab");
    }).catch((error) => {
      window.alert(error)
    })
  }

  logoutUser(){
      return new Promise((resolve, reject) => {
        if (firebase.auth().currentUser){
          firebase.auth().signOut()
          .then (() => {
            //  console.log("LOG OUT");
             resolve();
          }).catch((error) => {
            reject();
          });
        }
      })
    }
}
