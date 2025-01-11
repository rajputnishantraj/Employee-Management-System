import React, { useState, useEffect } from 'react';
import departmentService from '../services/departmentService';

const Department = () => {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        departmentId: '',
        departmentName: '',
        location: '',
        manager: ''
    });

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = () => {
        departmentService.getAllDepartments()
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
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
        if (formData.departmentId) {
            departmentService.updateDepartment(formData)
                .then(response => {
                    fetchDepartments();
                    clearForm();
                })
                .catch(error => {
                    console.error('Error updating department:', error);
                });
        } else {
            departmentService.createDepartment(formData)
                .then(response => {
                    fetchDepartments();
                    clearForm();
                })
                .catch(error => {
                    console.error('Error creating department:', error);
                });
        }
    };

    const handleEdit = (department) => {
        setFormData({
            departmentId: department.departmentId,
            departmentName: department.departmentName,
            location: department.location,
            manager: department.manager
        });
    };

    const handleDelete = (id) => {
        departmentService.deleteDepartment(id)
            .then(response => {
                fetchDepartments();
            })
            .catch(error => {
                console.error('Error deleting department:', error);
            });
    };

    const clearForm = () => {
        setFormData({
            departmentId: '',
            departmentName: '',
            location: '',
            manager: ''
        });
    };

    return (
        <div className="container">
            <h2>Department Management</h2>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="departmentId" value={formData.departmentId} />
                <div className="form-group">
                    <label>Department Name</label>
                    <input type="text" className="form-control" name="departmentName" value={formData.departmentName} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input type="text" className="form-control" name="location" value={formData.location} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Manager</label>
                    <input type="text" className="form-control" name="manager" value={formData.manager} onChange={handleInputChange} required />
                </div>
                <button type="submit" className="btn btn-primary">{formData.departmentId ? 'Update Department' : 'Add Department'}</button>
                <button type="button" className="btn btn-secondary" onClick={clearForm}>Clear</button>
            </form>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Manager</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map(department => (
                            <tr key={department.departmentId}>
                                <td>{department.departmentName}</td>
                                <td>{department.location}</td>
                                <td>{department.manager}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => handleEdit(department)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(department.departmentId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Department;
