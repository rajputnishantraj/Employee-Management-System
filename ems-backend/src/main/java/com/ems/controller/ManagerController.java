package com.ems.controller;

import com.ems.entity.Manager;
import com.ems.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/managers")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    @PostMapping
    public ResponseEntity<Manager> createManager(@RequestBody Manager manager) {
        try {
            Manager newManager = managerService.saveManager(manager);
            return new ResponseEntity<>(newManager, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Error creating manager: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Manager> updateManager(@PathVariable Long id, @RequestBody Manager manager) {
        try {
            manager.setManagerId(id);
            managerService.updateManager(manager);
            return new ResponseEntity<>(manager, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error updating manager: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Manager> getManagerById(@PathVariable Long id) {
        try {
            Manager manager = managerService.getManagerById(id);
            if (manager != null) {
                return ResponseEntity.ok(manager);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Invalid manager ID: " + id);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Manager>> getAllManagers() {
        List<Manager> managers = managerService.getAllManagers();
        return ResponseEntity.ok(managers);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteManagerById(@PathVariable Long id) {
        try {
            managerService.deleteManagerById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.err.println("Error deleting manager: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
