//services for accessing the database
import{ Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class DatabaseService{

  private db = firebase.database();
  private storage = firebase.storage();


  constructor(){}

  addNewUser(id, email){
    var array = [];
    this.db.ref("users/").child(id).set({
                url: 'https://firebasestorage.googleapis.com/v0/b/market-9d038.appspot.com/o/user%2F4ff36bf59e.png?alt=media&token=84f87924-bd66-4a68-8f13-91754de78a71',
                name: '',
                location: '',
                email: email,
                gender: '',
                birthday:'',
                area:'',
                likedProduct:''
    }).catch(function(error){
      console.error(error);
    });
  }

  addFacebookUser(id, name, email, image){
    this.db.ref("users/").child(id).set({
                url: image,
                name: name,
                location: '',
                email: email,
                gender: '',
                birthday:'',
                area:''
    }).catch(function(error){
      console.error(error);
    });
  }

  addNewAd(images, title, category, breed, age, weight, details, price, region, area, dateTime, uid){
    this.db.ref("posts/").push().set({
                age: age,
                area: area,
                breed: breed,
                dateTime: dateTime,
                description: details,
                images: images,
                postCategory: category,
                postName: title,
                price: price,
                region: region,
                status: "unsold",
                uid: uid,
                weight: weight
    }).catch(function(error){
      console.error(error);
    });
  }

  updateAd(images, title, category, breed, age, weight, details, price, region, area, pid){
    this.db.ref("posts/").child(pid).update({
                age: age,
                area: area,
                breed: breed,
                description: details,
                images: images,
                postCategory: category,
                postName: title,
                price: price,
                region: region,
                weight: weight
    }).catch(function(error){
      console.error(error);
    });
  }


  addToCurrentUserLikedProduct(uid,likedProductarray){
    if(likedProductarray.length){
      this.db.ref("users/").child(uid).update({
          likedProduct : likedProductarray
        }).catch(function(error){
          console.error(error);
        });
    }else{
      this.db.ref("users/").child(uid).update({
          likedProduct : ''
        }).catch(function(error){
          console.error(error);
        });
    }
  }

  getCurrentUser(id){
    return this.db.ref("users/" + id).once('value').then(snapshot => snapshot.val()).then(value =>[value]);
  }

  getCategory(){
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

  getProductByOwner(uid){
    return this.db.ref("posts/").orderByChild('uid').equalTo(uid).once('value').then(snapshot => snapshot.val()).then(value =>[value]);
  }

  getSellerInformation(uid){
    return this.db.ref("users/" + uid).once('value').then(snapshot => snapshot.val()).then(value =>[value]);
  }

  getCarouselImage(){
    return this.db.ref("carousel/").once('value').then(snapshot => snapshot.val()).then(value => [value]);
  }

  getMalaysiaAreaList(){
    return this.db.ref("location/").once('value').then(snapshot => snapshot.val()).then(value=>[value]);
  }

  getAllMessage(){
    return this.db.ref("messages/").once('value').then(snapshot => snapshot.val()).then(value=>[value]);
  }

  getUserProfilebyEmail(email){
    return this.db.ref("users/").orderByChild('email').equalTo(email).once('value').then(snapshot => snapshot.val()).then(value =>[value]);
  }


  addReporttoFirebase(report,owner,post,time){
    this.db.ref("reports/").push().set({
      timeStamp: time,
      buyerEmail: report.email,
      buyerPhoneNumber: report.phonenumber,
      reportedEmail: owner,
      reportedPost: post,
      reportmsg: report.description
    }).catch(function(error){
      console.error(error);
    });
  }

  deleteAd(pid){
    this.db.ref("posts/").child(pid).remove()
    .catch(function(error){
        console.error(error);
    });
  }
}
