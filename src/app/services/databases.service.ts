//services for accessing the database
import{ Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class DatabaseService{

  private db = firebase.database();

  constructor(){}

  addNewUser(id, email){
    this.db.ref("users/").child(id).set({
                email: email
    }).catch(function(error){
      console.error(error);
    });
  }
}
