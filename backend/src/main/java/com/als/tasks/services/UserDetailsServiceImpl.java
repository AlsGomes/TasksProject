package com.als.tasks.services;

import java.util.Optional;

import com.als.tasks.entities.User;
import com.als.tasks.repositories.UserRepository;
import com.als.tasks.security.UserSS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(email.toLowerCase());
        if (!user.isPresent()) {
            throw new UsernameNotFoundException(email);
        }

        return new UserSS(user.get().getId(), user.get().getEmail(), user.get().getPassword());
    }

}