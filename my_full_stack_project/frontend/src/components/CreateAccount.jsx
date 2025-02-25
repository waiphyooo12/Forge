import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user data (for demo purposes, localStorage is used)
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    navigate("/account-success"); // Redirect to success page
  };

  return (
    <div className="container">
      <header>
        <h1 className="logo">Create Account</h1>
      </header>
      <main>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn">Create Account</button>
        </form>
      </main>
    </div>
  );
};

export default CreateAccount;
