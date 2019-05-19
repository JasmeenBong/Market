import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailComposer} from '@ionic-native/email-composer/ngx';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(public router: Router,private emailComposer: EmailComposer) { }

  ngOnInit() {
  }
  back(){
    this.router.navigateByUrl('/tabs/tab1');
  }
  
  sendEmail() {
      let email = {
          to: "mrktpetadmn@gmail.com",
          isHtml: true
      }
      this.emailComposer.open(email);
  }

}
