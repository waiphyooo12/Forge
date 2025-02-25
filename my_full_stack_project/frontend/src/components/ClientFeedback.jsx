import React, { useState } from 'react';
import '../styles/styles2.css';  // Assuming you have a separate CSS file for styles
import {Link} from 'react-router-dom';  // Import the Link component
const ClientFeedback = () => {
  // State for feedback visibility and modal visibility
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Sample feedback data
  const feedbackData = [
    { clientName: 'John', date: '11.1.2024', feedback: 'Improve your squats.' },
    { clientName: 'John', date: '12.1.2024', feedback: 'Quads getting bigger.' },
  ];

  // Handle toggling the feedback visibility
  const toggleFeedback = () => setIsFeedbackVisible(!isFeedbackVisible);

  // Handle the sign-out modal visibility
  const toggleModal = () => setIsModalVisible(!isModalVisible);

  // Handle the confirmation of signing out
  const handleSignOut = () => {
    window.location.href = 'index.html';  // Redirect to the homepage or login page
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">Physique Forge</div>
        <ul>
        <li><Link to="/client-profile" className="page-link">Profile</Link></li>
            <li><Link to="/client-workoutplan" className="page-link active">Workout Plan</Link></li>
            <li><Link to="/client-rating" className="page-link">Rating</Link></li>
            <li><Link to="/client-feedback" className="page-link">Feedback</Link></li>
            <li><Link to="/home" className="sign-out-link">Sign Out</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main>
        <h2>Your Feedback from Trainer</h2>
        <button id="view-feedback-btn" onClick={toggleFeedback}>
          View Feedback
        </button>
        {isFeedbackVisible && (
          <div className="feedback-box" id="feedback-box">
            <table className="feedback-table">
              <thead>
                <tr>
                  <th>ClientName</th>
                  <th>Date</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {feedbackData.map((feedback, index) => (
                  <tr key={index}>
                    <td>{feedback.clientName}</td>
                    <td>{feedback.date}</td>
                    <td>{feedback.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Sign Out Modal */}
      {isModalVisible && (
        <div className="modal" id="confirmation-modal">
          <div className="modal-content">
            <p>Are you sure you want to sign out?</p>
            <div className="modal-buttons">
              <button
                id="confirm-sign-out"
                onClick={handleSignOut}
              >
                Yes
              </button>
              <button
                id="cancel-sign-out"
                className="cancel-btn"
                onClick={toggleModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientFeedback;
