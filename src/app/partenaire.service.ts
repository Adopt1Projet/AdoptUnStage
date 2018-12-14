import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartenaireService {

  private baseUrl = 'http://localhost:8080/api/partenaires';

  constructor(private http: HttpClient) { }

  getPartenaire(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getPartenairesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}