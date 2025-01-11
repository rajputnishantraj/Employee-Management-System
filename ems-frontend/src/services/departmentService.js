import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/departments';

const createDepartment = (departmentData) => {
    return axios.post(API_BASE_URL, departmentData);
};

const updateDepartment = (departmentData) => {
    return axios.put(`${API_BASE_URL}/${departmentData.departmentId}`, departmentData);
};

const deleteDepartment = (departmentId) => {
    if (!departmentId) {
        return Promise.reject(new Error('Invalid department ID'));
    }
    return axios.delete(`${API_BASE_URL}/${departmentId}`);
};

const getAllDepartments = () => {
    return axios.get(API_BASE_URL);
};

const departmentService = {
    createDepartment,
    updateDepartment,
    deleteDepartment,
    getAllDepartments
};

export default departmentService;
