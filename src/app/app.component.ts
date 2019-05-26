import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController : AlertController,
    private toastCtrl : ToastController,
    private network : Network
  ) {
    this.initializeApp();

    if (this.network.type == "none"){
      this.presentAlert;
      console.log("offline");
    }

    this.network.onConnect().subscribe(() => {
      this.presentToast();
      console.log("online");
    });

    this.network.onDisconnect().subscribe(() => {
      this.presentAlert();
      console.log("offline");
    });
  }

  async presentAlert() {

    const alert = await this.alertController.create({
      header: 'Warning',
      message: "Your internet connection seems down. Please check your connection.",
      buttons: ['OK']
    });
    return await alert.present();
  }

  async presentToast(){
    const toast = await this.toastCtrl.create({
      message : "Reconnecting...",
      duration : 3000,
      position : "top"
    });
    
    toast.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
