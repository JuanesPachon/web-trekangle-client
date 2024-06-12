import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private http = inject(HttpClient);

  listExperiences(page: number, limit?: number): Observable<any> {
    const queryParams = `?page=${page}${limit ? `&limit=${limit}` : ''}`;
    return this.http.get(`http://localhost:3000/experiences/${queryParams}`);
  }

  getOneExperience(id: string) {
    return this.http.get(`http://localhost:3000/experiences/` + id);
  }

}
