package com.ems.service;

import com.ems.entity.Project;

import java.util.List;

public interface ProjectService {
    Project saveProject(Project project);
    void updateProject(Project project);
    Project getProjectById(Long id);
    List<Project> getAllProjects();
    void deleteProjectById(Long id);
}
