package com.yourproject.repository;


import com.yourproject.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByCategoryIdAndCourseId(Long categoryId, Long courseId);
    // Custom queries can be added here if needed
}
