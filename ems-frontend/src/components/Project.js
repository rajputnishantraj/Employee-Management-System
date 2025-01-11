import React, { useState, useEffect } from 'react';
import projectService from '../services/projectService';

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        projectId: '',
        projectName: '',
        startDate: '',
        endDate: '',
        manager: ''
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = () => {
        projectService.getAllProjects()
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.projectId) {
            projectService.updateProject(formData)
                .then(response => {
                    fetchProjects();
                    clearForm();
                })
                .catch(error => {
                    console.error('Error updating project:', error);
                });
        } else {
            projectService.createProject(formData)
                .then(response => {
                    fetchProjects();
                    clearForm();
                })
                .catch(error => {
                    console.error('Error creating project:', error);
                });
        }
    };

    const handleEdit = (project) => {
        setFormData({
            projectId: project.projectId,
            projectName: project.projectName,
            startDate: project.startDate,
            endDate: project.endDate,
            manager: project.manager
        });
    };

    const handleDelete = (id) => {
        projectService.deleteProject(id)
            .then(response => {
                fetchProjects();
            })
            .catch(error => {
                console.error('Error deleting project:', error);
            });
    };

    const clearForm = () => {
        setFormData({
            projectId: '',
            projectName: '',
            startDate: '',
            endDate: '',
            manager: ''
        });
    };

    return (
        <div className="container">
            <h2>Project Management</h2>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="projectId" value={formData.projectId} />
                <div className="form-group">
                    <label>Project Name</label>
                    <input type="text" className="form-control" name="projectName" value={formData.projectName} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Start Date</label>
                    <input type="date" className="form-control" name="startDate" value={formData.startDate} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>End Date</label>
                    <input type="date" className="form-control" name="endDate" value={formData.endDate} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Manager</label>
                    <input type="text" className="form-control" name="manager" value={formData.manager} onChange={handleInputChange} required />
                </div>
                <button type="submit" className="btn btn-primary">{formData.projectId ? 'Update Project' : 'Add Project'}</button>
                <button type="button" className="btn btn-secondary" onClick={clearForm}>Clear</button>
            </form>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Manager</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project.projectId}>
                                <td>{project.projectName}</td>
                                <td>{project.startDate}</td>
                                <td>{project.endDate}</td>
                                <td>{project.manager}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => handleEdit(project)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(project.projectId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Project;
