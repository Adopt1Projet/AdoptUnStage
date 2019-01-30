import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartenaireService {

  private baseUrl = 'http://vps641460.ovh.net:8080/api/partenaires';

  constructor(private http: HttpClient) { }

  // getPartenaire(id: number): Observable<Object> {
  //   return this.http.get(`${this.baseUrl}/${id}`);
  // }

  // getPartenairesList(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}`);
  // }

  createCreator(object: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/createCreator`, object);
  }
  updateCreator(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/updateCreator/${id}`, value);
  }
  deleteCreator(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/deleteCreator/${id}`);
  }
  getAllCreators(): Observable<any> {
    return this.http.get(`${this.baseUrl}/creator`);
  }
  getCreator(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}` + `/getCreator/${id}`);
  }

  createFileCreator(nom: String, file : File): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/creerfilecreator/${nom}`, formData, {
      responseType: 'text'
    });
 
    return this.http.request(req);
  }



  createActor(object: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/createActor`, object);
  }
  updateActor(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/updateActor/${id}`, value);
  }
  deleteActor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/deleteActor/${id}`);
  }
  getAllActors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/actor`);
  }
  getActor(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}` + `/getActor/${id}`);
  }

  createFileActor(nom: String, file : File): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/creerfileactor/${nom}`, formData, {
      responseType: 'text'
    });
 
    return this.http.request(req);
  }



  CreateEntreprise(object: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/createEntreprise/`, object);
  }
  updateEntreprise(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/updateEntreprise/${id}`, value);
  }
  deleteEntreprise(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/deleteEntreprise/${id}`);
  }
  getAllEntreprises(): Observable<any> {
    return this.http.get(`${this.baseUrl}/entreprise`);
  }
  getEntreprise(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}` + `/getEntreprise/${id}`);
  }

  createFilePartenaireEntreprise(nom: String, file : File): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/creerfilepartenaireentreprise/${nom}`, formData, {
      responseType: 'text'
    });
 
    return this.http.request(req);
  }
}