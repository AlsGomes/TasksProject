package com.als.tasks.services;

import java.time.LocalDate;
import java.util.Arrays;

import com.als.tasks.entities.Task;
import com.als.tasks.entities.User;
import com.als.tasks.repositories.TaskRepository;
import com.als.tasks.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DBService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private BCryptPasswordEncoder passEncoder;

    public void instantiateTestDatabase() {

        LocalDate now = LocalDate.now();

        User u1 = new User(1L, "alisson", "als_08.net@hotmail.com", passEncoder.encode("123456"));
        userRepository.save(u1);

        Task t1 = new Task(1L, "Reunião com Ricardo", now, now, u1);
        Task t2 = new Task(2L, "Reunião com Paula", now.plusDays(1), null, u1);
        Task t3 = new Task(3L, "Terminar Curso de React Native", now.plusDays(7), null, u1);
        Task t4 = new Task(4L, "Documentar API de Tasks", now.plusDays(1), null, u1);
        Task t5 = new Task(5L, "Documentar API Telegram Bot", now.plusMonths(1), null, u1);
        Task t6 = new Task(6L, "Alimentar meus gatos amanhã", now.plusDays(1), null, u1);
        Task t7 = new Task(7L, "Mudar de casa", now.plusMonths(3), null, u1);

        taskRepository.saveAll(Arrays.asList(t1, t2, t3, t4, t5, t6, t7));
    }
}