import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/box_styles.css';

const ClientOverview = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">Physique Forge</div>
        <nav>
          <ul>
            <li><Link to="/trainer-profile">Profile</Link></li>
            <li><Link to="/client-overview" className="active">Client Overview</Link></li>
            <li><Link to="/workout-plans">Workout Plans</Link></li>
            <li><Link to="/assign-user">Assign Client</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
            <li><Link to="/trainer-rating">View Rating</Link></li>
            <li><a href="/home" className="sign-out-link">Sign Out</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main>
        <h2>Client Overview</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Client_ID</th>
                <th>ClientName</th>
                <th>Client Note</th>
                <th>Fitness Goal</th>
                <th>Assigned Plans</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0001</td>
                <td>Tommy</td>
                <td>"My left shoulder hurts."</td>
                <td>Weight Loss</td>
                <td>PPL</td>
                <td>
                  <Link to="/workout-plans" className="btn">Edit</Link>
                  <Link to="/feedback" className="btn">Feedback</Link>
                </td>
              </tr>
              <tr>
                <td>0002</td>
                <td>John</td>
                <td>"My biceps grew 0.5 inches."</td>
                <td>Build Muscle</td>
                <td>Hypertrophy</td>
                <td>
                  <Link to="/workout-plans" className="btn">Edit</Link>
                  <Link to="/feedback" className="btn">Feedback</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      {/* Sign Out Confirmation Modal */}
      {showModal && (
        <div className="modal" id="signout-modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <p>Are you sure you want to sign out?</p>
            <div className="modal-buttons">
              <button id="confirm-signout" onClick={() => window.location.href = "signup"}>Yes</button>
              <button className="cancel-btn" id="cancel-signout" onClick={toggleModal}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientOverview;
