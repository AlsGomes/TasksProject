package com.als.tasks.resources;

import javax.validation.Valid;

import com.als.tasks.dto.UserInsertDTO;
import com.als.tasks.entities.User;
import com.als.tasks.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/users")
public class UserResource {

    @Autowired
    private UserService service;

    @PostMapping(path = "/signup")
    public ResponseEntity<Void> signUp(@Valid @RequestBody UserInsertDTO objDTO) {
        User obj = service.fromNewDTO(objDTO);
        obj = service.signUp(obj);
        return ResponseEntity.noContent().build();
    }
}
