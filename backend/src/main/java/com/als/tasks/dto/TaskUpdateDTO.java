package com.als.tasks.dto;

import java.io.Serializable;
import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import com.als.tasks.services.validation.TaskUpdate;

@TaskUpdate
public class TaskUpdateDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull(message = "id must no be null")
    private Long id;

    private LocalDate doneAt;

    public TaskUpdateDTO() {
    }

    public TaskUpdateDTO(Long id, LocalDate doneAt) {
        this.id = id;
        this.doneAt = doneAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDoneAt() {
        return doneAt;
    }

    public void setDoneAt(LocalDate doneAt) {
        this.doneAt = doneAt;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
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
        TaskUpdateDTO other = (TaskUpdateDTO) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }
}
