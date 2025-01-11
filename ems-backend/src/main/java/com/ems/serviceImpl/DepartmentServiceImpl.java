package com.ems.serviceImpl;

import com.ems.entity.Department;
import com.ems.repository.DepartmentRepository;
import com.ems.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public Department saveDepartment(Department department) {
        return departmentRepository.save(department);
    }

    @Override
    public void updateDepartment(Department department) {
        Optional<Department> departmentOpt = departmentRepository.findById(department.getDepartmentId());
        if (departmentOpt.isPresent()) {
            Department existingDepartment = departmentOpt.get();
            existingDepartment.setDepartmentName(department.getDepartmentName());
            existingDepartment.setLocation(department.getLocation());
            existingDepartment.setManager(department.getManager());
            departmentRepository.save(existingDepartment);
        }
    }

    @Override
    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id).orElse(null);
    }

    @Override
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @Override
    public void deleteDepartmentById(Long id) {
        departmentRepository.deleteById(id);
    }
}
