import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../services/databases.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  townList;

  constructor(private modalController: ModalController, private dbService: DatabaseService, private http: HttpClient) {
  this.getTownListFromFirebase();
}

  closeModal(){
    this.modalController.dismiss();
  }

  getTownListFromFirebase(){

    Promise.resolve(this.dbService.getTownList()).then(value=> {
      this.http.get(value[0]).subscribe((response) => {
        console.log(response);
    });
    });
  }

  ngOnInit() {
  }

}
