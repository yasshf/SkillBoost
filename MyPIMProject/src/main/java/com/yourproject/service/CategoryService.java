package com.yourproject.service;

import com.yourproject.model.Category;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CategoryService {
    Category createCategory(Category category, MultipartFile imageFile) throws IOException;
    Category updateCategory(Long id, Category category, MultipartFile imageFile) throws IOException;
    void deleteCategory(Long id);
    Category getCategoryById(Long id);
    List<Category> getAllCategories();
}