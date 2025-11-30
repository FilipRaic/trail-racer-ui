import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Race} from '../model/race';

@Injectable({providedIn: 'root'})
export class RaceService {
  private readonly apiUrl = '/api/race';
  private readonly getApiUrl = '/api-get/race';

  constructor(private readonly http: HttpClient) {
  }

  getAll(): Observable<Race[]> {
    return this.http.get<Race[]>(this.getApiUrl);
  }

  getById(id: string): Observable<Race> {
    return this.http.get<Race>(`${this.getApiUrl}/${id}`);
  }

  create(race: Partial<Race>): Observable<Race> {
    return this.http.post<Race>(this.apiUrl, race);
  }

  update(race: Partial<Race>): Observable<Race> {
    return this.http.patch<Race>(`${this.apiUrl}`, race);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
