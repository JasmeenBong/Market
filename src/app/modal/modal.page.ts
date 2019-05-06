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

  regionList = [];
  MalaysiaAreaList = [];
  areaList = [];

  constructor(private modalController: ModalController, private dbService: DatabaseService, private http: HttpClient) {
    this.getMalaysiaAreaListFromFirebase();
}

  closeModal(){
    this.modalController.dismiss();
  }

  async getMalaysiaAreaListFromFirebase(){
    await Promise.resolve(this.dbService.getMalaysiaAreaList()).then(value=> {
      this.http.get(value[0]).subscribe((response) => {
        this.MalaysiaAreaList = Object.values(response);
        for(var i = 0; i < this.MalaysiaAreaList.length; i ++){
          this.regionList[i] = this.MalaysiaAreaList[i].region;
      }
    });
    });
  }

  getAreaList(region){
    for(var i = 0; i < this.MalaysiaAreaList.length; i ++){
      if(this.MalaysiaAreaList[i].region == region){
        this.areaList = this.MalaysiaAreaList[i].area;
      }
  }
  }

  passDataBack(region,area){
    this.modalController.dismiss({region: region, area: area});
  }

  ngOnInit() {
  }

}
