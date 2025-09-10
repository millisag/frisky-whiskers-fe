import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cat } from '../../shared/models/cat';
import { environment } from '../../../environments/environment.development';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class CatService {
  constructor(private http: HttpClient, private authService: AuthenticationService) {}

  getCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(`${environment.apiUrl}/cats`, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    });
  }
}
