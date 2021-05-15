package com.als.tasks.resources;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/wakeUp")
public class AppResource {

    @GetMapping
    public ResponseEntity<Void> wakeUp() {
        return ResponseEntity.noContent().build();
    }
}