//services for accessing the database
import{ Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class DatabaseService{

  private db = firebase.database();

  constructor(){}

  addNewUser(id, email){
    this.db.ref("users/").child(id).set({
                url: 'https://firebasestorage.googleapis.com/v0/b/market-9d038.appspot.com/o/user%2F4ff36bf59e.png?alt=media&token=84f87924-bd66-4a68-8f13-91754de78a71',
                name: '',
                email: email,
                location: '',
                gender: '',
                birthday:''

    }).catch(function(error){
      console.error(error);
    });
  }

  getCurrentUser(id){
    return this.db.ref("users/" + id).once('value').then(snapshot => snapshot.val()).then(value =>[value]);
  }

  getCategoryIcon(){
      return this.db.ref("categories/").once('value').then(snapshot => snapshot.val()).then(value =>[value]);
  }

  getProductListforEachCategories(category){
    return this.db.ref("posts/").orderByChild('postCategory').equalTo(category).once('value').then(snapshot => snapshot.val()).then(value =>[value]);
  }

  getAllProducts(){
    return this.db.ref("posts/").once('value').then(snapshot => snapshot.val()).then(value=>[value]);
  }

  getProductById(pid){
    return this.db.ref("posts/" + pid).once('value').then(snapshot=>snapshot.val()).then(value=>[value]);
  }

  getSellerImages(owner){
    return this.db.ref("users/").orderByChild('email').equalTo(owner).once('value').then(snapshot => snapshot.val()).then(value =>[value]);
  }

}
