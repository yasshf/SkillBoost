import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cources',
  imports: [CommonModule],
  templateUrl: './cources.component.html',
  styleUrl: './cources.component.css'
})
export class CourcesComponent implements OnInit {
  categories: Category[] = [];
   constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error fetching categories', err)
    });
  }

}
