import React, { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import "../styles/admin1.css";
import { createClient } from '../api/api'; // Update the import path if needed

const ClientAdd = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [client, setClient] = useState({
    name: "",
    phone: "",
    height: "",
    weight: "",
    fitnessGoal: "",
    email: "",
    status: "ACTIVE",
    clientNote: "",
  });

  const handleChange = (e) => {
    setClient({ ...client, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); 

    // Simple validation
    if (!client.name || !client.phone || !client.email) {
      setMessage("Please fill out all required fields.");
      return;
    }

    const newClient = {
      ...client,
      id: Date.now(), // Temporary ID (backend should handle this)
      createdAt: new Date().toISOString(), // Add a timestamp
      updatedAt: null, // Set updatedAt to null initially
    };

    try {
      await createClient(newClient); // Use the API service to create a client
      setMessage("Client added successfully!");

      // Reset form fields
      setClient({
        name: "",
        phone: "",
        height: "",
        weight: "",
        fitnessGoal: "",
        email: "",
        status: "active",
        clientNote: "",
      });

      // Redirect after 2 seconds
      setTimeout(() => navigate("/client-list"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add client. Please try again.");
      console.error('Error saving client:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">Physique Forge</div>
        <nav>
          <ul>
          <li><Link to="/trainer-management">Trainer Management</Link></li>
          <li><Link to="/client-list">Client Management</Link></li>
          <li><Link to="/home" className="sign-out-link">Sign Out</Link></li>
          </ul>
        </nav>
      </aside>

      <div className="main-content">
        <h2>Add Client</h2>
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" id="name" value={client.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" id="phone" value={client.phone} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Height (cm)</label>
            <input type="number" id="height" value={client.height} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Weight (kg)</label>
            <input type="number" id="weight" value={client.weight} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Fitness Goal</label>
            <input type="text" id="fitnessGoal" value={client.fitnessGoal} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" id="email" value={client.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
    <label>Status</label>
    <select
        id="clientStatus"
        value={client.clientStatus}
        onChange={handleChange}
        required
    >
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
        <option value="ON_LEAVE">On Leave</option>
    </select>
</div>

          <div className="form-group">
            <label>Client Note</label>
            <textarea id="clientNote" value={client.clientNote} onChange={handleChange}></textarea>
          </div>

          <button type="submit" className="confirm-btn">Confirm</button>

        </form>
      </div>
    </div>
  );
};

export default ClientAdd;