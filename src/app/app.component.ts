import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public onlineOffline: boolean = navigator.onLine;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController : AlertController
  ) {
    if (this.onlineOffline == false){
      this.presentAlert();
    }
    else {
      this.initializeApp();
    }

    window.addEventListener('offline', () => {
      this.presentAlert();
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

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
