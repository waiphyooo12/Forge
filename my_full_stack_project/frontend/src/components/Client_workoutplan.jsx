import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import '../styles/workoutplan.css';

const ClientWorkoutPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(localStorage.getItem('selectedWorkoutPlan') || 'ppl');
  const [workoutNote, setWorkoutNote] = useState(localStorage.getItem('workoutNote') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const workoutPlans = {
    ppl: {
      name: 'PPL',
      duration: '1 Hour',
      status: 'Beginner',
      exercises: 'Pull-ups, Push-ups, Squats',
    },
    hypertrophy: {
      name: 'Hypertrophy',
      duration: '45 Min',
      status: 'Intermediate',
      exercises: 'Rows, Dips, Leg Press',
    },
    strength: {
      name: 'Strength Training',
      duration: '1 Hour',
      status: 'Advanced',
      exercises: 'Squats, Deadlifts, Bench Press',
    },
  };

  const plan = workoutPlans[selectedPlan];

  useEffect(() => {
    localStorage.setItem('selectedWorkoutPlan', selectedPlan);
  }, [selectedPlan]);

  useEffect(() => {
    localStorage.setItem('workoutNote', workoutNote);
  }, [workoutNote]);

  const handleNoteChange = (event) => {
    setWorkoutNote(event.target.value);
  };

  const handleSaveNote = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Simulate an API call to save the note
      // await saveWorkoutNoteAPI(workoutNote);
      alert('Note saved successfully!');
    } catch (error) {
      console.error('Error saving note:', error);
      setError('Failed to save note. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">Physique Forge</div>
        <nav>
          <ul>
            <li><Link to="/client-profile" className="page-link">Profile</Link></li>
            <li><Link to="/client-workoutplan" className="page-link active">Workout Plan</Link></li>
            <li><Link to="/client-rating" className="page-link">Rating</Link></li>
            <li><Link to="/client-feedback" className="page-link">Feedback</Link></li>
            <li><Link to="/home" className="sign-out-link">Sign Out</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main>
        <h2>My Workout Plan</h2>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Workout Plan Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Exercises</th>
                <th>User Note</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{plan.name}</td>
                <td>{plan.duration}</td>
                <td>{plan.status}</td>
                <td>{plan.exercises}</td>
                <td>{workoutNote}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Add Note Section */}
        <div className="input-container">
          <input
            type="text"
            value={workoutNote}
            onChange={handleNoteChange}
            placeholder="Enter your note"
            aria-label="Workout Note"
          />
          <button
            className="btn"
            onClick={handleSaveNote}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Note'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default ClientWorkoutPlan;