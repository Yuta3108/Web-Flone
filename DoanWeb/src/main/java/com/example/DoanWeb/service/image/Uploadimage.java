package com.example.DoanWeb.service.image;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.DoanWeb.service.UploadImagefile;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class Uploadimage implements UploadImagefile {
    private final Cloudinary cloudinary;
    @Override
    public String uploadImagefile(MultipartFile file) throws IOException {
        assert file.getOriginalFilename() != null;
        String publicId = generatePublicValue(file.getOriginalFilename());
        log.info(publicId);
        String extension = getFileName(file.getOriginalFilename())[1];
        log.info(extension);
        File fileupload = convert(file);
        log.info(fileupload.getAbsolutePath());

        cloudinary.uploader().upload(fileupload, ObjectUtils.asMap("public_id", publicId));
        cleanDisk(fileupload);
        return  cloudinary.url().generate(StringUtils.join(publicId,".", extension));
    }
    private void cleanDisk(File file) {
        try {
            log.info("file.toPath(): {}", file.toPath());
            Path filePath = file.toPath();
            Files.delete(filePath);
        } catch (IOException e) {
            log.error("Error");
        }
    }


    private File convert(MultipartFile file) throws IOException {
        assert file.getOriginalFilename() != null;
        File convFile = new File(org.apache.commons.lang3.StringUtils.join(generatePublicValue(file.getOriginalFilename()), getFileName(file.getOriginalFilename())[1]));
        try(InputStream is = file.getInputStream()) {
            Files.copy(is, convFile.toPath());
        }
        return convFile;
    }
     public String generatePublicValue(String originalFileName) {
        String fileName = getFileName(originalFileName)[0];
        return org.apache.commons.lang3.StringUtils.join(UUID.randomUUID().toString().split("-"), fileName);
     }

     public String[] getFileName(String originalFileName) {
         return originalFileName.split("\\.");
     }
}
