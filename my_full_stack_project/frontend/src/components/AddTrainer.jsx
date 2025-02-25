import React, { useState } from 'react';
import {Link} from 'react-router-dom';  
import '../styles/add_trainer.css';
import { createTrainer } from '../api/api'; // Import the API function

const AddTrainer = () => {
  // Define state variables for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [hireDate, setHireDate] = useState('');
  const [error, setError] = useState(''); // State for error handling
  const [loading, setLoading] = useState(false); // State for loading

  // Handle back button click (goBack function)
  const goBack = () => {
    window.history.back();
  };

  // Handle form submission (saveTrainer function)
  const saveTrainer = async () => {
    // Validate form fields
    if (!name || !email || !experience || !specialization || !hireDate) {
      setError('All fields are required except "Is Active".');
      return;
    }

    const trainer = {
      name,
      email,
      experience: parseInt(experience, 10), // Convert to number
      specialization,
      isActive,
      hireDate,
    };

    try {
      setLoading(true); // Set loading state
      console.log('Sending trainer data to backend:', trainer);
      // Call the backend API to save the trainer
      const response = await createTrainer(trainer);
      console.log('Trainer saved successfully:', response);

      // Redirect to trainer management page
      window.location.href = '/trainer-management'; // Update this to your actual route
    } catch (error) {
      console.error('Error saving trainer:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        setError(`Failed to save trainer. Server responded with status ${error.response.status}.`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request data:', error.request);
        setError('Failed to save trainer. No response received from server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        setError('Failed to save trainer. An error occurred.');
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">Physique Forge</div>
        <nav>
          <ul>
            <li><Link to="/trainer-management">Trainer Management</Link></li>
            <li><Link to="/client-list">Client Management</Link></li>
            <li><Link to="/home" className="sign-out-link">Sign Out</Link></li>
          </ul>
         
        </nav>
        <button className="back-btn" onClick={goBack}>← Back</button>
      </aside>

      {/* Form Section */}
      <div className="form-section">
        <h1>Add Trainer</h1>
        {error && <div className="error-message">{error}</div>} {/* Display error message */}
        <form id="trainerForm">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="experience">Years of Experience</label>
            <input
              type="number"
              id="experience"
              placeholder="Enter Years of Experience"
              min="0"
              max="50"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="specialization">Specialization</label>
            <input
              type="text"
              id="specialization"
              placeholder="Enter Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="isActive">Is Active</label>
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="hireDate">Hire Date</label>
            <input
              type="date"
              id="hireDate"
              value={hireDate}
              onChange={(e) => setHireDate(e.target.value)}
              required
            />
          </div>

          <button type="button" onClick={saveTrainer} disabled={loading}>
            {loading ? 'Saving...' : 'Confirm'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTrainer;