package com.ems.service;

import com.ems.entity.Department;

import java.util.List;

public interface DepartmentService {
    Department saveDepartment(Department department);
    void updateDepartment(Department department);
    Department getDepartmentById(Long id);
    List<Department> getAllDepartments();
    void deleteDepartmentById(Long id);
}
