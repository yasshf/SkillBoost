package com.yourproject.service;

import com.yourproject.model.Course;
import com.yourproject.repository.CourseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final CourseRepository courseRepository;
    private final FileStorageService fileStorageService;

    @Autowired
    public EmailService(JavaMailSender mailSender, CourseRepository courseRepository,FileStorageService fileStorageService) {
        this.mailSender = mailSender;
        this.courseRepository = courseRepository;
        this.fileStorageService = fileStorageService;
    }

    public void sendCourseEmail(Long categoryId, Long courseId, String to) throws MessagingException, IOException {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + courseId));

        if (!course.getCategory().getId().equals(categoryId)) {
            throw new RuntimeException("Course does not belong to the specified category");
        }

        String subject = "Course Details: " + course.getTitle();
        String body = "<h3>Course Information</h3>"
                + "<p><strong>Title:</strong> " + course.getTitle() + "</p>"
                + "<p><strong>Instructor:</strong> " + course.getInstructor() + "</p>"
                + "<p><strong>Description:</strong> " + course.getDescription() + "</p>"
                + "<p><strong>Difficulty Level:</strong> " + course.getDifficultyLevel() + "</p>";

        // Create Email Message
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, StandardCharsets.UTF_8.name());

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body, true);
        helper.setFrom("your-email@gmail.com");

        // Attach PDF if available
        if (course.getPdfFileName() != null) {
            File pdfFile = fileStorageService.getPdfFile(course.getPdfFileName()); // Fetch stored PDF
            if (pdfFile.exists()) {
                helper.addAttachment(course.getPdfFileName(), new ByteArrayResource(new FileInputStream(pdfFile).readAllBytes()));
            }
        }

        // Send the email
        mailSender.send(message);
    }
}

