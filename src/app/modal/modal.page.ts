import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../services/databases.service';
import { HttpClient } from '@angular/common/http';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  regionList = [];
  MalaysiaAreaList = [];
  areaList = [];
  url;
  selectedRegion;
  selectedArea;

  constructor(private modalController: ModalController, private dbService: DatabaseService, private http: HttpClient,
  private spinnerDialog: SpinnerDialog) {
    this.getMalaysiaAreaListFromFirebase();
}

 //close the modal
  closeModal(){
    this.modalController.dismiss();
  }

  //get malaysia area list from firebase
  async getMalaysiaAreaListFromFirebase(){
    this.spinnerDialog.show();
    await Promise.resolve(this.dbService.getMalaysiaAreaList()).then(value=> {
        this.MalaysiaAreaList = Object.values(value[0]);
        this.spinnerDialog.hide();
        for(var i = 0; i < this.MalaysiaAreaList.length; i ++){
          this.regionList[i] = this.MalaysiaAreaList[i].region;
        }
    });
  }

  //get the area list when user select the region
  getAreaList(region){
    for(var i = 0; i < this.MalaysiaAreaList.length; i ++){
      if(this.MalaysiaAreaList[i].region == region){
        this.areaList = this.MalaysiaAreaList[i].area;
      }
    }
  }

  //pass the data back to the categories page
  passDataBack(area){
    this.modalController.dismiss({area: area});
  }

  ngOnInit() {
  }

}
