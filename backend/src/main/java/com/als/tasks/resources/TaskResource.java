package com.als.tasks.resources;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.als.tasks.dto.TaskDTO;
import com.als.tasks.dto.TaskInsertDTO;
import com.als.tasks.dto.TaskUpdateDTO;
import com.als.tasks.entities.Task;
import com.als.tasks.services.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping(value = "/tasks")
public class TaskResource {

    @Autowired
    private TaskService service;

    @GetMapping
    public ResponseEntity<List<TaskDTO>> findAll() {
        List<Task> listObj = service.findAll();
        List<TaskDTO> listObjDTO = listObj.stream().map(t -> new TaskDTO(t)).collect(Collectors.toList());
        return ResponseEntity.ok().body(listObjDTO);
    }

    @PostMapping
    public ResponseEntity<Void> insert(@Valid @RequestBody TaskInsertDTO objDTO) {
        Task obj = service.fromNewDTO(objDTO);
        obj = service.save(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping
    public ResponseEntity<Void> update(@Valid @RequestBody TaskUpdateDTO objDTO) {
        Task obj = service.fromUpdateDTO(objDTO);
        service.update(obj);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
