package com.ems.serviceImpl;

import com.ems.entity.Project;
import com.ems.repository.ProjectRepository;
import com.ems.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public void updateProject(Project project) {
        Optional<Project> projectOpt = projectRepository.findById(project.getProjectId());
        if (projectOpt.isPresent()) {
            Project existingProject = projectOpt.get();
            existingProject.setProjectName(project.getProjectName());
            existingProject.setStartDate(project.getStartDate());
            existingProject.setEndDate(project.getEndDate());
            existingProject.setStatus(project.getStatus());
            projectRepository.save(existingProject);
        }
    }

    @Override
    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElse(null);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public void deleteProjectById(Long id) {
        projectRepository.deleteById(id);
    }
}
