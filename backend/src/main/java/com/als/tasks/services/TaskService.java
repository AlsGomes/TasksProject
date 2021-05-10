package com.als.tasks.services;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.als.tasks.dto.TaskInsertDTO;
import com.als.tasks.dto.TaskUpdateDTO;
import com.als.tasks.entities.Task;
import com.als.tasks.entities.User;
import com.als.tasks.repositories.TaskRepository;
import com.als.tasks.services.exceptions.AuthorizationException;
import com.als.tasks.services.exceptions.DataIntegrityException;
import com.als.tasks.services.exceptions.ObjectNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repository;

    @Autowired
    private UserService userService;

    public List<Task> findAll() {
        User user = userService.findByEmail(UserService.authenticated().getUsername());
        return repository.findByUser(user);
    }

    public Task findById(Long id) {
        Optional<Task> obj = repository.findById(id);
        if (!obj.isPresent())
            throw new ObjectNotFoundException(
                    String.format("Object with id %s was not found. Type: %s", id, UserService.class.getName()));

        if (obj.get().getUser().getId() != UserService.authenticated().getId())
            throw new AuthorizationException("Access Denied");

        return obj.get();
    }

    public Task save(Task obj) {
        User user = userService.findByEmail(UserService.authenticated().getUsername());
        obj.setUser(user);
        return repository.save(obj);
    }

    public Task update(Task obj) {
        return repository.save(obj);
    }

    public Task fromNewDTO(TaskInsertDTO objDTO) {
        Task obj = new Task();
        obj.setDesc(objDTO.getDesc());
        obj.setEstimateAt(objDTO.getEstimateAt());
        return obj;
    }

    public Task fromUpdateDTO(@Valid TaskUpdateDTO objDTO) {
        Task obj = findById(objDTO.getId());
        obj.setDoneAt(objDTO.getDoneAt() == null ? null : objDTO.getDoneAt());
        return obj;
    }

    public void delete(Long id) {
        Task obj = findById(id);

        try {
            repository.deleteById(id);
        } catch (DataIntegrityException e) {
            throw new DataIntegrityException(
                    String.format("Could not delete the requested object with id %s. It's already in use. %s", id,
                            Task.class.getName()));
        }

        repository.delete(obj);
    }
}
