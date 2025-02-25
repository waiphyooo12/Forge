import React, { useEffect, useState } from 'react';
import '../styles/trainer_styles.css'; // Assuming the styles remain the same
import {Link} from 'react-router-dom'; // Import the Link component

const TrainerProfilePage = () => {
  const [trainerInfo, setTrainerInfo] = useState({
    name: '',
    email: '',
    dob: '',
    experience: '',
    specialization: '',
  });

  useEffect(() => {
    // Load trainer data from localStorage
    setTrainerInfo({
      name: localStorage.getItem('trainerName') || '',
      email: localStorage.getItem('trainerEmail') || '',
      dob: localStorage.getItem('trainerDOB') || '',
      experience: localStorage.getItem('trainerExperience') || '',
      specialization: localStorage.getItem('trainerSpecialization') || '',
    });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTrainerInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">Physique Forge</div>
        <nav>
          <ul>
            <li><Link to="/trainer-profile" className="page-link active">Profile</Link></li>
            <li><Link to="/client-overview" className="page-link">Client Overview</Link></li>

            <li><Link to="/workout-plans" className="page-link">Workout Plan</Link></li>
            <li><Link to="/trainer-workout-schedule" className="page-link">Workout Schedule</Link></li>
            <li><Link to="/assign-user" className="page-link">Assign Client</Link></li>

            <li><Link to="/feedback" className="page-link">Feedback</Link></li>
            <li><Link to="/trainer-rating" className="page-link">View Rating</Link></li>
            <li><Link to="/home" id="sign-out-btn" className="page-link">Sign Out</Link></li>

          </ul>
        </nav>
      </aside>

      {/* Profile Content */}
      <main className="profile-container">
        <h2>Trainer Profile</h2>
        <div className="profile-content">
          <div className="profile-picture">
            <img src="chris.jpeg" alt="Trainer Profile" />
          </div>
          <form className="profile-form">
            <label>
              Name:
              <input
                type="text"
                id="name"
                value={trainerInfo.name}
                onChange={handleChange}
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                id="email"
                value={trainerInfo.email}
                onChange={handleChange}
              />
            </label>

            <label>
              Date of Birth:
              <input
                type="date"
                id="dob"
                value={trainerInfo.dob}
                onChange={handleChange}
              />
            </label>

            <label>
              Years of Experience:
              <input
                type="number"
                id="experience"
                value={trainerInfo.experience}
                onChange={handleChange}
              />
              <button type="button" className="edit-btn">Edit</button>
            </label>

            <label>
              Specialization:
              <input
                type="text"
                id="specialization"
                value={trainerInfo.specialization}
                onChange={handleChange}
              />
              <button type="button" className="edit-btn">Edit</button>
            </label>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TrainerProfilePage;
