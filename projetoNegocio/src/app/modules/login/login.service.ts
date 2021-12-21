import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(user: any){
    return new Promise((resolve) => {
      window.localStorage.setItem('token', 'meu-token');
      // console.log('promise login ativado')
    });
  }
}
