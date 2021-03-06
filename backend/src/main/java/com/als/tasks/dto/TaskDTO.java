package com.als.tasks.dto;

import java.io.Serializable;
import java.time.LocalDate;

import com.als.tasks.entities.Task;

public class TaskDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String description;
    private LocalDate estimateAt;
    private LocalDate doneAt;

    public TaskDTO() {
    }

    public TaskDTO(Long id, String description, LocalDate estimateAt, LocalDate doneAt) {
        this.id = id;
        this.description = description;
        this.estimateAt = estimateAt;
        this.doneAt = doneAt;
    }

    public TaskDTO(Task task) {
        this.id = task.getId();
        this.description = task.getDescription();
        this.estimateAt = task.getEstimateAt();
        this.doneAt = task.getDoneAt();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getEstimateAt() {
        return estimateAt;
    }

    public void setEstimateAt(LocalDate estimateAt) {
        this.estimateAt = estimateAt;
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
        TaskDTO other = (TaskDTO) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }
}
