import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { CourseService } from '../../services/course.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
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
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-create-course-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatCardModule,
    MatGridListModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-course-dialog.component.html',
  styleUrls: ['./create-course-dialog.component.css']
})
export class CreateCourseDialogComponent {
  courseForm: FormGroup;
  categories: Category[] = [];
  difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];
  imageFile: File | null = null;
  pdfFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CreateCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categoryId: number,isEdit:boolean,course: Course}
  ) {
    
    this.courseForm = this.fb.group({
      title: [this.data?.course?.title || '', [Validators.required, Validators.maxLength(100)]],
      description: [this.data?.course?.description || '', [Validators.required, Validators.maxLength(500)]],
      instructor: [this.data?.course?.instructor || '', Validators.required],
      difficultyLevel: [this.data?.course?.difficultyLevel || '', Validators.required],
      categoryId: [data?.categoryId || '', Validators.required]
    });

    if (!data.categoryId) {
      this.loadCategories();
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Only JPG/PNG files are allowed!');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB!');
        return;
      }
      this.imageFile = file;
    }
  }

  onFilePdfSelected(event: any): void {
    const file = event.target.files[0];
    
    if (file) {
      // Validate file type (Allow only PDF)
      if (file.type !== 'application/pdf') {
        alert('Only PDF files are allowed!');
        return;
      }
  
      // Validate file size (Max: 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB!');
        return;
      }
  
      this.pdfFile = file;
    }
  }
  

  onSubmit(): void {
    if (this.courseForm.valid) {
      const formData = new FormData();
      const formValue = this.courseForm.value;
      const categoryId = this.data.categoryId || formValue.categoryId;

     
      formData.append('course', new Blob([JSON.stringify({title:formValue.title,description:formValue.description,instructor:formValue.instructor,difficultyLevel:formValue.difficultyLevel })], { type: 'application/json' }));
      if(this.imageFile)
      formData.append('image', this.imageFile);
      if(this.pdfFile)
        formData.append('pdf', this.pdfFile);
      if(this.data?.isEdit)
        {
        this.courseService.updateCourseWithCategory(this.data.categoryId, this.data.course.id!, formData).subscribe({
          next: (updatedCourse) => {
            this.dialogRef.close();
          },
          error: (err) => console.error('Error updating course:', err)
        });
      }
      else
      this.courseService.createCourse(categoryId, formData).subscribe({
        next: (createdCourse) => this.dialogRef.close(createdCourse),
        error: (err) => {
          console.error('Error creating course:', err);
          
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}