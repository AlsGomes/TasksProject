package com.als.tasks.dto;

import java.io.Serializable;
import java.time.LocalDate;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class TaskInsertDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotEmpty(message = "description cannot be empty")
    @NotNull(message = "description cannot be null")
    private String description;

    @NotNull(message = "estimateAt cannot be null")
    private LocalDate estimateAt;

    public TaskInsertDTO() {
    }

    public TaskInsertDTO(String description, LocalDate estimateAt) {
        this.description = description;
        this.estimateAt = estimateAt;
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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((description == null) ? 0 : description.hashCode());
        result = prime * result + ((estimateAt == null) ? 0 : estimateAt.hashCode());
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
        TaskInsertDTO other = (TaskInsertDTO) obj;
        if (description == null) {
            if (other.description != null)
                return false;
        } else if (!description.equals(other.description))
            return false;
        if (estimateAt == null) {
            if (other.estimateAt != null)
                return false;
        } else if (!estimateAt.equals(other.estimateAt))
            return false;
        return true;
    }
}
