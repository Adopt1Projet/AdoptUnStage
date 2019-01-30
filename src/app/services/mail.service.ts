import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  private baseUrl = 'http://vps641460.ovh.net:8080/api/contact';

  constructor(private http: HttpClient) { }

  sendMail(email: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/sendemail`, email);
  }
}