import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/box_styles.css';

// API configuration
const API_URL = 'http://localhost:8080/api/workout-plans';

const WorkoutPlans = () => {
  const [planName, setPlanName] = useState('');
  const [workoutStatus, setWorkoutStatus] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [exercises, setExercises] = useState('');
  const [plans, setPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all workout plans on component mount
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(API_URL);
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const searchPlans = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const addPlan = async (event) => {
    event.preventDefault();
    if (planName && workoutStatus && durationMinutes && exercises) {
      const newPlan = {
        planName,
        workoutStatus,
        durationMinutes: parseFloat(durationMinutes), // Ensure it's a number
        exercises,
        createdById: 1, // Hardcoded for now
        updatedById: 1, // Hardcoded for now
        assignedClientId: 1,
      };

      try {
        const response = await axios.post(API_URL, newPlan);
        setPlans([...plans, response.data]);
        // Reset form fields
        setPlanName('');
        setWorkoutStatus('');
        setDurationMinutes('');
        setExercises('');
      } catch (error) {
        console.error('Error creating plan:', error);
      }
    }
  };

  const editPlan = async (index) => {
    const updatedPlanName = prompt('Edit Plan Name:', plans[index].planName);
    const updatedDurationMinutes = prompt('Edit Duration (minutes):', plans[index].durationMinutes);
    const updatedWorkoutStatus = prompt('Edit Status:', plans[index].workoutStatus);
    const updatedExercises = prompt('Edit Exercises:', plans[index].exercises);

    if (updatedPlanName && updatedDurationMinutes && updatedWorkoutStatus && updatedExercises) {
      const updatedPlan = {
        ...plans[index],
        planName: updatedPlanName,
        workoutStatus: updatedWorkoutStatus,
        durationMinutes: parseFloat(updatedDurationMinutes), // Convert to number
        exercises: updatedExercises,
      };

      try {
        await axios.put(`${API_URL}/${plans[index].id}`, updatedPlan);
        const updatedPlans = [...plans];
        updatedPlans[index] = updatedPlan;
        setPlans(updatedPlans);
      } catch (error) {
        console.error('Error updating plan:', error);
      }
    }
  };

  const deletePlan = async (id, index) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        const updatedPlans = plans.filter((_, i) => i !== index);
        setPlans(updatedPlans);
      } catch (error) {
        console.error('Error deleting plan:', error);
      }
    }
  };

  const assignPlan = (plan) => {
    localStorage.setItem('assignedPlan', JSON.stringify(plan));
    window.location.href = '/client-overview';
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
            <li><Link to="/workout-plans" className="active">Workout Plans</Link></li>
            <li><Link to="/assign-user">Assign Client</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
            <li><Link to="/trainer-rating">View Rating</Link></li>
            <li><Link to="/home" id="sign-out-btn">Sign Out</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main>
        <h2>Workout Plans</h2>

        {/* Form to Add Workout Plan */}
        <form className="input-form" onSubmit={addPlan}>
          <input
            type="text"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            placeholder="Plan Name"
            required
          />
          <br />
          <input
            type="text"
            value={workoutStatus}
            onChange={(e) => setWorkoutStatus(e.target.value)}
            placeholder="Status"
            required
          />
          <br />
          <input
            type="number"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
            placeholder="Duration (minutes)"
            required
          />
          <br />
          <textarea
            value={exercises}
            onChange={(e) => setExercises(e.target.value)}
            placeholder="Exercises"
            required
          />
          <button type="submit" className="btn">Create</button>
        </form>

        <br />

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={searchPlans}
            placeholder="Search"
          />
        </div>

        <br />

        {/* Workout Plans Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Duration (minutes)</th>
                <th>Status</th>
                <th>Exercises</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans
                .filter((plan) => plan.planName.toLowerCase().includes(searchQuery))
                .map((plan, index) => (
                  <tr key={plan.id || index}>
                    <td>{plan.planName}</td>
                    <td>{plan.durationMinutes || plan.duration}</td>
                    <td>{plan.workoutStatus || plan.status}</td>
                    <td>{plan.exercises}</td>
                    <td>
                      <button className="btn" onClick={() => editPlan(index)}>Edit</button>
                      <button className="btn" onClick={() => deletePlan(plan.id, index)}>Delete</button>
                      <button
                        className="btn"
                        onClick={() => assignPlan(plan)}
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default WorkoutPlans;