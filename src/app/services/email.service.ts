import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:8090/api/email';

  constructor(private http: HttpClient) { }

  sendCertificatEmailWithAttachment(to: string, subject: string, message: string, file: Blob, filename: string): Observable<any> {
    const formData = new FormData();
    formData.append('to', to);
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('filePath', filename);
    console.log(filename)
  
    return this.http.post(`${this.apiUrl}/send-certificat-with-attachment`, formData, { responseType: 'text' });
  }
  
}
