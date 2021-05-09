package com.als.tasks.services;

import java.util.Optional;

import com.als.tasks.dto.UserInsertDTO;
import com.als.tasks.entities.User;
import com.als.tasks.repositories.UserRepository;
import com.als.tasks.security.UserSS;
import com.als.tasks.services.exceptions.ObjectNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private BCryptPasswordEncoder passEncoder;

    public User signUp(User obj) {
        obj.setId(null);
        return repository.save(obj);
    }

    public User findByEmail(String email) {
        Optional<User> obj = repository.findByEmail(email);
        return obj.orElseThrow(() -> new ObjectNotFoundException(
                String.format("Object with email %s was not found. Type: %s", email, UserService.class.getName())));
    }

    public boolean existsByEmail(String email) {
        return repository.existsByEmail(email);
    }

    public static UserSS authenticated() {
        try {
            return (UserSS) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        } catch (Exception e) {
            return null;
        }
    }

    public User fromNewDTO(UserInsertDTO objDTO) {
        User obj = new User();
        obj.setName(objDTO.getName());
        obj.setEmail(objDTO.getEmail());
        obj.setPassword(passEncoder.encode(objDTO.getPassword()));
        return obj;
    }

}
