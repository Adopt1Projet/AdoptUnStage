import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StagiaireService {

  private baseUrl = 'http://vps641460.ovh.net:8080/api/stagiaire';

  constructor(private http: HttpClient) { }

  getStagiaire(username: String): Observable<Object> {
    return this.http.get(`${this.baseUrl}/getone/${username}`);
  }

  getAdminStagiaire(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/adminget/${id}`);
  }
  createStagiaire(customer: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/creer`, customer);
  }

  updateStagiaire(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  updateStagiairePassword(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/password/${id}`, value);
  }

  getStagiaireList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  deleteUser(username: String): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteuser/${username}`);
  }

  createFileStagiaire(username: string, file : File): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/creerfile/${username}`, formData, {
      responseType: 'text'
    });
 
    return this.http.request(req);
  }

  changeFileStagiaire(username: string, file : File): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/changefile/${username}`, formData, {
      responseType: 'text'
    });
 
    return this.http.request(req);
  }
}
