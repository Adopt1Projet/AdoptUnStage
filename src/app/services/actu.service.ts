import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActuService {

  private baseUrl = 'http://localhost:8080/api/actus';

  constructor(private http: HttpClient) { }

  getActu(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getActusList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createActu(username: string, actu: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/creer/${username}`, actu);
  }

  updateActu(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteActu(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/supprimer`, { responseType: 'text' });
  }
}
