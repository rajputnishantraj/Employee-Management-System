import React, { useState, useEffect } from 'react';
import employeeService from '../services/employeeService';

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        empid: '',
        fullName: '',
        email: '',
        phoneNo: '',
        gender: '',
        address: ''
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        employeeService.getAllEmployees()
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
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
        if (formData.empid) {
            employeeService.updateEmployee(formData)
                .then(response => {
                    fetchEmployees();
                    clearForm();
                })
                .catch(error => {
                    console.error('Error updating employee:', error);
                });
        } else {
            employeeService.createEmployee(formData)
                .then(response => {
                    fetchEmployees();
                    clearForm();
                })
                .catch(error => {
                    console.error('Error creating employee:', error);
                });
        }
    };

    const handleEdit = (employee) => {
        setFormData({
            empid: employee.empid,
            fullName: employee.fullName,
            email: employee.email,
            phoneNo: employee.phoneNo,
            gender: employee.gender,
            address: employee.address
        });
    };

    const handleDelete = (id) => {
        employeeService.deleteEmployee(id)
            .then(response => {
                fetchEmployees();
            })
            .catch(error => {
                console.error('Error deleting employee:', error);
            });
    };

    const clearForm = () => {
        setFormData({
            empid: '',
            fullName: '',
            email: '',
            phoneNo: '',
            gender: '',
            address: ''
        });
    };

    return (
        <div className="container">
            <h2>Employee Management</h2>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="empid" value={formData.empid} />
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
                    <label>Gender</label>
                    <input type="text" className="form-control" name="gender" value={formData.gender} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <textarea className="form-control" name="address" value={formData.address} onChange={handleInputChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">{formData.empid ? 'Update Employee' : 'Add Employee'}</button>
                <button type="button" className="btn btn-secondary" onClick={clearForm}>Clear</button>
            </form>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.empid}>
                                <td>{employee.fullName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phoneNo}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.address}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => handleEdit(employee)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(employee.empid)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employee;
