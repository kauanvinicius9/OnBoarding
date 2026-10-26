package com.backend.onboarding.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {
    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long jwtExpirationMs = 86400000;

    public String generateToken(String email) {
        return Jwts.builder().setSubject(email).setIssueAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs)).signWith(secretKey).compact();

        public String extractEmail(String token) {
            return Jwts.parserBuilder().setSigninKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();
        }

        public boolean validateToken(String token) {
            try {
                Jwts.parserBuilder().setSigninKey(secretKey).build().parseClaimsJws(token);
                return true;
            } catch (Exception e) {
                return false;
            }
        }
    }
}