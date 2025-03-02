import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { Rating } from '../models/Rating';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:8080/api/courses';
  private baseUrlRating = 'http://localhost:8080/api/rating';
  apiUrl: any;

  constructor(private http: HttpClient) {}

  createCourse(categoryId: number, courseData: FormData): Observable<Course> {
    return this.http.post<Course>(
      `${this.baseUrl}/by-category/${categoryId}`,
      courseData
    );
  }

  updateCourse(id: number, courseData: FormData): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/${id}`, courseData);
  }

  getCoursesByCategory(categoryId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/by-category/${categoryId}`);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deleteCourseWithCategory(categoryId: number, courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/by-category/${categoryId}/${courseId}`);
  }

  updateCourseWithCategory(categoryId: number, courseId: number, courseData: FormData): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/by-category/${categoryId}/${courseId}`, courseData);
  }
  sendPdfEmail(categoryId: number, courseId: number, email: string): Observable<any> {
    console.log("hiiiii");
    
    return this.http.post(`${this.baseUrl}/by-category/${categoryId}/${courseId}/send-email?email=${email}`, {email});
  }

  addRating(categoryId:string,courseId: number, rating: number): Observable<any> {
    return this.http.post(`${this.baseUrlRating}/by-category/${categoryId}/${courseId}/rating?ratingValue=${rating}`, { rating });
  }

  getRating (categoryId:string,courseId: number,):Observable<any>{
    return this.http.get(`${this.baseUrlRating}/by-category/${categoryId}/${courseId}/rating`,);
  }
  
}