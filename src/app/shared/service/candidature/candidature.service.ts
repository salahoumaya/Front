import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private apiUrl = 'http://localhost:8076/candidatures';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  addCandidature(candidature: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/admin/add-candidature`,
      candidature,
      { headers: this.getHeaders() }
    );
  }

  getCandidatures(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/retrieve-all-candidatures`, { headers: this.getHeaders() });
  }

  getCandidatureById(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/admin/retrieve-candidature/${id}`,
      { headers: this.getHeaders() }
    );
  }
  
  modifyCandidature(candidature: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/admin/modify-candidature`, // Ne pas inclure l'ID ici
      candidature,
      { headers: this.getHeaders() }
    );
  }

  removeCandidature(candidatureId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/admin/remove-candidature/${candidatureId}`,
      { headers: this.getHeaders() }
    );
  }
}
