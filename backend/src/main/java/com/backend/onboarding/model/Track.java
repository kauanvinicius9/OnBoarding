package com.backend.onboarding.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "track")
@Data
public class Track {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 50)
    private String category;
}
