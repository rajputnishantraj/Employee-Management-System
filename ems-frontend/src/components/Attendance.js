import React, { useState, useEffect } from 'react';
import attendanceService from '../services/attendanceService';

const Attendance = () => {
    const [attendances, setAttendances] = useState([]);
    const [formData, setFormData] = useState({
        attendanceId: '',
        date: '',
        status: '',
        employee: ''
    });

    useEffect(() => {
        fetchAttendances();
    }, []);

    const fetchAttendances = () => {
        attendanceService.getAllAttendances()
            .then(response => {
                setAttendances(response.data);
            })
            .catch(error => {
                console.error('Error fetching attendances:', error);
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
        if (formData.attendanceId) {
            attendanceService.updateAttendance(formData)
                .then(response => {
                    fetchAttendances();
                    clearForm();
                })
                .catch(error => {
                    console.error('Error updating attendance:', error);
                });
        } else {
            attendanceService.createAttendance(formData)
                .then(response => {
                    fetchAttendances();
                    clearForm();
                })
                .catch(error => {
                    console.error('Error creating attendance:', error);
                });
        }
    };

    const handleEdit = (attendance) => {
        setFormData({
            attendanceId: attendance.attendanceId,
            date: attendance.date,
            status: attendance.status,
            employee: attendance.employee
        });
    };

    const handleDelete = (id) => {
        attendanceService.deleteAttendance(id)
            .then(response => {
                fetchAttendances();
            })
            .catch(error => {
                console.error('Error deleting attendance:', error);
            });
    };

    const clearForm = () => {
        setFormData({
            attendanceId: '',
            date: '',
            status: '',
            employee: ''
        });
    };

    return (
        <div className="container">
            <h2>Attendance Management</h2>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="attendanceId" value={formData.attendanceId} />
                <div className="form-group">
                    <label>Date</label>
                    <input type="date" className="form-control" name="date" value={formData.date} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <input type="text" className="form-control" name="status" value={formData.status} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Employee</label>
                    <input type="text" className="form-control" name="employee" value={formData.employee} onChange={handleInputChange} required />
                </div>
                <button type="submit" className="btn btn-primary">{formData.attendanceId ? 'Update Attendance' : 'Add Attendance'}</button>
                <button type="button" className="btn btn-secondary" onClick={clearForm}>Clear</button>
            </form>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Employee</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendances.map(attendance => (
                            <tr key={attendance.attendanceId}>
                                <td>{attendance.date}</td>
                                <td>{attendance.status}</td>
                                <td>{attendance.employee}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => handleEdit(attendance)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(attendance.attendanceId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendance;
