package com.backend.onboarding.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "options")
@Data
public class Option {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;

     @Column(name = "question_id", nullable = false)
     private Long questionId;

     @Column(name = "option_text", nullable = false, columnDefinition = "TEXT")
     private String optionText;

     @Column(name = "is_correct")
     private Boolean isCorrect = false;
}