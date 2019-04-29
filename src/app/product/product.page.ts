import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../services/databases.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Platform } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  pid;
  product;
  seller
  images;

  constructor(private route: ActivatedRoute, private router: Router, private dbService : DatabaseService, private socialSharing: SocialSharing,
  private appAvailability: AppAvailability, private platform: Platform, private callNumber: CallNumber, private sms : SMS,
  private emailComposer: EmailComposer) {
  this.getIdFromCategoriesPage()
}

  getIdFromCategoriesPage(){
    this.route.queryParams.subscribe(params=> {
      if(params && params.pid){
        this.pid = params.pid;
        this.getProductDetailsById(this.pid);
      }
    })
  }

  goToChatBox(){
    
  }

  getProductDetailsById(pid){
    Promise.resolve(this.dbService.getProductById(pid)).then(value=> {
       this.product = value[0];
       this.images = Object.values(this.product.images);
        this.getImagesforAvatar(this.product.owner);
     });
  }

  getImagesforAvatar(owner){
    Promise.resolve(this.dbService.getSellerImages(owner)).then(value=> {
       this.seller = Object.values(value[0]);
     });
  }

  async shareFacebook(){
    this.socialSharing.shareViaFacebookWithPasteMessageHint("shareViaFacebook", null, this.images[0]).then(() => {
     console.log("shareViaFacebook: Success");
   }).catch(() => {
     console.error("shareViaFacebook: failed");
   });
  }

  async shareWhatsApp(){
    this.socialSharing.shareViaWhatsApp("shareViaWhatsApp", null, this.images[0]).then(() => {
     console.log("shareViaWhatsApp: Success");
   }).catch(() => {
     console.error("shareViaWhatsApp: failed");
   });
  }

  async shareInstagram(){
    this.socialSharing.shareViaInstagram("shareViaInstagram", 'https://www.google.nl/images/srpr/logo4w.png').then(() => {
     console.log("shareViaInstagram: Success");
   }).catch(() => {
     console.error("shareViaInstagram: failed");
   });
  }

  callSeller(){
      this.callNumber.callNumber(this.seller[0].phoneNumber,false);
  }

  smsSeller(){
      this.sms.send('416123456', 'Hello world!');
  }

  sendEmail(){
    let email = {
      to: 'max@mustermann.de',
      cc: 'erika@mustermann.de',
      bcc: ['john@doe.com', 'jane@doe.com'],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    }
    this.emailComposer.open(email);
  }
  ngOnInit() {
  }

}
