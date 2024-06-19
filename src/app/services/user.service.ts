import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  registerUser(formValues: any) {
    return this.http.post('http://localhost:3000/users', {
      name: formValues.name,
      userName: formValues.userName,
      email: formValues.email,
      password: formValues.password,
    });
  }

  loginUser(formValues: any) {
    return this.http.post('http://localhost:3000/users/login', {
      email: formValues.email,
      password: formValues.password,
    });
  }

  editUser(formValues: any) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('user_token')
    });

    const token: any = localStorage.getItem('user_token');
    const decodedToken: any = jwtDecode(token);

    const body: any = {};
    for (const key in formValues) {
      if (formValues.hasOwnProperty(key) && formValues[key] !== undefined && formValues[key] !== null && formValues[key] !== '') {
        body[key] = formValues[key];
      }
    }

    return this.http.patch('http://localhost:3000/users/' + decodedToken.sub, body, { headers: headers });
  }

  

  getUser() {
    const token: any = localStorage.getItem('user_token');
    const decodedToken: any = jwtDecode(token);
    return this.http.get(`http://localhost:3000/users/` + decodedToken.sub);
  }

  

  isLoggedIn() {
    if(localStorage.getItem("user_token")) {
      return true
    } else {
      return false
    }
  }
}
