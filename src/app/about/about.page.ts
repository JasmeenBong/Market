import { Component, OnInit } from '@angular/core';
import { EmailComposer} from '@ionic-native/email-composer/ngx';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(public navCtrl: NavController,private emailComposer: EmailComposer) { }

  ngOnInit() {
  }
  back(){
    this.navCtrl.navigateBack('/tabs/tab1');
  }
  
  sendEmail() {
      let email = {
          to: "mrktpetadmn@gmail.com",
          isHtml: true
      }
      this.emailComposer.open(email);
  }

}
