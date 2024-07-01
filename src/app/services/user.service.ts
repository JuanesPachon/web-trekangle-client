import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  registerUser(formValues: any) {
    return this.http.post('https://web-trekangle-server.onrender.com/users', {
      name: formValues.name,
      userName: formValues.userName,
      email: formValues.email,
      password: formValues.password,
    });
  }

  loginUser(formValues: any) {
    return this.http.post('https://web-trekangle-server.onrender.com/users/login', {
      email: formValues.email,
      password: formValues.password,
    });
  }

  editUser(formData: FormData) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('user_token'),
    });

    const token: any = localStorage.getItem('user_token');
    if (!token) {
      throw new Error('Token not found');
    }
    const decodedToken: any = jwtDecode(token);

    const filteredFormData = this.filterFormData(formData);

    console.log('hasta aqui funciona');

    return this.http.patch(
      'https://web-trekangle-server.onrender.com/users/' + decodedToken.sub,
      filteredFormData,
      { headers: headers }
    );
  }

  filterFormData(formData: FormData): FormData {
    const filteredFormData = new FormData();

    formData.forEach((value, key) => {
      if (value !== '' && value !== null && value !== undefined) {
        filteredFormData.append(key, value);
      }
    });

    return filteredFormData;
  }

  getUser() {
    const token: string | null = localStorage.getItem('user_token');

    if (!token) {
      return null;
    }

    const decodedToken: any = jwtDecode(token);
    return this.http.get(`https://web-trekangle-server.onrender.com/users/` + decodedToken.sub);
  }

  isLoggedIn() {
    if (localStorage.getItem('user_token')) {
      return true;
    } else {
      return false;
    }
  }
}
