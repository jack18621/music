import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage{
  songs:any[];
  artist:string;
  desc:string;
  noSong:any="";
  image;

  constructor(private navParams:NavParams, private modalController: ModalController, private router: Router) { }

  ionViewDidEnter(){
    this.songs=this.navParams.data.songs;
    this.artist=this.navParams.data.artist;
    this.desc=this.navParams.data.desc;
    this.image=this.navParams.data.image;
    console.log(this.image);
    
   
    
  }

  async selectSong(song){
    await this.modalController.dismiss(song)

  }

  close(noSong){
    this.modalController.dismiss(noSong)
  }

}
