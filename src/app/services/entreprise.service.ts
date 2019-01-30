import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  private baseUrl = 'http://vps641460.ovh.net:8080/api/entreprise';

  constructor(private http: HttpClient) { }

  getEntreprise(username: String): Observable<Object> {
    return this.http.get(`${this.baseUrl}/getone/${username}`);
  }

  createEntreprise(customer: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/creer`, customer);
  }

  createFileEntreprise(username: string, file : File): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/creerfile/${username}`, formData, {
      responseType: 'text'
    });
 
    return this.http.request(req);
  }

  changeFileEntreprise(username: string, file : File): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/changefile/${username}`, formData, {
      responseType: 'text'
    });
 
    return this.http.request(req);
  }

  updateEntreprise(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  updateEntreprisePassword(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/password/${id}`, value);
  }

  getEntrepriseList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  deleteUser(username: String): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteuser/${username}`);
  }

  getEntreprisesActives(): Observable<any> {
    return this.http.get(`${this.baseUrl}/actives`);
  }

}
