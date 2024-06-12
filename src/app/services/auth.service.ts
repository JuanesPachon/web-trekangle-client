import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  setToken(token: string) {
    localStorage.setItem('user_token', token);
  }
  
  removeToken() {
    localStorage.removeItem('user_token');
    return;
  }

  

}
