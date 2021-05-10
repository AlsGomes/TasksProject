package com.als.tasks.dto;

import java.io.Serializable;
import java.time.LocalDate;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.FutureOrPresent;

public class TaskInsertDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotEmpty(message = "desc cannot be empty")
    @NotNull(message = "desc cannot be null")
    private String desc;

    @NotNull(message = "estimateAt cannot be null")
    @FutureOrPresent(message = "estimateAt must be in the future or present")
    private LocalDate estimateAt;

    public TaskInsertDTO() {
    }

    public TaskInsertDTO(String desc, LocalDate estimateAt) {
        this.desc = desc;
        this.estimateAt = estimateAt;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
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
        result = prime * result + ((desc == null) ? 0 : desc.hashCode());
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
        if (desc == null) {
            if (other.desc != null)
                return false;
        } else if (!desc.equals(other.desc))
            return false;
        if (estimateAt == null) {
            if (other.estimateAt != null)
                return false;
        } else if (!estimateAt.equals(other.estimateAt))
            return false;
        return true;
    }
}
