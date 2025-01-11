import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/employees';

const createEmployee = (employeeData) => {
    return axios.post(API_BASE_URL, employeeData);
};

const updateEmployee = (employeeData) => {
    return axios.put(`${API_BASE_URL}/${employeeData.id}`, employeeData);
};

const deleteEmployee = (employeeId) => {
    if (!employeeId) {
        return Promise.reject(new Error('Invalid employee ID'));
    }
    return axios.delete(`${API_BASE_URL}/${employeeId}`);
};

const getAllEmployees = () => {
    return axios.get(API_BASE_URL);
};

const employeeService = {
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getAllEmployees
};

export default employeeService;
