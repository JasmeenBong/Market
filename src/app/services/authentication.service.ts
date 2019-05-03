//services for register, login, logout, and get user details
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticateService{

  constructor(
    private googlePlus : GooglePlus,
    private platform: Platform,
    private facebook: Facebook,
  ){}

  registerUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
      res => resolve(res),
      err => reject(err))
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

  googleLogin(){
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
        },
        err => reject(err))
    })
  }

  facebookLogin(){
    return new Promise<any>((resolve, reject) => {
      this.facebook.login(['email'])
        .then(
          response => {
            const facebookCredential = firebase.auth.FacebookAuthProvider
              .credential(response.authResponse.accessToken);

              if(this.platform.is('ios')|| this.platform.is("android") || this.platform.is('mobileweb')){
                  firebase.auth().signInWithCredential(facebookCredential)
                      .then(success => {
                          console.log("Firebase successful sign in with Facebook " + JSON.stringify(success));
                      });
              }
              else {
                  firebase.auth().signInWithRedirect(facebookCredential)
                      .then(success => {
                        console.log("Firebase successful sign in with Google " + JSON.stringify(success));
                      });
              }
            },
          err => reject(err));
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

  userDetails(){
    return firebase.auth().currentUser;
  };
}
