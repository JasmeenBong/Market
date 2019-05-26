import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.page.html',
  styleUrls: ['./filter-modal.page.scss'],
})
export class FilterModalPage implements OnInit {

  selectedPrice;
  selectedPostTime;
  
  constructor(private modalController: ModalController) { }

  closeModal(){
    this.modalController.dismiss();
  }

  passDataBack(price,postTime){
    this.modalController.dismiss({price: price, postTime: postTime});
  }


  ngOnInit() {
  }

}
