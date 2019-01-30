import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  private baseUrl = 'http://vps641460.ovh.net:8080/api/question';

  constructor(private http: HttpClient) { }

  getQuestion(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getQuestionsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createFaq(username: string, faq: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/creer/${username}`, faq);
  }

  updateFaq(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteFaq(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/supprimer`, { responseType: 'text' });
  }
}