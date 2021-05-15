package com.als.tasks.resources;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import com.als.tasks.security.JWTUtil;
import com.als.tasks.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/auth")
public class AuthResource {

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping(value = "/refresh_token")
    public ResponseEntity<Void> refreshToken(HttpServletResponse response) {
        String token = jwtUtil.generateToken(UserService.authenticated().getUsername());
        response.addHeader("Authorization", "Bearer " + token);
        response.addHeader("access-control-expose-headers", "Authorization");
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/validate/{token}")
    public ResponseEntity<String> isTokenValid(@PathVariable String token, HttpServletResponse response)
            throws IOException {
        if (jwtUtil.isTokenValid(token)) {
            return ResponseEntity.ok().body("{\"valid\":true}");
        } else {
            return ResponseEntity.ok().body("{\"valid\":false}");

        }
    }
}