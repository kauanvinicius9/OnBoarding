package com.backend.onboarding.controller;

import com.backend.onboarding.model.Option;
import com.backend.onboarding.repository.OptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
impor org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")
public class QuizController {
    
    @Autowired
    private OptionRepository optionRepository;

    @PostMapping("/submit")
    public Map<String, Object> submitQuiz(@RequestBody List<Long> selectedOption) {
        int correctCount = 0;

        for (Long optionId : selectedOptionsIds) {
            Option option = optionRepository.findById(optionId).orElse(null);
            if (option != null && option.getIsCorrect()) {
                correctCount++;
            }
        }

        int score = correctCount * 10;
        return Map.of(
            "correctAnswers", correctCount,
            "totalScoreEarned", score,
            "passed", correctCount > 0
        );
    }
}