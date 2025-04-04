import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Examen {
  id?: number;
  titre: string;
  note: number;
  examenT: 'ORAL' | 'ECRIT';
  session: 'PRINCIPALE' | 'CONTROLE';
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  private apiUrl = 'http://localhost:8076/examens'; 

  constructor(private http: HttpClient) {}
  private getToken(): string | null {
    return localStorage.getItem('token'); 
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const token = this.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
  assignUserToExamen(examenId: number, userId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${examenId}/assign/${userId}`, {},{responseType:'text' as 'json', headers: this.getHeaders()});
  }
  calcul(examenId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${examenId}/calcul`, {},{responseType:'text' as 'json', headers: this.getHeaders()});
  }
  addnote(examenId: number, userId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${examenId}/note/${userId}`, {},{responseType:'text' as 'json', headers: this.getHeaders()});
  }
    getAllexsuser(number:any): Observable<Examen[]> {
      return this.http.get<Examen[]>(this.apiUrl+"/buuser/"+number, { headers: this.getHeaders() });
    }
  getExamens(): Observable<Examen[]> {
    return this.http.get<Examen[]>(this.apiUrl, { headers: this.getHeaders() });
  }
  getExamensbyfor(id:number): Observable<Examen[]> {
    return this.http.get<Examen[]>(this.apiUrl+"/byformation?id="+id, { headers: this.getHeaders() });
  }
  addExamen(examen: Examen, formationId: number): Observable<Examen> {
    return this.http.post<Examen>(`${this.apiUrl}/${formationId}`, examen, { headers: this.getHeaders() });
  }
  getmoyenne(formationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get/${formationId}`, { headers: this.getHeaders() });
  }
  updateExamen(id: number, examen: Examen): Observable<Examen> {
    return this.http.put<Examen>(`${this.apiUrl}/${id}`, examen, { headers: this.getHeaders() });
  }

  deleteExamen(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`, { headers: this.getHeaders(),responseType:'text' as 'json' });
  }

  participerExamen(examenId: number, userId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${examenId}/participer/${userId}`, {}, { headers: this.getHeaders() });
  }

  getParticipants(examenId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${examenId}/participants`, { headers: this.getHeaders() });
  }
}
