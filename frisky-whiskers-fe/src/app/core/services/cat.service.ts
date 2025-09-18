import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cat } from '../../shared/models/cat';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  constructor(private http: HttpClient) {}

  // Get all cats for the currently logged-in user
  getCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(`${environment.apiUrl}/cats`);
  }

  // Create a new cat
  createCat(cat: Omit<Cat, 'id' | 'ownerId'>): Observable<Cat> {
    return this.http.post<Cat>(`${environment.apiUrl}/cats`, { cat });
  }
}

