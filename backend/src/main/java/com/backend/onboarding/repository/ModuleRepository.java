package com.backend.onboarding.repository;

import com.backend.onboarding.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository 
public interface ModuleRepository extends JpaRepository<Module, Long> { }
