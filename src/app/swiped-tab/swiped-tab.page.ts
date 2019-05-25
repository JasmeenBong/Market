import { Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-swiped-tab',
  templateUrl: './swiped-tab.page.html',
  styleUrls: ['./swiped-tab.page.scss'],
})
export class SwipedTabPage implements OnInit {

  title = "Sign In";

  constructor(
    private navCtrl : NavController
  ) {}

  ngOnInit() {}

  changeTitle(action){
    if (action == 'signin'){
      (<HTMLScriptElement[]><any>document.getElementsByClassName("signIn"))[0].style.color = "darkblue";
      (<HTMLScriptElement[]><any>document.getElementsByClassName("signIn"))[0].style.fontWeight = "bolder";
      (<HTMLScriptElement[]><any>document.getElementsByClassName("signinBg"))[0].style.backgroundColor = "lightblue";
      (<HTMLScriptElement[]><any>document.getElementsByClassName("signUp"))[0].style.color = "lightblue";
      (<HTMLScriptElement[]><any>document.getElementsByClassName("signUp"))[0].style.fontWeight = "normal";
      (<HTMLScriptElement[]><any>document.getElementsByClassName("signupBg"))[0].style.backgroundColor = "darkblue";
      (<HTMLScriptElement[]><any>document.getElementsByClassName("signinBg"))[0].style.transition = "0.6s";


      this.title = "Sign In";
    }
    else if (action == 'signup'){
      (<HTMLScriptElement[]><any>document.getElementsByClassName("signUp"))[0].style.color = "darkblue";
      (<HTMLScriptElement[]><any>document.getElementsByClassName("signUp"))[0].style.fontWeight = "bolder";
      (<HTMLScriptElement[]><any>document.getElementsByClassName("signupBg"))[0].style.backgroundColor = "lightblue";
      (<HTMLScriptElement[]><any>document.getElementsByClassName("signIn"))[0].style.color = "lightblue";
      (<HTMLScriptElement[]><any>document.getElementsByClassName("signIn"))[0].style.fontWeight = "normal";
      (<HTMLScriptElement[]><any>document.getElementsByClassName("signinBg"))[0].style.backgroundColor = "darkblue";
      (<HTMLScriptElement[]><any>document.getElementsByClassName("signupBg"))[0].style.transition = "0.6s";



      this.title = "Sign Up";
    }
  }

  close(){
    this.navCtrl.navigateBack("");
  }
}
