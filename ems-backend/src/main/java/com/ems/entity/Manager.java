package com.ems.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "manager")
public class Manager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "manager_id")
    private Long managerId;

    @Column(name = "manager_name")
    private String managerName;

    @Column(name = "title")
    private String title;

    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "manager", cascade = CascadeType.ALL)
    private List<Department> departments = new ArrayList<>();

    @OneToMany(mappedBy = "manager", cascade = CascadeType.ALL)
    private List<Employee> employees = new ArrayList<>();

    @OneToOne(mappedBy = "manager")
    private Project project;

    // Getters and Setters

    public Long getManagerId() {
        return managerId;
    }

    public void setManagerId(Long managerId) {
        this.managerId = managerId;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Department> getDepartments() {
        return departments;
    }

    public void setDepartments(List<Department> departments) {
        this.departments = departments;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
