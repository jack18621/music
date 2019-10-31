import { Component } from '@angular/core';
import { PlatziMusicService } from '../services/platzi-music.service';
import { ModalController } from '@ionic/angular';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  artists=[];
  albums=[];
  songs=[];
  slideOps={
    initialSlide:2,
    slidesPerView:4,
    centeredSlides:true,
    speed:400

  }
  song={};

  constructor(private musicService:PlatziMusicService, private modalCtrl:ModalController) {}

  ionViewDidEnter(){
    this.musicService.getNewReleases().then(newReleases=>{
      this.artists=this.musicService.getArtist();
      this.songs=newReleases.albums.items.filter(e=>e.album_type=="single")
      this.albums=newReleases.albums.items.filter(e=>e.album_type=="album")
    })
  }

  async showSongs(artist){
    console.log(artist);
    
    const songs= await this.musicService.getArtistTopTracks(artist.id);
    const modal= await this.modalCtrl.create({
      component:SongsModalPage,
      componentProps:{
        songs:songs.tracks,
        artist:artist.name
      }
    });

    modal.onDidDismiss().then(dataReturned=>{
      this.song=dataReturned.data
    })
    return await modal.present();
  }

  play(){
   this.currentSong= new Audio(this.song.preview_url);
   this.currentSong.play()
    this.song.playing=true
  }

  pause(){
    this.currentSong.pause()
    this.song.playing=false
  }
}
