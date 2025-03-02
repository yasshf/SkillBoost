package com.yourproject.service;

import com.yourproject.model.Category;
import com.yourproject.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final FileStorageService fileStorageService;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository,
                               FileStorageService fileStorageService) {
        this.categoryRepository = categoryRepository;
        this.fileStorageService = fileStorageService;
    }

    @Override
    public Category createCategory(Category category, MultipartFile imageFile) throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            // Use storeImage instead of storeFile
            String fileName = fileStorageService.storeImage(imageFile);
            category.setImage(fileName);
        }
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long id, Category category, MultipartFile imageFile) throws IOException {
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (imageFile != null && !imageFile.isEmpty()) {
            // Use storeImage instead of storeFile
            String fileName = fileStorageService.storeImage(imageFile);
            existingCategory.setImage(fileName);
        }

        // Update other fields
        existingCategory.setName(category.getName());
        existingCategory.setCategCode(category.getCategCode());
        existingCategory.setStatus(category.getStatus());

        return categoryRepository.save(existingCategory);
    }

    // The rest of the methods remain unchanged
    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}