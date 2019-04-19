//services for register, login, logout, and get user details
import{ Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticateService{

  public isLoggedIn = false;

  constructor(){}

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
