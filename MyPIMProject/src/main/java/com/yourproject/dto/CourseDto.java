package com.yourproject.dto;

import lombok.Data;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class CourseDto {
    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title must be less than 100 characters")
    private String title;

    @Size(max = 500, message = "Description must be less than 500 characters")
    private String description;

    @NotBlank(message = "Instructor is required")
    @Size(max = 100, message = "Instructor name must be less than 100 characters")
    private String instructor;

    @NotBlank(message = "Difficulty level is required")
    private String difficultyLevel;

    // Only include if you're not using path parameter for category ID
    private Long categoryId;
}