import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/salaries';

const createSalary = (salaryData) => {
    return axios.post(API_BASE_URL, salaryData);
};

const updateSalary = (salaryData) => {
    return axios.put(`${API_BASE_URL}/${salaryData.salaryId}`, salaryData);
};

const deleteSalary = (salaryId) => {
    if (!salaryId) {
        return Promise.reject(new Error('Invalid salary ID'));
    }
    return axios.delete(`${API_BASE_URL}/${salaryId}`);
};

const getAllSalaries = () => {
    return axios.get(API_BASE_URL);
};

const salaryService = {
    createSalary,
    updateSalary,
    deleteSalary,
    getAllSalaries
};

export default salaryService;
