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

  // createOffre(offre: Object): Observable<Object> {
  //   return this.http.post(`${this.baseUrl}` + `/creer`, offre);
  // username: String, }

  createOffre(username: string, offre: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/creer/${username}`, offre);
  }
  updateOffre(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
  deleteOffre(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getOffresList(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/mesoffres/${username}`);
  }

  getOffreByCodePostal(codePostal: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/codePostal/${codePostal}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/supprimer`, { responseType: 'text' });
  }
}
