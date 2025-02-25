import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin1.css'; // Assuming you still want the same styling


const SelectPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <main className="main-content">
        <div className="selection-container">
          <h1 className="selection-title">Welcome</h1>
          <p className="selection-subtitle">Select: Trainer or Staff</p>
          <div className="selection-buttons">
            <button 
              className="selection-button" 
              onClick={() => handleNavigation('/trainer-management')}
            >
              Trainer
            </button>
            <button 
              className="selection-button" 
              onClick={() => handleNavigation('/client-list')}
            >
              Client
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SelectPage;
