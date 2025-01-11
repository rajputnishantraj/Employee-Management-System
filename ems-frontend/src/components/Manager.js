import React, { useState, useEffect } from 'react';
import managerService from '../services/managerService';

const Manager = () => {
    const [managers, setManagers] = useState([]);
    const [formData, setFormData] = useState({
        managerId: '',
        fullName: '',
        email: '',
        phoneNo: '',
        department: ''
    });

    useEffect(() => {
        fetchManagers();
    }, []);

    const fetchManagers = () => {
        managerService.getAllManagers()
            .then(response => {
                setManagers(response.data);
            })
            .catch(error => {
                console.error('Error fetching managers:', error);
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
        if (formData.managerId) {
            managerService.updateManager(formData)
                .then(response => {
                    fetchManagers();
                    clearForm();
                })
                .catch(error => {
                    console.error('Error updating manager:', error);
                });
        } else {
            managerService.createManager(formData)
                .then(response => {
                    fetchManagers();
                    clearForm();
                })
                .catch(error => {
                    console.error('Error creating manager:', error);
                });
        }
    };

    const handleEdit = (manager) => {
        setFormData({
            managerId: manager.managerId,
            fullName: manager.fullName,
            email: manager.email,
            phoneNo: manager.phoneNo,
            department: manager.department
        });
    };

    const handleDelete = (id) => {
        managerService.deleteManager(id)
            .then(response => {
                fetchManagers();
            })
            .catch(error => {
                console.error('Error deleting manager:', error);
            });
    };

    const clearForm = () => {
        setFormData({
            managerId: '',
            fullName: '',
            email: '',
            phoneNo: '',
            department: ''
        });
    };

    return (
        <div className="container">
            <h2>Manager Management</h2>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="managerId" value={formData.managerId} />
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" className="form-control" name="phoneNo" value={formData.phoneNo} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Department</label>
                    <input type="text" className="form-control" name="department" value={formData.department} onChange={handleInputChange} required />
                </div>
                <button type="submit" className="btn btn-primary">{formData.managerId ? 'Update Manager' : 'Add Manager'}</button>
                <button type="button" className="btn btn-secondary" onClick={clearForm}>Clear</button>
            </form>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {managers.map(manager => (
                            <tr key={manager.managerId}>
                                <td>{manager.fullName}</td>
                                <td>{manager.email}</td>
                                <td>{manager.phoneNo}</td>
                                <td>{manager.department}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => handleEdit(manager)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(manager.managerId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Manager;
