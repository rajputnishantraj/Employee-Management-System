package com.ems.serviceImpl;

import com.ems.entity.Employee;
import com.ems.repository.EmployeeRepository;
import com.ems.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public void updateEmployee(Employee employee) {
        Optional<Employee> employeeOpt = employeeRepository.findById(employee.getEmpid());
        if (employeeOpt.isPresent()) {
            Employee existingEmployee = employeeOpt.get();
            existingEmployee.setFullName(employee.getFullName());
            existingEmployee.setPhoneNo(employee.getPhoneNo());
            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setGender(employee.getGender());
            existingEmployee.setAddress(employee.getAddress());
            employeeRepository.save(existingEmployee);
        }
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public void deleteEmployeeById(Long id) {
        employeeRepository.deleteById(id);
    }
}
