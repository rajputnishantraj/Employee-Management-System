import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/managers';

const createManager = (managerData) => {
    return axios.post(API_BASE_URL, managerData);
};

const updateManager = (managerData) => {
    return axios.put(`${API_BASE_URL}/${managerData.managerId}`, managerData);
};

const deleteManager = (managerId) => {
    if (!managerId) {
        return Promise.reject(new Error('Invalid manager ID'));
    }
    return axios.delete(`${API_BASE_URL}/${managerId}`);
};

const getAllManagers = () => {
    return axios.get(API_BASE_URL);
};

const managerService = {
    createManager,
    updateManager,
    deleteManager,
    getAllManagers
};

export default managerService;
