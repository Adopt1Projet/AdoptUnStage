import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offre } from 'src/app/Offre';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  // private customersUrl = 'http://localhost:8080/api/customers';  // URL to web api
  private baseUrl = 'http://localhost:8080/api/offre';

  constructor(private http: HttpClient) { }

  getOffres(): Observable<Object> {
    return this.http.get(`${this.baseUrl}`);

  }
  getOffre(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createOffre(offre: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/creer`, offre);
  }

  updateOffre(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteOffre(id): Observable<Offre> {
    return this.http.delete<Offre>(`${this.baseUrl}/${id}`);
  }

  // deleteOffre(offre: Offre | number): Observable<Offre> {
  //   const id = typeof offre === 'number' ? offre : offre.id;
  //   const url = `${this.baseUrl}/${id}`;

  //   return this.http.delete<Offre>(url, httpOptions);
  // }



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
