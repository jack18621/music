import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  loginForm:FormGroup; 
  errorMessage:string="";
  constructor(  private formBuilder: FormBuilder, private authService:AuthService, private navCtrl:NavController, private storage:Storage ) {
    
    this.loginForm=formBuilder.group({
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

    console.log(this.loginForm);

   /*  this.validation_messages = {
      email: [
        { type: "required", message: `${this.loginForm.controls['email'].errors.required}`},
        { type: "email", message: "ojo! este no es un email válido" }
      ],
      password: [
        { type: "required", message: " El password es requerido" },
        { type: "minlength", message: "Minimo 5 letras para el password" }
      ]
    }; */
    
   }

  ngOnInit() {
  }

  goToRegister(){
    this.navCtrl.navigateForward("/register")
  }

  loginUser(value){
  
    this.authService.loginUser(value).then(res=>{
      this.errorMessage="";
      this.storage.set('isUserLoggedIn',true)
      this.navCtrl.navigateForward("/menu/home");
    }).catch(err=>{
      this.errorMessage=err;
      console.log(err);
      
    })
    
  }

}
