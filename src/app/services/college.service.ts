import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  private baseUrl = 'http://localhost:8080/api/colleges';

  constructor(private http: HttpClient) { }

  getCollegesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
