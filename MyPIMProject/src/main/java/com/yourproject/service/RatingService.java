package com.yourproject.service;

import com.yourproject.model.Rating;
import com.yourproject.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    // Method to add a rating to a course
    public Rating addRating(Long categoryId, Long courseId, int ratingValue) {
        // Create a new rating object using the default constructor
        Rating rating = new Rating();
        rating.setCategoryId(categoryId);
        rating.setCourseId(courseId);
        rating.setRatingValue(ratingValue);

        // Save the rating and return it
        return ratingRepository.save(rating);
    }

    // Method to get the average rating of a course
    public double getAverageRating(Long categoryId, Long courseId) {
        // Get all ratings for the specified course
        List<Rating> ratings = ratingRepository.findByCategoryIdAndCourseId(categoryId, courseId);

        // Calculate the average rating
        return ratings.stream()
                .mapToInt(Rating::getRatingValue)
                .average()
                .orElse(0.0);  // Return 0.0 if no ratings exist
    }
}
