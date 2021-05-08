package com.als.tasks.services.validation;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.als.tasks.dto.UserInsertDTO;
import com.als.tasks.resources.exceptions.FieldMessage;

public class UserInsertValidator implements ConstraintValidator<UserInsert, UserInsertDTO> {

    @Override
    public void initialize(UserInsert ann) {
    }

    @Override
    public boolean isValid(UserInsertDTO objDto, ConstraintValidatorContext context) {
        List<FieldMessage> list = new ArrayList<>();

        // add the reproved tests in the list

        for (FieldMessage e : list) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
                    .addConstraintViolation();
        }

        return list.isEmpty();
    }
}