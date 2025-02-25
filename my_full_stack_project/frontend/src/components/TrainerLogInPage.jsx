import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/trainer_styles.css'; // Assuming the styles remain the same

const TrainerLogInPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // For demonstration purposes, you can log in with localStorage data or implement authentication logic here
    localStorage.setItem('trainerEmail', email);
    localStorage.setItem('trainerPassword', password);
    
    // Redirect to trainer profile page upon successful login
    navigate('/trainer-profile');
  };

  return (
    <div className="container">
      <header>
        <h1 className="logo">Trainer Log In</h1>
      </header>
      <main>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn">
            Log In
          </button>
        </form>
      </main>
    </div>
  );
};

export default TrainerLogInPage;
