import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatabaseService } from '../services/databases.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  postName;
  ownerEmail;
  name;
  email;
  phonenumber;
  description;
  private reportForm : FormGroup;

  constructor(private modalController : ModalController, private navParams: NavParams, private formBuilder : FormBuilder,
  private dbService : DatabaseService, private alertController: AlertController) {
    this.postName = this.navParams.get('postName');
    this.ownerEmail = this.navParams.get('ownerEmail');
    this.reportForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(60)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phonenumber : new FormControl('', Validators.compose([
        Validators.pattern('\d{10}')
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
    this.initializeElement();
  }

  closeModal(){
      this.modalController.dismiss();
    }

  logForm(){
    this.dbService.addReporttoFirebase(this.reportForm.value, this.ownerEmail, this.postName,new Date());
    this.presentAlert("Your report is submitted!");
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Success',
      message: msg,
      buttons: [
      {
          text: 'Ok',
          handler: () => {
            this.modalController.dismiss();
          }
        }
      ]
    });
    return await alert.present();
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
    'phonenumber': [
        {type: 'pattern', message: 'Enter a valid phone number.'}
    ],
    'description': [
      { type: 'required', message: 'Please tell us what is wrong with this.'}
    ]
  };


  initializeElement(){
    this.name = (<HTMLInputElement>document.getElementById("name"));
    this.email = (<HTMLSelectElement>document.getElementById("email"));
    this.phonenumber = (<HTMLInputElement>document.getElementById("phonenumber"));
    this.description = (<HTMLInputElement>document.getElementById("description"));
  }

}
