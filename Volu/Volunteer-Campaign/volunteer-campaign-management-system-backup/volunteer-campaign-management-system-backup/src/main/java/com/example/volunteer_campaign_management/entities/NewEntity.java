package com.example.volunteer_campaign_management.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor

public class NewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int newId;
    private String title;
    private String content;
    private Timestamp created_at;

}
