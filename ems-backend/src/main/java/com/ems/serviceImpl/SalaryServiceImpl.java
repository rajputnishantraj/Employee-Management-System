package com.ems.serviceImpl;

import com.ems.entity.Salary;
import com.ems.repository.SalaryRepository;
import com.ems.service.SalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SalaryServiceImpl implements SalaryService {

    @Autowired
    private SalaryRepository salaryRepository;

    @Override
    public Salary saveSalary(Salary salary) {
        return salaryRepository.save(salary);
    }

    @Override
    public void updateSalary(Salary salary) {
        Optional<Salary> salaryOpt = salaryRepository.findById(salary.getSalaryId());
        if (salaryOpt.isPresent()) {
            Salary existingSalary = salaryOpt.get();
            existingSalary.setSalary(salary.getSalary());
            existingSalary.setBonus(salary.getBonus());
            existingSalary.setOvertime(salary.getOvertime());
        }	
    }

    @Override
    public Salary getSalaryById(Long id) {
        return salaryRepository.findById(id).orElse(null);
    }

    @Override
    public List<Salary> getAllSalaries() {
        return salaryRepository.findAll();
    }

    @Override
    public void deleteSalaryById(Long id) {
        salaryRepository.deleteById(id);
    }
}
