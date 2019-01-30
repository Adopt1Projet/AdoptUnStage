import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  private baseUrl = 'http://vps641460.ovh.net:8080/api/offre';

  constructor(private http: HttpClient) { }

  getOffre(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/uneoffre/${id}`);
  }

  getOffreModifier(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/modifieruneoffre/${id}`);
  }

  // createOffre(offre: Object): Observable<Object> {
  //   return this.http.post(`${this.baseUrl}` + `/creer`, offre);
  // username: String, }

  createOffre(username: string, offre: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/creer/${username}`, offre);
  }
  updateOffre(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
  deleteOffre(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getOffresList(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/mesoffres/${username}`);
  }

  getAllOffres(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/supprimer`, { responseType: 'text' });
  }

  postuler(id_offre: number, username: String, value: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/postuler/${id_offre}/${username}`, value);
  }

  getOffresListStagiaire(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/mesoffresstagiaire/${username}`);
  }

  getOffresListStagiairePourvues(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/mesoffresstagiairepourvues/${username}`);
  }

  getPostulants(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/postulants/${id}`);
  }
}
