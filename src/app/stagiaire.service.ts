import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StagiaireService {

  private baseUrl = 'http://localhost:8080/api/stagiaires';

  constructor(private http: HttpClient) { }

  getStagiaire(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createStagiaire(customer: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/creer`, customer);
  }

  updateStagiaire(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteStagiaire(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getStagiaireList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/supprimer`, { responseType: 'text' });
  }
}
