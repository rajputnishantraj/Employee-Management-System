import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/projects';

const createProject = (projectData) => {
    return axios.post(API_BASE_URL, projectData);
};

const updateProject = (projectData) => {
    return axios.put(`${API_BASE_URL}/${projectData.projectId}`, projectData);
};

const deleteProject = (projectId) => {
    if (!projectId) {
        return Promise.reject(new Error('Invalid project ID'));
    }
    return axios.delete(`${API_BASE_URL}/${projectId}`);
};

const getAllProjects = () => {
    return axios.get(API_BASE_URL);
};

const projectService = {
    createProject,
    updateProject,
    deleteProject,
    getAllProjects
};

export default projectService;
