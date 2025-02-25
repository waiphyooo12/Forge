import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const Home = () => {
  return (
    <div className="container">
      <header>
        <h1 className="logo">Physique Forge</h1>
      </header>
      <main>
        <h2>
          Transform your <span className="highlight">Body</span>
        </h2>
        <div className="login-box">
          {/* Sign In Button */}
          <Link to="/sign_in" className="btn">Sign In</Link>
          <span>Already have an account?</span>
          <br />

          {/* Sign Up Button */}
          <Link to="/sign_up" className="btn">Sign Up</Link>
          <span>Don't have an account?</span>
        </div>
      </main>
    </div>
  );
};

export default Home;
