import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  private baseUrl = 'http://vps641460.ovh.net:8080/api/colleges';

  constructor(private http: HttpClient) { }

  // College Jean Perrin
  // College Jean de Verrazane
  // College Victor Schoelcher

  getCollegesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getCollege(id : number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/getcollege/${id}`);
  }

  createCollege(college: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/creercollege`, college);
  }

  updateCollege(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/updatecollege/${id}`, value);
  }

  deleteCollege(id : number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/deletecollege/${id}`);
  }
}

