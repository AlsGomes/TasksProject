package com.als.tasks.services.validation;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.als.tasks.dto.TaskUpdateDTO;
import com.als.tasks.entities.Task;
import com.als.tasks.resources.exceptions.FieldMessage;
import com.als.tasks.services.TaskService;
import com.als.tasks.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;

public class TaskUpdateValidator implements ConstraintValidator<TaskUpdate, TaskUpdateDTO> {

    @Autowired
    private TaskService taskService;

    @Override
    public void initialize(TaskUpdate ann) {
    }

    @Override
    public boolean isValid(TaskUpdateDTO objDto, ConstraintValidatorContext context) {
        List<FieldMessage> list = new ArrayList<>();

        // add the reproved tests in the list
        Task task = taskService.findById(objDto.getId());
        if (task.getUser().getId() != UserService.authenticated().getId())
            list.add(new FieldMessage("id", "Access Denied"));

        for (FieldMessage e : list) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
                    .addConstraintViolation();
        }

        return list.isEmpty();
    }
}