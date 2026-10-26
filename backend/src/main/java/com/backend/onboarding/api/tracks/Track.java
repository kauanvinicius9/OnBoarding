package com.backend.onboarding.api.tracks;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tracks")
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String category;
}