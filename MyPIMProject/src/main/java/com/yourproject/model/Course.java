package com.yourproject.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(length = 500)
    private String description;

    @Column(nullable = false, length = 100)
    private String instructor;

    @Column(nullable = false, length = 50)
    private String difficultyLevel;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category; // Relationship with Category

    @Column(length = 255) // Field for the image filename
    private String image;

    @Column(length = 255) // New field for the PDF filename
    private String pdfFileName;

    @Column(nullable = false)
    private LocalDateTime createdDate = LocalDateTime.now();
}