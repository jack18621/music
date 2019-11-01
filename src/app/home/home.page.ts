import { Component } from '@angular/core';
import { PlatziMusicService } from '../services/platzi-music.service';
import { ModalController } from '@ionic/angular';
import { SongsModalPage } from '../songs-modal/songs-modal.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  singles=[];
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
  currentSong ={};
  newTime;
  playing=false;
  constructor(private musicService:PlatziMusicService, private modalCtrl:ModalController, private storage:Storage) {}

  ionViewDidEnter(){
    this.musicService.getNewReleases().then(newReleases=>{
      this.artists=this.musicService.getArtist();
      this.songs=newReleases.albums.items.filter(e=>e.album_type=="single")
      this.singles.push(this.songs)
      this.albums=newReleases.albums.items.filter(e=>e.album_type=="album")
      console.log(this.albums);
      
    })
  }

  async showSongs(artist){
    
    const songs= await this.musicService.getArtistTopTracks(artist.id);
    
    const modal= await this.modalCtrl.create({
      component:SongsModalPage,
      componentProps:{
        songs:songs.tracks,
        artist:artist.name,
        desc:" - Top tracks"
      }
    });

    modal.onDidDismiss().then(dataReturned=>{
      if(dataReturned.data===""){
        this.storage.get('song')
      }
      else{
        this.song=dataReturned.data
        this.storage.set('song', this.song)
        if( this.playing===true){
          this.pause();
        }
        this.play();
      }
     
    })
    return await modal.present();
  }


  async showAlbumSongs(album, i){
    const albums=await this.musicService.getAlbumTracks(album.id);
    const modal= await this.modalCtrl.create({
      component:SongsModalPage,
      componentProps:{
        songs:albums.items,
        artist:albums.items[i].name,
        desc:" Album"
      }
    })
    modal.onDidDismiss().then(dataReturned=>{
      if(dataReturned.data===""){
        this.storage.get('song')
      }
      else{
        this.song=dataReturned.data
        this.storage.set('song', this.song)
        if( this.playing===true){
          this.pause();
        }
        this.play();
      }
     
    })
    return await modal.present();

    
 }

  async showSong(i){  
   const album=this.singles[0]; 
   console.log(album[i]);
     
   const song=await this.musicService.getAlbumTracks(album[i].id);
   const modal= await this.modalCtrl.create({
    component:SongsModalPage,
    componentProps:{
      songs:song.items,
      artist:album[i].name,
      desc:" (Single)",
      image:album[i].images[0]
    }

   })
   modal.onDidDismiss().then(dataReturned=>{
    if(dataReturned.data===""){
      this.storage.get('song')
    }
    else{
      this.song=dataReturned.data
      this.storage.set('song', this.song)
      if( this.playing===true){
        this.pause();
      }
      this.play();
    }
   
  })
   return await modal.present();

   

 }

  play(){
   this.currentSong= new Audio(this.song.preview_url);
   this.currentSong.play();
   this.currentSong.addEventListener("timeupdate",()=>{
     this.newTime=(this.currentSong.currentTime * (this.currentSong.duration/10))/100
   });
   this.song.playing=true
    this.playing=true
  }

  pause(){
    this.currentSong.pause()
    this.song.playing=false;
    this.playing=false
  }

  parseTime(time="0.00"){
    if(time){
      const partTime=parseInt(time.toString().split(".")[0], 10);
      let minutes=Math.floor(partTime/60).toString();
      if(minutes.length==1){
        minutes="0" + minutes;
      }
      let seconds=(partTime%60).toString();
      if(seconds.length==1){
        seconds="0" + seconds;
      }
      return minutes + ":" + seconds;
    }

  }
}
