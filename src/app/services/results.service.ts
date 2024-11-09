import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environments'
import { Result } from '../Result';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Result[]> {
    return this.http.get<{ emotions: Result[] }>(`${this.apiUrl}/analyze_emotions`)
      .pipe(map(response => response.emotions));
  }

  // remove(results: Result[], resultToRemove: Result): Result[] {
  //   return results.filter(result => result.id !== resultToRemove.id);
  // }
}
