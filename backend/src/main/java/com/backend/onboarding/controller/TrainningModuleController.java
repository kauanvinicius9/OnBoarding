package com.backend.onboarding.controller;

import com.backend.onboarding.model.Module;
import com.backend.onboarding.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/training/modules")
@CrossOrigin(origins = "*")
public class TrainningModuleController {

    @Autowired
    private ModuleRepository moduleRepository;

    @GetMapping("/{id}/content")
    public ResponseEntity<Module> getModuleTrainingContent(@PathVariable Long id) {return moduleRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());}
}