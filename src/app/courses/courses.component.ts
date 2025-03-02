import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateCourseDialogComponent } from '../create-course-dialog/create-course-dialog.component';
import { CourseService } from '../../services/course.service';
import { CategoryService } from '../../services/category.service';
import { Course } from '../../models/course.model';
import { Category } from '../../models/category.model';
import { switchMap } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    MatCardModule,
    MatGridListModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule // <-- Add FormsModule here
  ],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  categories: Category[] = [];
  currentCategoryId: number | null = null;
  imageFile: File | null = null;
  isEditMode: boolean = false;
  searchQuery: string = ''; // For search query
  paginatedCourses: Course[] = []; // For paginated courses
  currentPage: number = 1; // Track current page
  totalPages: number = 1; // Total pages for pagination
  ratingCache: { [key: number]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadCourses();
  }

  private loadCourses(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.currentCategoryId = params.get('categoryId') ? +params.get('categoryId')! : null;
        return this.currentCategoryId 
          ? this.courseService.getCoursesByCategory(this.currentCategoryId)
          : this.courseService.getAllCourses();
      })
    ).subscribe({
      next: (data) => {
        console.log("data  ",data);
        
        // Default course rating to 0 if not defined
        this.courses = data.map(course => ({
          ...course,
          rating: course.rating ?? 0 // Default to 0 if rating is undefined
        }));
        data.forEach((v)=>
          this.courseService.getRating(v.category.id, v.id!).subscribe({
            next: (rating) => {
              this.ratingCache[v.id!] = rating|| 0; 
            },
            error: (err) =>  this.ratingCache[v.id!] =  0
          })
        )
        this.totalPages = Math.ceil(this.courses.length / 6); // Assuming 6 courses per page
        this.paginateCourses();
      },
      error: (err) => console.error('Error loading courses:', err)
    });
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  getCategoryName(categoryId: number): string {
    return this.categories.find(c => c.id === categoryId)?.name || 'Unknown Category';
  }

  openCreateCourseDialog(): void {
    this.isEditMode = false;
    const dialogRef = this.dialog.open(CreateCourseDialogComponent, {
      width: '600px',
      data: { categoryId: this.currentCategoryId }
    });

    dialogRef.afterClosed().subscribe(result => {
        this.loadCourses(); 
    });
  }

  navigateToCategory(categoryId: number): void {
    this.router.navigate(['/courses/category', categoryId]);
  }

  deleteCourse(categoryId: number | undefined, courseId: number | undefined): void {
    if (categoryId === undefined || courseId === undefined) {
      console.error('Error: categoryId or courseId is undefined');
      return;
    }

    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourseWithCategory(categoryId, courseId).subscribe({
        next: () => {
          this.courses = this.courses.filter(course => course.id !== courseId);
        },
        error: err => console.error('Error deleting course:', err)
      });
    }
  }

  openUpdateCourseDialog(course: Course): void {
    this.isEditMode = true;
    const dialogRef = this.dialog.open(CreateCourseDialogComponent, {
      width: '600px',
      data: { course, categoryId: course.category.id, isEdit: true }
    });
  
    dialogRef.afterClosed().subscribe(() => {this.loadCourses()});
  }

  confirmDownload(course: Course): void {
    if (course.pdfFileName) {
      if (confirm('Are you sure you want to download this PDF?')) {
        this.downloadPDF(course.pdfFileName);
      }
    } 
  }

  downloadPDF(pdfFile: string): void {
    const pdfUrl = `http://localhost:8080/api/pdf/${pdfFile}`;
    window.open(pdfUrl, '_blank');
  }

  sendMail(course: Course): void {
    console.log("course ", course);
    this.courseService.sendPdfEmail(course.category.id, course.id!, "yassin23hfaiedh@gmail.com").subscribe();
  }

  onSearchChange(): void {
    this.currentPage = 1; // Reset to first page on search
    this.paginateCourses();
  }

  paginateCourses(): void {
    const filteredCourses = this.courses.filter(course => 
      course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    const startIndex = (this.currentPage - 1) * 6;
    this.paginatedCourses = filteredCourses.slice(startIndex, startIndex + 6);
    this.totalPages = Math.ceil(filteredCourses.length / 6); // Update total pages based on filtered results
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateCourses();
    }
  }

  rateCourse(course: Course, rating: number): void {
    if (rating >= 1 && rating <= 5) {
      this.courseService.addRating(course.category.id,course.id!, rating).subscribe({
        next: (updatedCourse) => {
          course.rating = updatedCourse.rating; // Update the course rating locally
          this.ratingCache[course.id!]=rating
        },
        error: (err) => console.error('Error rating course:', err)
      });
    } else {
      console.error('Invalid rating. Please provide a rating between 1 and 5.');
    }
  }

  getRating(course: Course): number {
    console.log("hiiiii");
    
      return 0; // Return default value before the API call resolves
    
  }
  
}
