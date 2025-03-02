import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { CoursesComponent } from './courses/courses.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "courses", component: CoursesComponent },
  { path: 'courses/category/:categoryId', component: CoursesComponent }
];