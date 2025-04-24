package com.example.DoanWeb.controller;

import com.example.DoanWeb.service.UploadImagefile;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequestMapping ("/api/upload")
@RestController
@RequiredArgsConstructor
public class UploadFileController {
    private final UploadImagefile uploadImagefile;

    @PostMapping("/image")
    public String uploadImagefile(@RequestParam("file")MultipartFile file) throws IOException {
        return uploadImagefile.uploadImagefile(file);
    }
}
