package com.backend.onboarding.controller;

import com.backend.onboarding.model.Certificates;
import com.backend.onboarding.model.UserProgress;
import com.backend.onboarding.repository.CertificateRepository;
import com.backend.onboarding.repository.ModuleRepository;
import com.backend.onboarding.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/training/progress")
@CrossOrigin(origins = "*")
public class TrainingProgressController {

    @Autowired
    private UserProgressRepository progressRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private CertificateRepository certificateRepository;

    @PostMapping("/finish-module")
    public ResponseEntity<?> finishModule(@RequestParam Long userId, @RequestParam Long moduleId, @RequestParam Long trackId) {
        UserProgress progress = progressRepository.findByUserIdAndModuleId(userId, moduleId).orElse(new UserProgress());
        
        progress.setUserId(userId);
        progress.setModuleId(moduleId);
        progress.setCompleted(true);
        progressRepository.save(progress);

        List<Module> allModulesInTrack = moduleRepository.findByTrackId(trackId);
        List<UserProgress> userCompletedModules = progressRepository.findByUserId(userId); 

        boolean completedAll = allModulesInTrack.stream().allMatch(m -> userCompletedModules.stream().anyMatch(p -> p.getModuleId().equals(m.getId()) && p.getCompleted()));

        if (completedAll) {
            boolean alreadyHasCertificate = certificateRepository.existsByUserIdAndTrackId(userId, trackId);
            
            if (!alreadyHasCertificate) {
                Certificates cert = new Certificates();
                cert.setUserId(userId);
                cert.setTrackId(trackId);
                cert.setCertificateCode("CERT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
                certificateRepository.save(cert);
                
                return ResponseEntity.ok(Map.of(
                    "message", "Módulo concluído e Trilha finalizada com sucesso!",
                    "certificateGenerated", true,
                    "certificateCode", cert.getCertificateCode()
                ));
            }
        }

        return ResponseEntity.ok(Map.of(
            "message", "Módulo concluído com sucesso! Próximo módulo liberado.",
            "certificateGenerated", false
        ));
    }
}