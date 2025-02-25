import React, { useState, useEffect } from 'react';
import '../styles/client_profile.css'; // Import the CSS file
import { Link } from 'react-router-dom'; // Import the Link component

const ClientProfile = () => {
  const [clientId, setClientId] = useState(localStorage.getItem('clientId') || ''); // Assume client ID is stored in localStorage
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [phone, setPhone] = useState('');

  const [isEditing, setIsEditing] = useState({
    height: false,
    weight: false,
    phone: false,
  });

  // Fetch client data on component mount
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/clients/${clientId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch client data');
        }
        const data = await response.json();
        setName(data.name || '');
        setEmail(data.email || '');
        setDob(data.dob || '');
        setHeight(data.height || '');
        setWeight(data.weight || '');
        setPhone(data.phoneNumber || '');
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    if (clientId) {
      fetchClientData();
    }
  }, [clientId]);

  // Sync values to localStorage on change
  useEffect(() => {
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userDOB', dob);
    localStorage.setItem('userHeight', height);
    localStorage.setItem('userWeight', weight);
    localStorage.setItem('userPhone', phone);
  }, [name, email, dob, height, weight, phone]);

  const toggleEdit = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  // Handle form submission to update client data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedClient = {
        name,
        email,
        dob,
        height: parseFloat(height), // Convert string to number
        weight: parseFloat(weight), // Convert string to number
        phoneNumber: phone,
      };

      const response = await fetch(`http://localhost:8080/api/clients/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedClient),
      });

      if (!response.ok) {
        throw new Error('Failed to update client data');
      }

      const data = await response.json();
      console.log('Client updated successfully:', data);
    } catch (error) {
      console.error('Error updating client data:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">Physique Forge</div>
        <nav>
          <ul>
            <li><Link to="/client-profile" className="page-link active">Profile</Link></li>
            <li><Link to="/client-workoutplan" className="page-link">Workout</Link></li>
            <li><Link to="/client-rating" className="page-link">Rating</Link></li>
            <li><Link to="/client-feedback" className="page-link">Feedback</Link></li>
            <li><Link to="/home" className="sign-out-link">Sign Out</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="profile-container">
        <h2>Client Profile</h2>
        <div className="profile-content">
          <form className="profile-form" onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => handleChange(e, setName)}
                readOnly={true}
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => handleChange(e, setEmail)}
                readOnly={true}
              />
            </label>

            <label>
              Date of Birth:
              <input
                type="date"
                value={dob}
                onChange={(e) => handleChange(e, setDob)}
                readOnly={true}
              />
            </label>

            <label>
              Height (cm):
              <input
                type="number"
                value={height}
                onChange={(e) => handleChange(e, setHeight)}
                readOnly={!isEditing.height}
              />
              <button
                type="button"
                className="edit-btn"
                onClick={() => toggleEdit('height')}
              >
                {isEditing.height ? 'Save' : 'Edit'}
              </button>
            </label>

            <label>
              Weight (kg):
              <input
                type="number"
                value={weight}
                onChange={(e) => handleChange(e, setWeight)}
                readOnly={!isEditing.weight}
              />
              <button
                type="button"
                className="edit-btn"
                onClick={() => toggleEdit('weight')}
              >
                {isEditing.weight ? 'Save' : 'Edit'}
              </button>
            </label>

            <label>
              Phone:
              <input
                type="text"
                value={phone}
                onChange={(e) => handleChange(e, setPhone)}
                readOnly={!isEditing.phone}
              />
              <button
                type="button"
                className="edit-btn"
                onClick={() => toggleEdit('phone')}
              >
                {isEditing.phone ? 'Save' : 'Edit'}
              </button>
            </label>

            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ClientProfile;