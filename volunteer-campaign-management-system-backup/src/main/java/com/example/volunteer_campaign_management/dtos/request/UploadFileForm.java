package com.example.volunteer_campaign_management.dtos.request;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@AllArgsConstructor

public class UploadFileForm {
    private MultipartFile[] fileDatas;

}
