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

  //close modal
  closeModal(){
    this.modalController.dismiss();
  }

  //pass the price and time selected to the categories page
  passDataBack(price,postTime){
    this.modalController.dismiss({price: price, postTime: postTime});
  }


  ngOnInit() {
  }

}
