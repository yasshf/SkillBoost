import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private apiUrl = 'http://localhost:8090/api/chatbot/chat'; 

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<string> {
    const body = { message };

    return this.http.post<{ response: string }>(this.apiUrl, body)
      .pipe(
        map(res => res.response)
      );
  }
}
