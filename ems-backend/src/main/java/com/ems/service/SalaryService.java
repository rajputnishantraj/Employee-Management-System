package com.ems.service;

import com.ems.entity.Salary;

import java.util.List;

public interface SalaryService {
    Salary saveSalary(Salary salary);
    void updateSalary(Salary salary);
    Salary getSalaryById(Long id);
    List<Salary> getAllSalaries();
    void deleteSalaryById(Long id);
}
