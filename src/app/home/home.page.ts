import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


constructor(public router: Router) { }

go() {
  this.router.navigateByUrl('/sell');
}

  ngOnInit() {
  }

}
