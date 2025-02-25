import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Assuming the styles remain the same

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation (can be expanded as needed)
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    // Simulate sign-in logic and redirect
    // Here you can check credentials or proceed with your auth logic
    navigate('/trainer-profile'); // Redirect to trainer profile after successful login
  };

  return (
    <div className="container">
      <header>
        <h1 className="logo">Sign In</h1>
      </header>
      <main>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
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
          <button type="submit" className="btn">Sign In</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </main>
    </div>
  );
};

export default SignInPage;
