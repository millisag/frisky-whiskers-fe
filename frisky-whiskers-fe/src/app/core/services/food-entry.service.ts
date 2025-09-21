import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface FoodEntry {
  id: number;
  cat_id: number;
  name: string;
  calories: number;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class FoodEntryService {
  constructor(private http: HttpClient) {}

  getFoods(catId: number): Observable<FoodEntry[]> {
    return this.http.get<FoodEntry[]>(`${environment.apiUrl}/cats/${catId}/food_entries`);
  }

  addFood(catId: number, entry: Partial<FoodEntry>): Observable<FoodEntry> {
    return this.http.post<FoodEntry>(`${environment.apiUrl}/cats/${catId}/food_entries`, entry);
  }

  deleteFood(catId: number, entryId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/cats/${catId}/food_entries/${entryId}`);
  }
}

