package com.backend.onboarding.controller;

import com.backend.onboarding.model.User;
import com.backend.onboarding.repository.UserProgressRepository;
import com.backend.onboarding.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProgressRepository userProgressRepository;

    @GetMapping("/users")
    public List<User> getAllStudents() { return userRepository.findAll(); }

    @GetMapping("/progress/{userId}")
    public ResponseEntity<?> getStudentProgress(@PathVariable Long userId) {
        var progress = userProgressRepository.findAll();
        return ResponseEntity.ok(progress);
    }
}
