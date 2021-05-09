package com.als.tasks.services.validation;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.als.tasks.dto.UserInsertDTO;
import com.als.tasks.resources.exceptions.FieldMessage;
import com.als.tasks.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;

public class UserInsertValidator implements ConstraintValidator<UserInsert, UserInsertDTO> {

    @Autowired
    private UserService userService;

    @Override
    public void initialize(UserInsert ann) {
    }

    @Override
    public boolean isValid(UserInsertDTO objDto, ConstraintValidatorContext context) {
        List<FieldMessage> list = new ArrayList<>();

        // add the reproved tests in the list
        boolean objExistsByEmail = userService.existsByEmail(objDto.getEmail());
        if (objExistsByEmail)
            list.add(new FieldMessage("email", String.format("User with email %s already exists", objDto.getEmail())));

        for (FieldMessage e : list) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
                    .addConstraintViolation();
        }

        return list.isEmpty();
    }
}