import React, { useState } from 'react';
import '../styles/rating.css'; // Importing the CSS file
import '../styles/styles2.css';
import { Link, useNavigate } from 'react-router-dom';

const ClientRating = () => {
  const [rating, setRating] = useState(localStorage.getItem('rating') || '');
  const navigate = useNavigate();

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the rating submission logic here (e.g., send to backend)
    // After submission, redirect to the "Rating Completed" page
    navigate('/rating-complete', { state: { rating } });
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">Physique Forge</div>
        <nav>
          <ul>
            <li><Link to="/client-profile" className="page-link">Profile</Link></li>
            <li><Link to="/client-workoutplan" className="page-link">Workout Plan</Link></li>
            <li><Link to="/client-rating" className="page-link active">Rating</Link></li>
            <li><Link to="/client-feedback" className="page-link">Feedback</Link></li>
            <li><Link to="/home" className="sign-out-link">Sign Out</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main id="main-content">
        <div className="rating-container">
          <h2>Rate Your Trainer</h2>
          <div className="rating-box">
            <p>Please select a star rating to provide your feedback:</p>
            <form className="rating-form" onSubmit={handleSubmit}>
              <div className="rating">
                {[5, 4, 3, 2, 1].map((value) => (
                  <React.Fragment key={value}>
                    <input 
                      type="radio" 
                      id={`star${value}`} 
                      name="rating" 
                      value={value} 
                      checked={rating === String(value)}
                      onChange={handleRatingChange} 
                      required 
                    />
                    <label htmlFor={`star${value}`} title={`${value} stars`}>★</label>
                  </React.Fragment>
                ))}
              </div>
              <button type="submit" className="btn">Submit Rating</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientRating;
