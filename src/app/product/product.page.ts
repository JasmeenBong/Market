import {
    Component,
    OnInit
} from '@angular/core';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import {
    DatabaseService
} from '../services/databases.service';
import {
    SocialSharing
} from '@ionic-native/social-sharing/ngx';
import {
    AppAvailability
} from '@ionic-native/app-availability/ngx';
import {
    Platform
} from '@ionic/angular';
import {
    CallNumber
} from '@ionic-native/call-number/ngx';
import {
    EmailComposer
} from '@ionic-native/email-composer/ngx';
import {
    AndroidPermissions
} from '@ionic-native/android-permissions/ngx';
import {
    ReportPage
} from "../report/report.page";
import {
    ModalController,
    AlertController,
    NavController
} from '@ionic/angular';
import {
    SpinnerDialog
} from '@ionic-native/spinner-dialog/ngx';
import {
  SMS
} from '@ionic-native/sms/ngx';
import * as firebase from 'firebase/app';


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
    isDisabled;
    communicate = true;
    uid;
    userInfo;
    likedProductarray;

    constructor(private route: ActivatedRoute, private router: Router, private dbService: DatabaseService, private socialSharing: SocialSharing,
        private appAvailability: AppAvailability, private platform: Platform, private callNumber: CallNumber, private androidPermissions: AndroidPermissions, private emailComposer: EmailComposer,
        private alertController: AlertController, private modalController: ModalController, private spinnerDialog: SpinnerDialog, private sms: SMS) {
        this.getIdFromCategoriesPage()
    }

    getIdFromCategoriesPage() {
        this.route.queryParams.subscribe(params => {
            if (params && params.pid) {
                this.pid = params.pid;
                this.getProductDetailsById(this.pid);
            }
        })
    }

    async checkCurrentUserWithoutLogin(){
      let user = firebase.auth().currentUser;
      if(user){
        this.uid = user.uid;
        await Promise.resolve(this.dbService.getCurrentUser(this.uid)).then(value=> {
          this.userInfo  = value[0];
          this.likedProductarray = Object.values(this.userInfo.likedProduct);
        });
      }
    }


    async getProductDetailsById(pid) {
        await this.checkCurrentUserWithoutLogin();
        this.spinnerDialog.show();
        await Promise.resolve(this.dbService.getProductById(pid)).then(value => {
            if(value){
              if(this.likedProductarray.length){
                if(this.likedProductarray.includes(pid)){
                  this.product = value[0];
                  this.product.id = pid;
                  this.product.buttonColor = "danger";
                }
                else{
                  this.product = value[0];
                  this.product.id = pid;
                  this.product.buttonColor = "";
                }
              }else{
                this.product = value[0];
                this.product.id = pid;
                this.product.buttonColor = "";
              }
              this.spinnerDialog.hide();
            }else{
              setTimeout(() => {
                this.spinnerDialog.hide();
              }, 5000);
            }
            this.images = Object.values(this.product.images);
            this.getImagesforAvatar(this.product.uid);
        });

    }

    async getImagesforAvatar(uid) {
        await Promise.resolve(this.dbService.getSellerInformation(uid)).then(value => {
            this.seller = value[0];
            if(this.seller.phoneNumber){
              this.isDisabled = false;
            }
            else{
              this.isDisabled = true;
            }

            if(this.seller.email == firebase.auth().currentUser.email){
                this.communicate = false;
            }else{
                this.communicate = true;
            }
        });
    }

    addtoLikedProduct(pid, color){
      console.log(pid);
      console.log(color);
    }

    async shareFacebook() {
        this.socialSharing.shareViaFacebookWithPasteMessageHint("shareViaFacebook", null, this.images[0]).then(() => {
            console.log("shareViaFacebook: Success");
        }).catch(() => {
            console.error("shareViaFacebook: failed");
        });
    }

    async shareWhatsApp() {
        this.socialSharing.shareViaWhatsApp("shareViaWhatsApp", null, this.images[0]).then(() => {
            console.log("shareViaWhatsApp: Success");
        }).catch(() => {
            console.error("shareViaWhatsApp: failed");
        });
    }

    async shareInstagram() {
        this.socialSharing.shareViaInstagram("shareViaInstagram", 'https://www.google.nl/images/srpr/logo4w.png').then(() => {
            console.log("shareViaInstagram: Success");
        }).catch(() => {
            console.error("shareViaInstagram: failed");
        });
    }

    callSeller() {
        this.callNumber.callNumber(this.seller.phoneNumber, false);
    }

    async alertReport() {
        const alert = await this.alertController.create({
            header: 'Report',
            message: 'Do you want to make a report for this product sold by this seller?',
            buttons: [{
                text: 'No',
                role: 'cancel',
            }, {
                text: 'Yes',
                handler: () => {
                    this.gotoReportPage();
                }
            }]
        });
        await alert.present();
    }

    async gotoReportPage() {
        const modal = await this.modalController.create({
            component: ReportPage,
            cssClass: 'my-custom-modal-css',
            componentProps: {
                postName: this.product.postName,
                ownerEmail: this.seller.email
            },
        });
        await modal.present();
    }

    async smsSeller() {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
          result => console.log('Has permission?'+result.hasPermission),
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS )
        );

          const alert = await this.alertController.create({
           header: 'Please enter the text you want to send to the seller',
           inputs: [
             {
               name: 'msg',
               type: 'text',
               placeholder: 'Enter some text'
             }
           ],
           buttons: [
             {
               text: 'Cancel',
               role: 'cancel',
               cssClass: 'secondary',
               handler: () => {
                 console.log('Confirm Cancel');
               }
             }, {
               text: 'Ok',
               handler: (data) => {
                 var options = {
                   replaceLineBreaks: true, // true to replace \n by a new line, false by default
                   android: {
                     //intent: 'INTENT'  // send SMS with the native android SMS messaging
                     intent: '' // send SMS without opening any other app
                   }
                 };
                  try{
                   this.sms.send(this.seller.phoneNumber,data.msg);
                   this.presentSentAlert();
                 }
                 catch(e){
                   console.log(JSON.stringify(e));
                   console.log(e);
                 }
               }
             }
           ]
         });

        await alert.present();
    }

    async presentSentAlert(){
      const alert = await this.alertController.create({
        header: 'Message sent',
        message: 'Please check your SMS inbox',
        buttons: ['OK']
      });
      await alert.present();
    }

    sendEmail() {
        let email = {
            to: this.seller.email,
            subject: this.product.postName,
            body: 'Can I ask for more information about this product?',
            isHtml: true
        }
        this.emailComposer.open(email);
    }

    backtoCategoriesPage() {
        this.router.navigate(['/categories']);
    }

    ngOnInit() {


      }

  chat(){

  this.router.navigate(['/chatbox',{reciever:this.seller.email, sender:firebase.auth().currentUser.email}]);

}
}
