import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavbarComponent = ({ onSelectEntity }) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#">EMS</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link onClick={() => onSelectEntity('home')}>Home</Nav.Link>
                    <Nav.Link onClick={() => onSelectEntity('employees')}>Employees</Nav.Link>
                    <Nav.Link onClick={() => onSelectEntity('departments')}>Departments</Nav.Link>
                    <Nav.Link onClick={() => onSelectEntity('managers')}>Managers</Nav.Link>
                    <Nav.Link onClick={() => onSelectEntity('salaries')}>Salaries</Nav.Link>
                    <Nav.Link onClick={() => onSelectEntity('attendance')}>Attendance</Nav.Link>
                    <Nav.Link onClick={() => onSelectEntity('projects')}>Projects</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponent;
