import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  private baseUrl = 'http://localhost:8080/api/entreprise';

  constructor(private http: HttpClient) { }

  getEntreprise(username : String): Observable<Object> {
    return this.http.get(`${this.baseUrl}/getone/${username}`);
  }

  createEntreprise(customer: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/creer`, customer);
  }

  updateEntreprise(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  updateEntreprisePassword(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/password/${id}`, value);
  }

  deleteEntreprise(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getEntrepriseList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/supprimer`, { responseType: 'text' });
  }
}
