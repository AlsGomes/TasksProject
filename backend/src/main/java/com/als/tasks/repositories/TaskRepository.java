package com.als.tasks.repositories;

import java.util.List;

import javax.transaction.Transactional;

import com.als.tasks.entities.Task;
import com.als.tasks.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

    @Transactional
    List<Task> findByUser(User user);
}
