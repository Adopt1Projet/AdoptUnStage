import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AideService {

  private baseUrl = 'http://vps641460.ovh.net:8080/api/aide';

  constructor(private http: HttpClient) { }

  getAide(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getAidesList() : Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createAide(username: string, aide: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/creer/${username}`, aide);
  }

  updateAide(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteAide(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/supprimer`, { responseType: 'text' });
  }
  
}
