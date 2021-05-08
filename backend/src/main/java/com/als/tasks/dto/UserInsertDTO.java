package com.als.tasks.dto;

import java.io.Serializable;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.als.tasks.entities.User;
import com.als.tasks.services.validation.UserInsert;

@UserInsert
public class UserInsertDTO implements Serializable {
    private static final long serialVersionUID = 1;

    @NotNull(message = "name is required")
    @NotEmpty(message = "name cannot be empty")
    private String name;

    @NotNull(message = "email is required")
    @NotEmpty(message = "email cannot be empty")
    private String email;

    @NotNull(message = "password is required")
    @NotEmpty(message = "password cannot be empty")
    private String password;

    public UserInsertDTO() {
    }

    public UserInsertDTO(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public UserInsertDTO(User user) {
        name = user.getName();
        email = user.getEmail();
        password = user.getPassword();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((email == null) ? 0 : email.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        UserInsertDTO other = (UserInsertDTO) obj;
        if (email == null) {
            if (other.email != null)
                return false;
        } else if (!email.equals(other.email))
            return false;
        return true;
    }
}
