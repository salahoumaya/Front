import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8076';

  constructor(private http: HttpClient) {}
    private getAuthHeaders() {
      const token = localStorage.getItem('token');
      console.log('Token envoyé:', token);

      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ` Bearer ${token}`
    });}

  register(userData: any): Observable<any> {
      console.log('📤 Données envoyées depuis AuthService:', userData);

      return this.http.post(`${this.baseUrl}/auth/register`, userData);
    }

    isUserLoggedIn(): boolean {
      const token = localStorage.getItem('token');
      return token!=null;
    }

    login(credentials: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/auth/login`, credentials);
    }

  refreshToken(token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/refresh`, { token });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forget-password`, { email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password?token=${token}`, { password });
  }
  // 🔹 Nouvelle fonction pour récupérer les données utilisateur
  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Ajouter le token dans l'en-tête Authorization
    });
    return this.http.get(`${this.baseUrl}/adminuser/get-profile`, { headers });
  }
  getCurrentUser(): Observable<any> {
    return this.getProfile();
  }

  // Méthode pour récupérer la liste des modérateurs
  getAllModerators(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/get-all-moderators`); // Effectuer une requête GET
  }

}
