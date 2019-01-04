import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StagiaireService {

  private baseUrl = 'http://localhost:8080/api/stagiaire';

  constructor(private http: HttpClient) { }

  getStagiaire(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createStagiaire(customer: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`  + `/creer`, customer);
  }

  updateStagiaire(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  getStagiaireList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}