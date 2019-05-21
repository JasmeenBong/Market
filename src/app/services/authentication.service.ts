//services for register, login, logout, and get user details
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticateService{

  isLoggedin : Boolean;
  user;
  constructor(
    private googlePlus : GooglePlus,
    private platform: Platform,
    private facebook: Facebook,
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
      console.log("Verification email has been sent.")
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
      this.router.navigateByUrl("/tabs/tab5/login");
    }).catch((error) => {
      window.alert(error)
    })
  }

  googleLogin(){
    return new Promise<any>((resolve,reject) => {
      this.googlePlus.login({
        'webClientId': '859739031584-6ms3gn9hs1gu6lovpagbeg26vdn93g3h.apps.googleusercontent.com',
        'offline': true
      })
      .then(
        result => {
          const googleCredential = firebase.auth.GoogleAuthProvider
            .credential(result.idToken);

          firebase.auth().signInWithCredential(googleCredential)
            .then(res => resolve(res),
            err => reject(err));
        }, err => {
        reject(err);
      });
    });
  }

  facebookLogin(){
    return new Promise<any>((resolve,reject) => {
      this.facebook.login(['email', 'public_profile'])
        .then((response : FacebookLoginResponse) => {
            const facebookCredential = firebase.auth.FacebookAuthProvider
              .credential(response.authResponse.accessToken);

              firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential)
              .then(res => resolve(res),
              err => reject(err));
            }, err => {
              reject (err);
        });
    });
  }

  logoutUser(){
      return new Promise((resolve, reject) => {
        if (firebase.auth().currentUser){
          firebase.auth().signOut()
          .then (() => {
             console.log("LOG OUT");
             resolve();
          }).catch((error) => {
            reject();
          });
        }
      })
    }
}
