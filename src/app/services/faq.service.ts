import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  private baseUrl = 'http://localhost:8080/api/questions';

  constructor(private http: HttpClient) { }

  getQuestion(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getQuestionsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}