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
        res => {
          const googleCredential = firebase.auth.GoogleAuthProvider
            .credential(res.idToken);

          if(this.platform.is('ios')|| this.platform.is("android") || this.platform.is('mobileweb')){
              firebase.auth().signInWithCredential(googleCredential)
                  .then(response => {
                      console.log("Firebase successful sign in with Google " + JSON.stringify(response));
                      resolve(response)
                  });
          }
          else {
              firebase.auth().signInWithRedirect(googleCredential)
                  .then(response => {
                    console.log("Firebase successful sign in with Google " + JSON.stringify(response));
                    resolve(response)
                  });
          }
        }, err => {
        reject(err);
      });
    });

    //   const provider = new firebase.auth.GoogleAuthProvider();
    //
    //   firebase.auth().signInWithRedirect(provider).then( () => {
    //     firebase.auth().getRedirectResult().then( result => {
    //     // This gives you a Google Access Token.
    //     // You can use it to access the Google API.
    //     var token = result.credential.accessToken;
    //     // The signed-in user info.
    //     var user = result.user;
    //     console.log(token, user);
    //   }).catch(function(error) {
    //     // Handle Errors here.
    //     console.log(error.message);
    //   });
    // });
  }

  facebookLogin(){
    var provider = new firebase.auth.FacebookAuthProvider();
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithPopup(provider).then(function(result){
        var user = result.user;

            firebase.auth().signInWithCredential(facebookCredential)
              .then(response => {
                  console.log("Firebase successful sign in with Facebook " + JSON.stringify(response));
                  resolve(response);
              });
            }, err => {
              reject (err);
        }).catch((error) => {
          window.alert(error);
        });
    });
    // return new Promise<any>((resolve,reject) => {
    //   this.facebook.login(['email', 'public_profile'])
    //     .then((response : FacebookLoginResponse) => {
    //         const facebookCredential = firebase.auth.FacebookAuthProvider
    //           .credential(response.authResponse.accessToken);
    //
    //           if(this.platform.is('ios')|| this.platform.is("android") || this.platform.is('mobileweb')){
    //               firebase.auth().signInWithCredential(facebookCredential)
    //                   .then(response => {
    //                       console.log("Firebase successful sign in with Facebook " + JSON.stringify(response));
    //                       resolve(response);
    //                   });
    //           }
    //           else {
    //               firebase.auth().signInWithRedirect(facebookCredential)
    //                   .then(response => {
    //                     console.log("Firebase successful sign in with Google " + JSON.stringify(response));
    //                     resolve(response);
    //                   });
    //           }
    //         }, err => {
    //           reject (err);
    //     });
    // });
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
