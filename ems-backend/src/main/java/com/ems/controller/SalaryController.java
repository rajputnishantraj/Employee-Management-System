package com.ems.controller;

import com.ems.entity.Salary;
import com.ems.service.SalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salaries")
public class SalaryController {

    @Autowired
    private SalaryService salaryService;

    @PostMapping
    public ResponseEntity<Salary> createSalary(@RequestBody Salary salary) {
        try {
            Salary newSalary = salaryService.saveSalary(salary);
            return new ResponseEntity<>(newSalary, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Error creating salary: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Salary> updateSalary(@PathVariable Long id, @RequestBody Salary salary) {
        try {
            salary.setSalaryId(id);
            salaryService.updateSalary(salary);
            return new ResponseEntity<>(salary, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error updating salary: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Salary> getSalaryById(@PathVariable Long id) {
        try {
            Salary salary = salaryService.getSalaryById(id);
            if (salary != null) {
                return ResponseEntity.ok(salary);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Invalid salary ID: " + id);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Salary>> getAllSalaries() {
        List<Salary> salaries = salaryService.getAllSalaries();
        return ResponseEntity.ok(salaries);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSalaryById(@PathVariable Long id) {
        try {
            salaryService.deleteSalaryById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.err.println("Error deleting salary: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
