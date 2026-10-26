package com.backend.onboarding.controller;

import com.backend.onboarding.model.Certificates;
import com.backend.onboarding.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.cert.Certificate;
import java.util.UUID;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = "*")
public class CertificateController {
    
    @Autowired
    private CertificateRepository certificateRepository;

    @PostMapping("/generate")
    public Certificate generateCertificate(@RequestParam Long userId, @RequestParam Long trackId) {
        Certificate cert = new Certificate();
        cert.setUserId(userId);
        cert.setTrackId(trackId);
        cert.setCertificateCode("CERT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        return certificateRepository.save(cert);
    }
}