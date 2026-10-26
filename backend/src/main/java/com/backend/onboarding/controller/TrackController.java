package com.backend.onboarding.controller;

import com.backend.onboarding.repository.TrackRepository;
import com.backend.onboarding.api.tracks.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tracks")
@CrossOrigin(origins = "*")
public class TrackController {

    @Autowired
    private TrackRepository trackRepository;

    @GetMapping
    public List<Track> getAllTracks() {
        return trackRepository.findAll();
    }

    @PostMapping
    public Track createTrack(@RequestBody Track track) {
        return trackRepository.save(track);
    }
} 
