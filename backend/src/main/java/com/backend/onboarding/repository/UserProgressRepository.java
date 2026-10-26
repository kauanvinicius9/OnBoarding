package com.backend.onboarding.repository;

public class UserProgressRepository extends JpaRepository<UserProgress, Long> {
    Optional<UserProgress> findByUserIdAndModuleId(Long, userId, Long, moduleId);
}
