import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/attendances';

const createAttendance = (attendanceData) => {
    return axios.post(API_BASE_URL, attendanceData);
};

const updateAttendance = (attendanceData) => {
    return axios.put(`${API_BASE_URL}/${attendanceData.attendanceId}`, attendanceData);
};

const deleteAttendance = (attendanceId) => {
    if (!attendanceId) {
        return Promise.reject(new Error('Invalid attendance ID'));
    }
    return axios.delete(`${API_BASE_URL}/${attendanceId}`);
};

const getAllAttendances = () => {
    return axios.get(API_BASE_URL);
};

const attendanceService = {
    createAttendance,
    updateAttendance,
    deleteAttendance,
    getAllAttendances
};

export default attendanceService;
