import React, { useState } from 'react';
import '../styles/box_styles.css';
import { Link } from 'react-router-dom';

const AssignUser = () => {
  // State for the modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State for the selected user and goal
  const [selectedUser, setSelectedUser] = useState(null);

  // List of users
  const users = [
    { id: '0001', username: 'Tommy', status: 'Beginner', height: 173, weight: 80, goal: 'Weight Loss' },
    { id: '0002', username: 'John', status: 'Intermediate', height: 183, weight: 90, goal: 'Build Muscle' }
  ];

  // Function to handle assigning a plan
  const assignPlan = (username, goal) => {
    const url = `/workout-plans?username=${encodeURIComponent(username)}&goal=${encodeURIComponent(goal)}`;
    window.location.href = url;
  };

  // Function to handle sign out confirmation
  const handleSignOut = () => {
    window.location.href = '/home';
  };

  // Function to toggle the modal visibility
  const toggleModal = () => setIsModalVisible(!isModalVisible);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">Physique Forge</div>
        <nav>
          
          <ul>
            <li><Link to="/trainer-profile">Profile</Link></li>
            <li><Link to="/client-overview">Client Overview</Link></li>
            <li><Link to="/workout-plans">Workout Plans</Link></li>
            <li><Link to="/assign-user" className="active">Assign Client</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
            <li><Link to="/trainer-rating">View Rating</Link></li>
            <li><Link to="/home" id="sign-out-btn">Sign Out</Link></li>
          
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main>
        <h2>Assign Client</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Status</th>
                <th>Height(cm)</th>
                <th>Weight(kg)</th>
                <th>Fitness Goal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.status}</td>
                  <td>{user.height}</td>
                  <td>{user.weight}</td>
                  <td>{user.goal}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => assignPlan(user.username, user.goal)}
                    >
                      Assign Plan
                    </button>
                    <button className="btn">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Confirmation Modal */}
      {isModalVisible && (
        <div className="modal" id="confirmation-modal">
          <div className="modal-content">
            <p>Are you sure you want to sign out?</p>
            <div className="modal-buttons">
              <button onClick={handleSignOut}>Yes</button>
              <button className="cancel-btn" onClick={toggleModal}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignUser;
