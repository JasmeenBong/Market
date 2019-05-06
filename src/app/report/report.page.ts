import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  postName;
  ownerName;

  constructor(private modalController : ModalController, private navParams: NavParams, private formBuilder : FormBuilder) {
    this.postName = this.navParams.get('postName');
    this.ownerName = this.navParams.get('ownerName');
    console.log(this.postName);
    console.log(this.ownerName);
  }

  closeModal(){
      this.modalController.dismiss();
    }

  ngOnInit() {

    // this.validations_form = this.formBuilder.group({
    //   name: new FormControl('', Validators.compose([
    //     Validators.required,
    //     Validators.pattern()
    //   ])),
    //   email: new FormControl('', Validators.compose([
    //     Validators.required,
    //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    //   ])),
    //   phonenumber: new FormControl(
    //   )
    // });
  }

}
