package com.yourproject.controller;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ImageController {

    @GetMapping(value = "/images/{filename:.+}", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<FileSystemResource> getImage(@PathVariable String filename) {
        String uploadDir = System.getProperty("user.dir") + "/uploads/images/";
        FileSystemResource file = new FileSystemResource(uploadDir + filename);

        if (!file.exists()) {
            System.out.println("File not found: " + filename);
            return ResponseEntity.notFound().build();
        }

        System.out.println("File found: " + filename);
        return ResponseEntity.ok().body(file);
    }

    @GetMapping(value = "/pdf/{filename:.+}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<FileSystemResource> getPdf(@PathVariable String filename) {
        String uploadDir = System.getProperty("user.dir") + "/uploads/pdf/";
        FileSystemResource file = new FileSystemResource(uploadDir + filename);

        if (!file.exists()) {
            System.out.println("File not found: " + filename);
            return ResponseEntity.notFound().build();
        }

        System.out.println("File found: " + filename);
        return ResponseEntity.ok().body(file);
    }
}