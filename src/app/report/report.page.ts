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
  name;
  email;
  phonenumber;
  description;
  private todo : FormGroup;

  constructor(private modalController : ModalController, private navParams: NavParams, private formBuilder : FormBuilder) {
    this.postName = this.navParams.get('postName');
    this.ownerName = this.navParams.get('ownerName');
    this.todo = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(60)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phonenumber: [''],
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(60)
      ]))
    });
    this.initializeElement();
  }

  closeModal(){
      this.modalController.dismiss();
    }

    logForm(){
   console.log(this.todo.value)
    }

  ngOnInit() {

  }

  report_validation_messages = {
    'name': [
      {type: 'required', message: 'Name is required.'},
      {type: 'maxLength', message: 'Maximum 60 characters.'}
    ],
    'email': [
        {type: 'required', message: 'Email is required.'},
        {type: 'pattern', message: 'Enter a valid email.'}
    ],
    'description': [
      { type: 'required', message: 'Please enter the price.'}
    ]
  };


  initializeElement(){
    this.name = (<HTMLInputElement>document.getElementById("name"));
    this.email = (<HTMLSelectElement>document.getElementById("email"));
    this.phonenumber = (<HTMLInputElement>document.getElementById("phonenumber"));
    this.description = (<HTMLInputElement>document.getElementById("description"));
  }

}
