package com.als.tasks.services;

import java.util.Arrays;

import com.als.tasks.entities.User;
import com.als.tasks.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DBService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passEncoder;

    public void instantiateTestDatabase() {
        User u1 = new User(1L, "alisson", "als_08.net@hotmail.com", passEncoder.encode("123456"));
        userRepository.saveAll(Arrays.asList(u1));
    }
}