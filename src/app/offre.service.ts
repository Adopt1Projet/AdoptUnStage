import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  private baseUrl = 'http://localhost:8080/api/offre';

  constructor(private http: HttpClient) { }

  getOffre(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createOffre(offre: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/creer`, offre);
  }

  updateOffre(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteOffre(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getOffresList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getOffreByCodePostal(codePostal: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/codePostal/${codePostal}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/supprimer`, { responseType: 'text' });
  }
}
