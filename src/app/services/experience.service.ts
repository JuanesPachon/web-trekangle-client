import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private http = inject(HttpClient);

  listExperiences(page: number, limit?: number): Observable<any> {
    const queryParams = `?page=${page}${limit ? `&limit=${limit}` : ''}`;
    return this.http.get(`http://3.14.151.214:3000/experiences/${queryParams}`);
  }

  getOneExperience(id: string) {
    return this.http.get(`http://3.14.151.214:3000/experiences/` + id);
  }

  searchExperiences(query: string) {
    const params = new HttpParams().set('query', query);
    return this.http.get(`http://3.14.151.214:3000/search`, { params })
  }

}
