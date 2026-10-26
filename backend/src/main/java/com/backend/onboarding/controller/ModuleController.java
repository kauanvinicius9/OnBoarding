package com.backend.onboarding.controller;

import com.backend.onboarding.model.Module;
import com.backend.onboarding.repository,ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modules")
@CrossOrigin(origins = "*")
public class ModuleController {
    
    @Autowired
    private ModuleRepository moduleRepository;

    @GetMapping
    publi List<Module> getAllModules() {
        return moduleRepository.findAll();
    }

    @GetMapping("/track/{trackId}")
    public List<Module> getModulesByTrack(@PathVariable Long trackId) {
        return moduleRepository.findByTrackId(trackId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Module> getModuleById(@PathVariable Long id) {
        return moduleRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build())
    }

    @PostMapping
    public Module createModule(@RequestBody Module module) {
        return moduleRepository.save(module);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModule(@PathVariable Long id) {
        if (moduleRepository.existsById(id)) {
            moduleRepository.existsById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
