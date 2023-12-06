package com.example.volunteer_campaign_management.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewDTO {
    private int newId;
    private String title;
    private String content;
    private Timestamp created_at;
}
