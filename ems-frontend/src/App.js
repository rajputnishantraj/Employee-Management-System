import React, { useState } from 'react';
import NavbarComponent from './components/NavBarComponent';
import Project from './components/Project';
import Attendance from './components/Attendance';
import Salary from './components/Salary';
import Manager from './components/Manager';
import Department from './components/Department';
import Employee from './components/Employee';
import Home from './components/Home';
// Import other components as needed

const App = () => {
    const [selectedEntity, setSelectedEntity] = useState('home');

    const renderComponent = () => {
        switch (selectedEntity) {
            case 'employees':
                return <Employee/>;
            case 'departments':
                return <Department />;
            case 'managers':
                return <Manager/>;
            case 'salaries':
                return <Salary />;
            case 'attendance':
                return <Attendance/>;
            case 'projects':
                return <Project />;
            default:
                return <Home />;
        }
    };

    return (
        <div>
            <NavbarComponent onSelectEntity={setSelectedEntity} />
            {renderComponent()}
        </div>
    );
};

export default App;
