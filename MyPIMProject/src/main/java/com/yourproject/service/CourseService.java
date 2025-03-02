package com.yourproject.service;

import com.yourproject.model.Course;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CourseService {
    Course createCourseWithCategory(Long categoryId, Course course, MultipartFile imageFile, MultipartFile pdfFile) throws IOException;
    Course createCourse(Course course, MultipartFile imageFile) throws IOException;
    Course updateCourse(Long id, Course course, MultipartFile imageFile) throws IOException;
    void deleteCourse(Long id);
    Course getCourseById(Long id);
    void deleteCourseWithCategory(Long categoryId, Long courseId);
    List<Course> getAllCourses();
    Course updateCourseWithCategory(Long categoryId, Long courseId, Course course, MultipartFile imageFile, MultipartFile pdfFile) throws IOException;

    List<Course> getCoursesByCategory(Long categoryId);

    List<Course> getCoursesByCategoryId(Long categoryId);
}