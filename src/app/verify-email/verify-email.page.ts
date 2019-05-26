import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authentication.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  email = "";

  constructor(
    public authService : AuthenticateService,
    private router : Router
  ) {
    var user = firebase.auth().currentUser;
    this.email = user.email;
  }

  ngOnInit() {
  }

  goBackToLogin(){
    this.router.navigateByUrl("swiped-tab/login");
  }

}
