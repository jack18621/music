import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {Plugins, CameraResultType, CameraSource} from "@capacitor/core"
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  userImage="../../assets/noPhoto.png"
  photo: SafeResourceUrl;
  constructor(private sanitizer:DomSanitizer, private storage: Storage) { 

  }

  ionViewDidEnter(){
    this.photo=this.storage.get('photo')
  }

   async takePhoto(){
    const image = await Plugins.Camera.getPhoto({
      quality:100,
      allowEditing:false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    })
    this.photo=this.sanitizer.bypassSecurityTrustResourceUrl(
      image && image.dataUrl
    )
    this.storage.set('photo', this.photo)
  }

}
