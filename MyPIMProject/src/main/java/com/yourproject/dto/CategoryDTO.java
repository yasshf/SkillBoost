package com.yourproject.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CategoryDTO {
    private Long id;
    private String name;
    private String categCode;
    private String image;
    private boolean active;
    private LocalDateTime createdAt;
}