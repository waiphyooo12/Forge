import React, { useState, useEffect } from "react";
import "../styles/box_styles.css";
import {Link} from "react-router-dom";
const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [feedbackHistory, setFeedbackHistory] = useState(
    JSON.parse(localStorage.getItem("feedbackHistory")) || []
  );

  useEffect(() => {
    localStorage.setItem("feedbackHistory", JSON.stringify(feedbackHistory));
  }, [feedbackHistory]);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    if (!feedback.trim()) {
      alert("Please enter feedback before submitting.");
      return;
    }

    const newFeedback = {
      date: new Date().toLocaleDateString(),
      feedback,
    };

    setFeedbackHistory([...feedbackHistory, newFeedback]);
    setFeedback("");
    alert("Feedback submitted successfully!");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">Physique Forge</div>
        <nav>
          <ul>
            <li><Link to="/trainer-profile">Profile</Link></li>
            <li><Link to="/client-overview">Client Overview</Link></li>
            <li><Link to="/workout-plans">Workout Plan</Link></li>

            <li><Link to="/assign-user">Assign Client</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
            <li><Link to="/trainer-rating">View Rating</Link></li>
            <li><Link to="/home" id="sign-out-btn">Sign Out</Link></li>
            
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h2>Trainer Feedback</h2>

        {/* Feedback Input Section */}
        <div className="feedback-section">
          <label htmlFor="feedback-text">Write Feedback:</label>
          <textarea
            id="feedback-text"
            placeholder="Type your feedback here..."
            rows="8"
            value={feedback}
            onChange={handleFeedbackChange}
          ></textarea>
          <button className="btn" onClick={handleSubmit}>
            Submit Feedback
          </button>
        </div>

        {/* Feedback History Section */}
        <h2>Feedback History</h2>
        <table>
          <thead>
            <tr>
              <th>Trainer</th>
              <th>Date</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {feedbackHistory.map((entry, index) => (
              <tr key={index}>
                <td>Trainer</td>
                <td>{entry.date}</td>
                <td>{entry.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Feedback;
