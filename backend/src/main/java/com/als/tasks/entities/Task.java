package com.als.tasks.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tb_tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String desc;
    private Date estimateAt;
    private Date doneAt;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User User;

    public Task() {
    }

    public Task(Long id, String desc, Date estimateAt, Date doneAt, com.als.tasks.entities.User user) {
        this.id = id;
        this.desc = desc;
        this.estimateAt = estimateAt;
        this.doneAt = doneAt;
        User = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Date getEstimateAt() {
        return estimateAt;
    }

    public void setEstimateAt(Date estimateAt) {
        this.estimateAt = estimateAt;
    }

    public Date getDoneAt() {
        return doneAt;
    }

    public void setDoneAt(Date doneAt) {
        this.doneAt = doneAt;
    }

    public User getUser() {
        return User;
    }

    public void setUser(User user) {
        User = user;
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
        Task other = (Task) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }
}
