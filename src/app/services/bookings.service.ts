import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private http = inject(HttpClient);

  listBookings() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('user_token')
    });

    return this.http.get('http://3.14.151.214:3000/bookings', { headers: headers })

  }

}
