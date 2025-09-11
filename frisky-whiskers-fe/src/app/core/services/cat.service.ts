import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { Cat } from '../../shared/models/cat';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  constructor(private http: HttpClient, private authService: AuthenticationService) {}

  private getUserId(): number | null {
    const token = this.authService.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      console.log('Decoded JWT payload:', decoded);

      // Rails JWT may use "user_id" or "sub"
      return decoded.user_id || decoded.sub || null;
    } catch (err) {
      console.error('Failed to decode token', err);
      return null;
    }
  }

  createCat(catData: Cat, p0: number): Observable<Cat> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('User ID not found in token');
    }

    return this.http.post<Cat>(`${environment.apiUrl}/users/${userId}/cats`, catData, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    });
  }

  getCats(): Observable<Cat[]> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('User ID not found in token');
    }

    return this.http.get<Cat[]>(`${environment.apiUrl}/users/${userId}/cats`, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    });
  }
}

