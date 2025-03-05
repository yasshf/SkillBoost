import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  getAll() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8090/api/tests';

  constructor(private http: HttpClient) {}

  getAllTests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`);
  }

  getTestById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateTest(id: number, test: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, test);
  }

  deleteTest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  createTest(test: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, test);
  }
  
}
