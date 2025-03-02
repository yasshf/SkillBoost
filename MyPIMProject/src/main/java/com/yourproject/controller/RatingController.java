package com.yourproject.controller;

import com.yourproject.model.Rating;
import com.yourproject.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/rating")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    // Endpoint to add a rating for a course
    @PostMapping("/by-category/{categoryId}/{courseId}/rating")
    public Rating addRating(@PathVariable Long categoryId,
                            @PathVariable Long courseId,
                                @RequestParam int ratingValue) {
        return ratingService.addRating(categoryId, courseId, ratingValue);
    }

    // Endpoint to get the average rating for a course
    @GetMapping("/by-category/{categoryId}/{courseId}/rating")
    public double getAverageRating(@PathVariable Long categoryId,
                                   @PathVariable Long courseId) {
        return ratingService.getAverageRating(categoryId, courseId);
    }
}
