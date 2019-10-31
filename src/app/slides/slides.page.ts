import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  
  slideOpts={
    initialSlide:0,
    slidesPerView:1,
    centeredSlides:true,
    speed:400
  }

  slides=[{
    title:'Escucha tu musica',
    subtitle:'En cualquier lugar',
    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam incidunt atque debitis beatae molestias ratione labore perferendis? Alias iste eligendi, reiciendis cupiditate reprehenderit vero ut enim quia labore ducimus soluta.'

  },
  {
    title:'los mejores artistas',
    subtitle:'Del mundo',
    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam incidunt atque debitis beatae molestias ratione labore perferendis? Alias iste eligendi, reiciendis cupiditate reprehenderit vero ut enim quia labore ducimus soluta.'

  },
  {
    title:'Al alcance de tu mano',
    subtitle:'Con platzi music',
    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam incidunt atque debitis beatae molestias ratione labore perferendis? Alias iste eligendi, reiciendis cupiditate reprehenderit vero ut enim quia labore ducimus soluta.'


  }]

  constructor(private router: Router, private storage:Storage ) { }

  ngOnInit() {
  }

  finish(){
    this.storage.set('isIntroShowed', true)
    this.router.navigateByUrl('/home')
  }

}
