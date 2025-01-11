package com.ems.serviceImpl;

import com.ems.entity.Manager;
import com.ems.repository.ManagerRepository;
import com.ems.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ManagerServiceImpl implements ManagerService {

    @Autowired
    private ManagerRepository managerRepository;

    @Override
    public Manager saveManager(Manager manager) {
        return managerRepository.save(manager);
    }

    @Override
    public void updateManager(Manager manager) {
        Optional<Manager> managerOpt = managerRepository.findById(manager.getManagerId());
        if (managerOpt.isPresent()) {
            Manager existingManager = managerOpt.get();
            existingManager.setManagerName(manager.getManagerName());
            existingManager.setTitle(manager.getTitle());
            existingManager.setEmail(manager.getEmail());
            managerRepository.save(existingManager);
        }
    }

    @Override
    public Manager getManagerById(Long id) {
        return managerRepository.findById(id).orElse(null);
    }

    @Override
    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }

    @Override
    public void deleteManagerById(Long id) {
        managerRepository.deleteById(id);
    }
}
