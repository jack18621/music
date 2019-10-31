import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm:FormGroup; 
  errorMessage:string="";
  constructor(  private formBuilder: FormBuilder, private authService:AuthService, private navCtrl:NavController, private storage:Storage ) {
    
    this.registerForm=formBuilder.group({
      nombre:new FormControl("", Validators.compose([
        Validators.required
      ])),
      apellido:new FormControl("", Validators.compose([
        Validators.required
      ])),
      email:new FormControl("", Validators.compose([
        Validators.required,
        Validators.email
      ])
      ),
      password:new FormControl("",Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])) 
    }
    )
  }

  ngOnInit() {
  }

  registerUser(userData){
    console.log(userData );
    this.authService.registarUser(userData).then(()=>{
      this.navCtrl.navigateBack('/login')
    
    })
    
    

  }

  goToLogin(){
    
    this.navCtrl.navigateBack('/login')
  }

}
