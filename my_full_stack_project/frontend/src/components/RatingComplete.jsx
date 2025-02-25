import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/rating.css";
import "../styles/styles2.css";

const RatingComplete = () => {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const storedRating = localStorage.getItem("rating");
    if (storedRating) {
      setRating(storedRating);
    }
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">Physique Forge</div>
        <nav>
          <ul>
            <li>
              <Link to="/client-profile" className="page-link">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/client-workoutplan" className="page-link">
                Workout Plan
              </Link>
            </li>
            <li>
              <Link to="/client-rating" className="page-link active">
                Rating
              </Link>
            </li>
            <li>
              <Link to="/client-feedback" className="page-link">
                Feedback
              </Link>
            </li>
            <li>
              <Link to="/home" className="sign-out-link">
                Sign Out
              </Link>
            </li>
            
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main id="main-content">
        <div className="rating-container">
          <h2>Rating Completed</h2>
          <div className="rating-box">
            <p>Thank you for submitting your rating!</p>
            <p>You rated your trainer: 
              <span id="rating-value"> {rating || "No rating given."} </span>
              <span id="stars">{rating ? "★".repeat(rating) : ""}</span>
            </p>
            <Link to="/client-rating" className="btn">Go Back to Rating Page</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RatingComplete;
