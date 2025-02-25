import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Assuming the styles remain the same

const SignUpPage = () => {
  const navigate = useNavigate();
  
  // State variables to store form values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [role, setRole] = useState('');
  
  // Trainer-specific fields
  const [experience, setExperience] = useState('');
  const [specialization, setSpecialization] = useState('');
  
  // User-specific fields
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [goal, setGoal] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Store data in localStorage
    localStorage.setItem('trainerName', name);
    localStorage.setItem('trainerEmail', email);
    localStorage.setItem('trainerDOB', dob);
    localStorage.setItem('trainerRole', role);
    localStorage.setItem('trainerPassword', password);
  
    if (role === 'trainer') {
      localStorage.setItem('trainerExperience', experience);
      localStorage.setItem('trainerSpecialization', specialization);
      navigate('/trainer-profile'); // Redirect to trainer profile
    } else if (role === 'user') {
      localStorage.setItem('userHeight', height);
      localStorage.setItem('userWeight', weight);
      localStorage.setItem('userPhone', phone);
      localStorage.setItem('userStatus', status);
      localStorage.setItem('userGoal', goal);
      navigate('/client-profile'); // Redirect to client profile
    } else {
      navigate('/trainer-management'); // Redirect to admin page
    }
  };

  return (
    <div className="container">
      <header>
        <h1 className="logo">Sign Up</h1>
      </header>
      <main>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="date"
            id="dob"
            required
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="user">Client</option>
            <option value="trainer">Trainer</option>
            <option value="admin">Admin</option>
          </select>

          {/* Trainer Fields */}
          {role === 'trainer' && (
            <div id="trainer-fields">
              <input
                type="number"
                id="experience"
                placeholder="Years of Experience"
                min="0"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
              <input
                type="text"
                id="specialization"
                placeholder="Specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </div>
          )}

          {/* User Fields */}
          {role === 'user' && (
            <div id="user-fields">
              <input
                type="number"
                id="height"
                placeholder="Height (cm)"
                min="0"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <input
                type="number"
                id="weight"
                placeholder="Weight (kg)"
                min="0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <input
                type="text"
                id="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <input
                type="text"
                id="goal"
                placeholder="Fitness Goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
          )}

          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </main>
    </div>
  );
};

export default SignUpPage;