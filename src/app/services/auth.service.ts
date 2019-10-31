import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private storage:Storage) { }
  async loginUser(credentials) {
     const user= await this.storage.get('user')
    return new Promise((accept, reject) => {
    if (credentials.email == user.email && btoa(credentials.password)== user.password){
      accept("Login correcto");
    }
    else{
      reject("Login incorrecto")
    }

  })
}

registarUser(userData){
  userData.password=btoa(userData.password)
 return this.storage.set('user',userData)

}
}
