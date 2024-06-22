import { Injectable } from '@angular/core';

import { Result } from '../Result';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private apiUrl = 'http://localhost:3000/result1'

  constructor(private http: HttpClient) { }

  remove(results: Result[], result: Result){
    return results.filter((r) => result.id !== r.id);
  }

  getAll(): Observable<Result[]>{
    return this.http.get<Result[]>(this.apiUrl)
  }
}
