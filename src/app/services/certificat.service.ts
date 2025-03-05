import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certificat } from '../models/certificat.model';
import { tap } from 'rxjs/operators';  // Ajoute cette ligne pour importer 'tap'
@Injectable({
  providedIn: 'root'
})
export class CertificatService {
  private apiUrl = 'http://localhost:8090/api/certificats'; // Vérifie que l'API tourne bien sur ce port

  constructor(private http: HttpClient) {}

  getAllCertificats(): Observable<Certificat[]> {
    return this.http.get<Certificat[]>(this.apiUrl).pipe(
      tap(data => console.log("Données récupérées :", data)) // Vérification
    );
  }
  getById(id: number): Observable<Certificat> {
    return this.http.get<Certificat>(`${this.apiUrl}/${id}`);
  }

  create(certificat: Certificat): Observable<Certificat> {
    return this.http.post<Certificat>(this.apiUrl, certificat);
  }

  update(id: number, certificat: Certificat): Observable<Certificat> {
    return this.http.put<Certificat>(`${this.apiUrl}/${id}`, certificat);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
