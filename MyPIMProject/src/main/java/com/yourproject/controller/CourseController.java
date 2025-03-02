package com.yourproject.controller;

import com.yourproject.model.Course;
import com.yourproject.service.CourseService;
import com.yourproject.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/courses")
@Validated // Enable method-level validation
public class CourseController {

    private final CourseService courseService;
    private final EmailService emailService;


    @Autowired
    public CourseController(CourseService courseService, EmailService emailService) {
        this.courseService = courseService;
        this.emailService = emailService;

    }

    // Create a new course with category association
    @PostMapping("/by-category/{categoryId}")
    public ResponseEntity<Course> createCourseWithCategory(
            @PathVariable @NotNull Long categoryId,
            @RequestPart("course") @Valid Course course,
            @RequestPart("image") @NotNull MultipartFile imageFile,
            @RequestPart("pdf") @NotNull MultipartFile pdfFile) throws IOException {
        Course createdCourse = courseService.createCourseWithCategory(categoryId, course, imageFile, pdfFile);
        return new ResponseEntity<>(createdCourse, HttpStatus.CREATED);
    }

    // Update a course within a specific category
    @PutMapping("/by-category/{categoryId}/{courseId}")
    public ResponseEntity<Course> updateCourseWithCategory(
            @PathVariable @NotNull Long categoryId,
            @PathVariable @NotNull Long courseId,
            @RequestPart("course") @Valid Course course,
            @RequestPart(value = "image", required = false) MultipartFile imageFile,
            @RequestPart(value = "pdf", required = false) MultipartFile pdfFile) throws IOException {
        Course updatedCourse = courseService.updateCourseWithCategory(categoryId, courseId, course, imageFile, pdfFile);
        return ResponseEntity.ok(updatedCourse);
    }
    // Delete a course within a specific category
    @DeleteMapping("/by-category/{categoryId}/{courseId}")
    public ResponseEntity<Void> deleteCourseWithCategory(
            @PathVariable @NotNull Long categoryId,
            @PathVariable @NotNull Long courseId) {
        courseService.deleteCourseWithCategory(categoryId, courseId);
        return ResponseEntity.noContent().build();
    }

    // Get all courses
    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    // Get a course by ID
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable @NotNull Long id) {
        Course course = courseService.getCourseById(id);
        return ResponseEntity.ok(course);
    }

    // Get courses by category ID
    @GetMapping("/by-category/{categoryId}")
    public ResponseEntity<List<Course>> getCoursesByCategoryId(@PathVariable @NotNull Long categoryId) {
        List<Course> courses = courseService.getCoursesByCategoryId(categoryId);
        return ResponseEntity.ok(courses);
    }

        @PostMapping("/by-category/{categoryId}/{courseId}/send-email")
    public ResponseEntity<String> sendCourseEmail(
            @PathVariable @NotNull Long categoryId,
            @PathVariable @NotNull Long courseId,
            @RequestParam String email) {
        try {
            emailService.sendCourseEmail(categoryId, courseId, email);
            return ResponseEntity.ok("Email sent successfully to " + email);
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email: " + e.getMessage());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}