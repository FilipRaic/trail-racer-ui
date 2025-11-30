import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Application} from '../model/application';

@Injectable({providedIn: 'root'})
export class ApplicationService {
  private readonly apiUrl = '/api/application';
  private readonly getApiUrl = '/api-get/application';

  constructor(private readonly http: HttpClient) {
  }

  getAll(): Observable<Application[]> {
    return this.http.get<Application[]>(this.getApiUrl);
  }

  create(app: Partial<Application>): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, app);
  }

  delete(app: Partial<Application>): Observable<ArrayBuffer> {
    return this.http.delete<ArrayBuffer>(this.apiUrl, {body: app});
  }
}
