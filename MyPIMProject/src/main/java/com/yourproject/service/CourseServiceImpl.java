package com.yourproject.service;

import com.yourproject.model.Category;
import com.yourproject.model.Course;
import com.yourproject.repository.CategoryRepository;
import com.yourproject.repository.CourseRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Set;

@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final CategoryRepository categoryRepository;
    private final FileStorageService fileStorageService;
    private final Validator validator;

    @Autowired
    public CourseServiceImpl(
            CourseRepository courseRepository,
            CategoryRepository categoryRepository,
            FileStorageService fileStorageService,
            Validator validator
    ) {
        this.courseRepository = courseRepository;
        this.categoryRepository = categoryRepository;
        this.fileStorageService = fileStorageService;
        this.validator = validator;
    }

    @Override
    public Course createCourseWithCategory(Long categoryId, Course course,
                                           MultipartFile imageFile, MultipartFile pdfFile) throws IOException {
        validateCourse(course);
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));

        if (imageFile != null && !imageFile.isEmpty()) {
            course.setImage(fileStorageService.storeImage(imageFile));
        }

        if (pdfFile != null && !pdfFile.isEmpty()) {
            course.setPdfFileName(fileStorageService.storePdf(pdfFile));
        }

        course.setCategory(category);
        return courseRepository.save(course);
    }

    @Override
    public Course createCourse(Course course, MultipartFile imageFile) throws IOException {
        validateCourse(course);
        if (imageFile != null && !imageFile.isEmpty()) {
            course.setImage(fileStorageService.storeImage(imageFile));
        }
        return courseRepository.save(course);
    }

    @Override
    public Course updateCourse(Long id, Course course, MultipartFile imageFile) throws IOException {
        validateCourse(course);
        Course existingCourse = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));

        if (imageFile != null && !imageFile.isEmpty()) {
            existingCourse.setImage(fileStorageService.storeImage(imageFile));
        }

        existingCourse.setTitle(course.getTitle());
        existingCourse.setDescription(course.getDescription());
        existingCourse.setInstructor(course.getInstructor());
        existingCourse.setDifficultyLevel(course.getDifficultyLevel());

        if (course.getCategory() != null) {
            existingCourse.setCategory(course.getCategory());
        }

        return courseRepository.save(existingCourse);
    }

    @Override
    public Course updateCourseWithCategory(Long categoryId, Long courseId, Course course,
                                           MultipartFile imageFile, MultipartFile pdfFile) throws IOException {
        validateCourse(course);
        Course existingCourse = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + courseId));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));

        if (imageFile != null && !imageFile.isEmpty()) {
            existingCourse.setImage(fileStorageService.storeImage(imageFile));
        }

        if (pdfFile != null && !pdfFile.isEmpty()) {
            existingCourse.setPdfFileName(fileStorageService.storePdf(pdfFile));
        }

        existingCourse.setTitle(course.getTitle());
        existingCourse.setDescription(course.getDescription());
        existingCourse.setInstructor(course.getInstructor());
        existingCourse.setDifficultyLevel(course.getDifficultyLevel());
        existingCourse.setCategory(category);

        return courseRepository.save(existingCourse);
    }

    // Keep all other methods exactly as they were in your original code
    @Override
    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new RuntimeException("Course not found with id: " + id);
        }
        courseRepository.deleteById(id);
    }

    @Override
    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public List<Course> getCoursesByCategoryId(Long categoryId) {
        return courseRepository.findByCategoryId(categoryId);
    }

    @Override
    public List<Course> getCoursesByCategory(Long categoryId) {
        return getCoursesByCategoryId(categoryId);
    }

    private void validateCourse(Course course) {
        Set<ConstraintViolation<Course>> violations = validator.validate(course);
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
    }

    @Override
    public void deleteCourseWithCategory(Long categoryId, Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + courseId));
        if (!course.getCategory().getId().equals(categoryId)) {
            throw new RuntimeException("Course does not belong to the specified category");
        }
        courseRepository.deleteById(courseId);
    }
}