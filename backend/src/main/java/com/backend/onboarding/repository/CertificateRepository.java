package com.backend.onboarding.repository;

import com.backend.onboarding.model.Certificates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificateRepository extends JpaRepository<Certificates, Long> { }
