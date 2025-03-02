package com.yourproject.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${file.upload-dir.image}")
    private String imageUploadDir;

    @Value("${file.upload-dir.pdf}")
    private String pdfUploadDir;

    private static final List<String> ALLOWED_IMAGE_TYPES = Arrays.asList(
            "image/jpeg", "image/png", "image/gif", "image/webp"
    );

    private static final String PDF_CONTENT_TYPE = "application/pdf";

    public String storeImage(MultipartFile file) throws IOException {
        validateFileType(file, ALLOWED_IMAGE_TYPES, "Image");
        return storeFile(file, imageUploadDir);
    }

    public String storePdf(MultipartFile file) throws IOException {
        validateFileType(file, List.of(PDF_CONTENT_TYPE), "PDF");
        return storeFile(file, pdfUploadDir);
    }

    private String storeFile(MultipartFile file, String targetDir) throws IOException {
        Path uploadPath = Paths.get(targetDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalFilename = file.getOriginalFilename();
        String sanitizedFilename = originalFilename != null ?
                originalFilename.replace(" ", "_") :
                "unnamed_file";

        String fileName = UUID.randomUUID() + "_" + sanitizedFilename;
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);

        return fileName;
    }

    public File getPdfFile(String pdfFileName) {
        String userDir = System.getProperty("user.dir");  // Get the current working directory
        String pdfDirectoryPath = Paths.get(userDir, "uploads", "pdf").toString();  // Create the path to the PDF folder
        return new File(pdfDirectoryPath, pdfFileName);  // Return the File object
    }

    private void validateFileType(MultipartFile file, List<String> allowedTypes, String fileTypeName) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }

        String contentType = file.getContentType();
        if (contentType == null || !allowedTypes.contains(contentType)) {
            throw new IllegalArgumentException(
                    String.format("Invalid %s file type. Allowed types: %s",
                            fileTypeName, allowedTypes)
            );
        }
    }
}