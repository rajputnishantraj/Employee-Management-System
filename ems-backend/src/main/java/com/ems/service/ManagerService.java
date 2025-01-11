package com.ems.service;

import com.ems.entity.Manager;

import java.util.List;

public interface ManagerService {
    Manager saveManager(Manager manager);
    void updateManager(Manager manager);
    Manager getManagerById(Long id);
    List<Manager> getAllManagers();
    void deleteManagerById(Long id);
}
