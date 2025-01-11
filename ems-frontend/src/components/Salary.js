import React, { useState, useEffect } from 'react';
import salaryService from '../services/salaryService';

const Salary = () => {
    const [salaries, setSalaries] = useState([]);
    const [formData, setFormData] = useState({
        salaryId: '',
        salary: '',
        bonus: '',
        overtime: '',
        employee: ''
    });

    useEffect(() => {
        fetchSalaries();
    }, []);

    const fetchSalaries = () => {
        salaryService.getAllSalaries()
            .then(response => {
                setSalaries(response.data);
            })
            .catch(error => {
                console.error('Error fetching salaries:', error);
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
        if (formData.salaryId) {
            salaryService.updateSalary(formData)
                .then(response => {
                    fetchSalaries();
                    clearForm();
                })
                .catch(error => {
                    console.error('Error updating salary:', error);
                });
        } else {
            salaryService.createSalary(formData)
                .then(response => {
                    fetchSalaries();
                    clearForm();
                })
                .catch(error => {
                    console.error('Error creating salary:', error);
                });
        }
    };

    const handleEdit = (salary) => {
        setFormData({
            salaryId: salary.salaryId,
            salary: salary.salary,
            bonus: salary.bonus,
            overtime: salary.overtime,
            employee: salary.employee
        });
    };

    const handleDelete = (id) => {
        salaryService.deleteSalary(id)
            .then(response => {
                fetchSalaries();
            })
            .catch(error => {
                console.error('Error deleting salary:', error);
            });
    };

    const clearForm = () => {
        setFormData({
            salaryId: '',
            salary: '',
            bonus: '',
            overtime: '',
            employee: ''
        });
    };

    return (
        <div className="container">
            <h2>Salary Management</h2>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="salaryId" value={formData.salaryId} />
                <div className="form-group">
                    <label>Salary</label>
                    <input type="number" className="form-control" name="salary" value={formData.salary} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Bonus</label>
                    <input type="number" className="form-control" name="bonus" value={formData.bonus} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Overtime</label>
                    <input type="number" className="form-control" name="overtime" value={formData.overtime} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Employee</label>
                    <input type="text" className="form-control" name="employee" value={formData.employee} onChange={handleInputChange} required />
                </div>
                <button type="submit" className="btn btn-primary">{formData.salaryId ? 'Update Salary' : 'Add Salary'}</button>
                <button type="button" className="btn btn-secondary" onClick={clearForm}>Clear</button>
            </form>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Salary</th>
                            <th>Bonus</th>
                            <th>Overtime</th>
                            <th>Employee</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salaries.map(salary => (
                            <tr key={salary.salaryId}>
                                <td>{salary.salary}</td>
                                <td>{salary.bonus}</td>
                                <td>{salary.overtime}</td>
                                <td>{salary.employee}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => handleEdit(salary)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(salary.salaryId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Salary;
