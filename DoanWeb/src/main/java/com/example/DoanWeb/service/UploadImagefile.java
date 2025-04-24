package com.example.DoanWeb.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UploadImagefile {
    String uploadImagefile(MultipartFile file) throws IOException;
}
