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
      (<HTMLInputElement>document.getElementById('signIn')).style.borderBottom = "solid";
      (<HTMLInputElement>document.getElementById('signUp')).style.borderBottom = "none";
      this.title = "Sign In";
    }
    else if (action == 'signup'){
      (<HTMLInputElement>document.getElementById('signIn')).style.borderBottom = "none";
      (<HTMLInputElement>document.getElementById('signUp')).style.borderBottom = "solid";

      this.title = "Sign Up";
    }
  }

  close(){
    this.navCtrl.navigateBack("");
  }
}
