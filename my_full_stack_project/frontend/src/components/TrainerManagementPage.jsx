import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/trainer_styles.css';
import { getTrainerById, updateTrainer, deleteTrainers } from '../api/api'; // Adjust the import path as needed

const TrainerManagementPage = () => {
  const [trainers, setTrainers] = useState([]);
  const [pendingTrainers, setPendingTrainers] = useState([]);
  const [selectedTrainers, setSelectedTrainers] = useState([]);
  const [editingTrainerId, setEditingTrainerId] = useState(null);
  const [editedTrainerData, setEditedTrainerData] = useState({
    name: '',
    email: '',
    experience: '',
    dob: '',
    specialization: '',
    isActive: '',
  });

  // Fetch trainers from the backend API
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/trainers');
        if (!response.ok) {
          throw new Error('Failed to fetch trainers');
        }
        const data = await response.json();
        setTrainers(data);
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };

    fetchTrainers();
  }, []);

  // Fetch trainer by ID when editingTrainerId changes
  useEffect(() => {
    const fetchTrainerById = async () => {
      if (editingTrainerId) {
        try {
          const trainer = await getTrainerById(editingTrainerId);
          setEditedTrainerData({
            name: trainer.name,
            email: trainer.email,
            experience: trainer.experience,
            dob: trainer.dob,
            specialization: trainer.specialization,
            isActive: trainer.isActive,
          });
        } catch (error) {
          console.error(`Error fetching trainer with ID ${editingTrainerId}:`, error);
        }
      }
    };

    fetchTrainerById();
  }, [editingTrainerId]);

  const handleEditTrainer = (trainer) => {
    setEditingTrainerId(trainer.id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTrainerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateTrainers = async () => {
    if (!editingTrainerId) {
      alert("Please select a trainer to update.");
      return;
    }

    try {
      await updateTrainer(editingTrainerId, editedTrainerData);
      const updatedTrainers = trainers.map((trainer) => {
        if (trainer.id === editingTrainerId) {
          return {
            ...trainer,
            ...editedTrainerData,  // Apply edited data
            updatedAt: new Date().toLocaleDateString(),
          };
        }
        return trainer;
      });

      setTrainers(updatedTrainers);
      setEditingTrainerId(null); // Exit editing mode
      alert('Trainer updated successfully!');
    } catch (error) {
      console.error('Error updating trainer:', error);
      alert('Failed to update trainer. Please try again.');
    }
  };

  const handleDeleteSelectedRows = async () => {
    if (selectedTrainers.length === 0) {
      alert('Please select trainers to delete');
      return;
    }

    try {
      const confirmation = window.confirm(
        `Are you sure you want to delete ${selectedTrainers.length} trainer(s)?`
      );

      if (confirmation) {
        // Call the API to delete trainers
        await deleteTrainers(selectedTrainers);
        
        // Update the local state after successful deletion
        const updatedTrainers = trainers.filter(
          (trainer) => !selectedTrainers.includes(trainer.id)
        );
        
        setTrainers(updatedTrainers);
        setSelectedTrainers([]);
        alert('Trainers deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting trainers:', error);
      alert('Failed to delete trainers. Please try again.');
    }
  };

  const handleSearchTable = (e) => {
    const searchInput = e.target.value.toLowerCase();
    document.querySelectorAll("#trainerTable tbody tr, #pendingTrainerTable tbody tr").forEach((row) => {
      row.style.display = Array.from(row.children).some((td) =>
        td.textContent.toLowerCase().includes(searchInput)
      )
        ? ""
        : "none";
    });
  };

  const handleSelectTrainer = (trainerId) => {
    setSelectedTrainers((prev) =>
      prev.includes(trainerId) ? prev.filter(id => id !== trainerId) : [...prev, trainerId]
    );
  };

  const handleApproveTrainer = async (trainer) => {
    try {
      const updatedTrainer = { ...trainer, isActive: "true" };

      await updateTrainer(trainer.id, updatedTrainer);

      setTrainers((prev) => [...prev, updatedTrainer]);
      setPendingTrainers((prev) => prev.filter((t) => t.id !== trainer.id));

      alert(`Trainer ${trainer.name} approved successfully!`);
    } catch (error) {
      console.error('Error approving trainer:', error);
      alert('Failed to approve trainer.');
    }
  };

  const handleDeclineTrainer = async (trainer) => {
    setPendingTrainers((prev) => prev.filter((t) => t.id !== trainer.id));
    alert(`Trainer ${trainer.name} declined.`);
  };

  const handleAddTrainer = (newTrainer) => {
    setPendingTrainers((prev) => [...prev, newTrainer]);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">Physique Forge</div>
        <ul>
          <li><Link to="/trainer-management">Trainer Management</Link></li>
          <li><Link to="/client-list">Client Management</Link></li>
          <li><Link to="/home" className="sign-out-link">Sign Out</Link></li>
        </ul>
      </div>

      <div className="main-content">
        <h2>Trainer List</h2>
        <div className="toolbar">
          <Link to="/add-trainer">
            <button className="add-btn" onClick={() => handleAddTrainer({
              id: Date.now(), // Example ID, replace with actual ID generation logic
              name: 'New Trainer',
              email: 'newtrainer@example.com',
              experience: 0,
              dob: '2000-01-01',
              specialization: 'General',
              isActive: 'No',
              hireDate: new Date().toLocaleDateString(),
              updatedAt: new Date().toLocaleDateString(),
            })}>Add</button>
          </Link>
          <button className="update-btn" onClick={handleUpdateTrainers}>Update</button>
          <button className="delete-btn" onClick={handleDeleteSelectedRows}>Delete</button>
          <input type="search" placeholder="Search" className="search-box" onKeyUp={handleSearchTable} />
        </div>

        <table id="trainerTable">
          <thead>
            <tr>
              <th>Select</th>
              <th>TrainerId</th>
              <th>Name</th>
              <th>Email</th>
              <th>ExperienceYears</th>
              <th>Specialization</th>
              <th>IsActive</th>
              <th>HireDate</th>
              <th>UpdatedAt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.length > 0 ? (
              trainers.map((trainer) => (
                <tr key={trainer.id} data-id={trainer.id}>
                  <td>
                    <input
                      type="checkbox"
                      className="row-checkbox"
                      checked={selectedTrainers.includes(trainer.id)}
                      onChange={() => handleSelectTrainer(trainer.id)}
                    />
                  </td>
                  <td>{trainer.id}</td>
                  <td>
                    {editingTrainerId === trainer.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editedTrainerData.name}
                        onChange={handleChange}
                      />
                    ) : (
                      <span onClick={() => handleEditTrainer(trainer)}>{trainer.name}</span>
                    )}
                  </td>
                  <td>
                    {editingTrainerId === trainer.id ? (
                      <input
                        type="text"
                        name="email"
                        value={editedTrainerData.email}
                        onChange={handleChange}
                      />
                    ) : (
                      <span onClick={() => handleEditTrainer(trainer)}>{trainer.email}</span>
                    )}
                  </td>
                  <td>
                    {editingTrainerId === trainer.id ? (
                      <input
                        type="number"
                        name="experience"
                        value={editedTrainerData.experience}
                        onChange={handleChange}
                      />
                    ) : (
                      <span onClick={() => handleEditTrainer(trainer)}>{trainer.experience}</span>
                    )}
                  </td>
                  <td>
                    {editingTrainerId === trainer.id ? (
                      <input
                        type="text"
                        name="specialization"
                        value={editedTrainerData.specialization}
                        onChange={handleChange}
                      />
                    ) : (
                      <span onClick={() => handleEditTrainer(trainer)}>{trainer.specialization}</span>
                    )}
                  </td>
                  <td>
                    {editingTrainerId === trainer.id ? (
                      <input
                        type="text"
                        name="isActive"
                        value={editedTrainerData.isActive}
                        onChange={handleChange}
                      />
                    ) : (
                      <span onClick={() => handleEditTrainer(trainer)}>{trainer.isActive}</span>
                    )}
                  </td>
                  <td>{trainer.hireDate}</td>
                  <td>{trainer.updatedAt}</td>
                  <td>
                    {editingTrainerId === trainer.id && (
                      <button onClick={handleUpdateTrainers}>Save</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="10">No trainers available</td></tr>
            )}
          </tbody>
        </table>

        <br />
        <h2>Pending Trainer List</h2>
        <table id="pendingTrainerTable">
          <thead>
            <tr>
              <th>TrainerId</th>
              <th>Name</th>
              <th>Email</th>
              <th>ExperienceYears</th>
              <th>DateOfBirth</th>
              <th>Specialization</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingTrainers.length > 0 ? (
              pendingTrainers.map((trainer) => (
                <tr key={trainer.id}>
                  <td>{trainer.id}</td>
                  <td>{trainer.name}</td>
                  <td>{trainer.email}</td>
                  <td>{trainer.experience}</td>
                  <td>{trainer.dob}</td>
                  <td>{trainer.specialization}</td>
                  <td>
                    <button onClick={() => handleApproveTrainer(trainer)}>Approve</button>
                    <button onClick={() => handleDeclineTrainer(trainer)}>Decline</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7">No pending trainers</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainerManagementPage;