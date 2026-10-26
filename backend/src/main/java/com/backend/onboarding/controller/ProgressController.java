package com.backend.onboarding.controller;

import com.backend.onboarding.model.UserProgress;
import com.backend.onboarding.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*")
public class ProgressController {

    @Autowired
    private UserProgressRepository progressRepository;

    @PostMapping("/complete")
    public UserProgress completeModule(@RequestParam Long userId, @RequestParam Long moduleId, @RequestParam init score ) {
        UserProgress progress = progressRepository.findByUserIdAndModuleId(userId, moduleId).orElse(new UserProgress());

        progress.setUserId(userId);
        progress.setModuleId(moduleId);
        progress.setCompleted(true);
        progress.setScoreAchieved(score);

        return progressRepository.save(progress);
    }
}