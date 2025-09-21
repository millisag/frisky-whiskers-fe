import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ActivityEntry {
  id: number;
  cat_id: number;
  activity_type: string;
  duration: string;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class ActivityEntryService {
  constructor(private http: HttpClient) {}

  getActivities(catId: number): Observable<ActivityEntry[]> {
    return this.http.get<ActivityEntry[]>(`${environment.apiUrl}/cats/${catId}/activity_entries`);
  }

  addActivity(catId: number, entry: Partial<ActivityEntry>): Observable<ActivityEntry> {
    return this.http.post<ActivityEntry>(`${environment.apiUrl}/cats/${catId}/activity_entries`, entry);
  }

  deleteActivity(catId: number, entryId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/cats/${catId}/activity_entries/${entryId}`);
  }
}
