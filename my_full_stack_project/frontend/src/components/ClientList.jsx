import React, { useState, useEffect } from "react";
import "../styles/admin2.css"; // Ensure your CSS is correctly imported
import { Link, useNavigate } from 'react-router-dom';  // Import the Link and useNavigate components
import { getAllClients, updateClient, deleteClient } from '../api/api'; // Import the API functions

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [searchClients, setSearchClients] = useState("");
  const [searchRatings, setSearchRatings] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClientIds, setSelectedClientIds] = useState([]);

  // Load clients
  useEffect(() => {
    loadClients();
    loadRatings();
  }, []);

  const loadClients = async () => {
    try {
      const response = await getAllClients();
      // If the API call returns an empty array, add an example client for testing
      if (response.length === 0) {
        setClients([{
          id: "1",
          name: "John Doe",
          height: 175,
          weight: 70,
          phone: "123-456-7890",
          fitnessGoal: "Weight Loss",
          email: "john.doe@example.com",
          status: "Active",
          userNote: "Needs weekly check-in",
        }]);
      } else {
        setClients(response);
      }
    } catch (error) {
      console.error('Error loading clients:', error);
      // Add an example client if the API call fails
      setClients([{
        id: "1",
        name: "John Doe",
        height: 175,
        weight: 70,
        phone: "123-456-7890",
        fitnessGoal: "Weight Loss",
        email: "john.doe@example.com",
        status: "Active",
        userNote: "Needs weekly check-in",
      }]);
    }
  };

  const loadRatings = () => {
    // Replace this with an API call if needed
    setRatings([
      { clientName: "Tommy", trainerName: "Mike", rating: 5 },
      { clientName: "John", trainerName: "Sarah", rating: 4 },
    ]);
  };

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  const handleCheckboxChange = (id) => {
    setSelectedClientIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleUpdate = async () => {
    try {
      // Example: Update the first selected client (you can modify this logic)
      const clientToUpdate = clients.find(client => client.id === selectedClientIds[0]);
      if (clientToUpdate) {
        const updatedClient = await updateClient(clientToUpdate.id, { ...clientToUpdate, name: "Updated Name" });
        setClients(clients.map(client => client.id === updatedClient.id ? updatedClient : client));
      }
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  const handleDelete = async () => {
    try {
      for (const id of selectedClientIds) {
        await deleteClient(id);
      }
      setClients(clients.filter(client => !selectedClientIds.includes(client.id)));
      setSelectedClientIds([]);
    } catch (error) {
      console.error('Error deleting clients:', error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">Physique Forge</div>
        <ul>
          <li><Link to="/trainer-management">Trainer Management</Link></li>
          <li><Link to="/client-list" className="active">Client Management</Link></li>
          <li><Link to="/home" className="sign-out-link">Sign Out</Link></li>
        </ul>
      </div>

      {/* Sign-out Modal */}
      {isModalVisible && (
        <div className="modal" id="signout-modal">
          <div className="modal-content">
            <p>Are you sure you want to sign out?</p>
            <div className="modal-buttons">
              <button onClick={() => (window.location.href = "/signin")}>
                Yes
              </button>
              <button onClick={toggleModal} className="cancel-btn">
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        {/* Client Table */}
        <h2>Client List</h2>
        <div className="toolbar">
          <button className="update-btn" onClick={handleUpdate}>
            Update
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
          <input
            type="search"
            placeholder="Search Clients"
            className="search-box"
            onChange={(e) => setSearchClients(e.target.value.toLowerCase())}
          />
        </div>

        <table id="clientTable">
          <thead>
            <tr>
              <th>Select</th>
              <th>ClientID</th>
              <th>Name</th>
              <th>Height(cm)</th>
              <th>Weight(kg)</th>
              <th>Phone</th>
              <th>Fitness Goal</th>
              <th>Email</th>
              <th>Status</th>
              <th>User Note</th>
            </tr>
          </thead>
          <tbody>
            {clients
              .filter((client) =>
                Object.values(client).some((val) =>
                  val.toString().toLowerCase().includes(searchClients)
                )
              )
              .map((client) => (
                <tr key={client.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedClientIds.includes(client.id)}
                      onChange={() => handleCheckboxChange(client.id)}
                    />
                  </td>
                  <td>{client.id}</td>
                  <td>{client.name}</td>
                  <td>{client.height}</td>
                  <td>{client.weight}</td>
                  <td>{client.phone}</td>
                  <td>{client.fitnessGoal}</td>
                  <td>{client.email}</td>
                  <td>{client.status}</td>
                  <td>{client.userNote}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Rating Table */}
        <h2>Client Ratings</h2>
        <div className="toolbar">
          <input
            type="search"
            placeholder="Search Ratings"
            className="search-box"
            onChange={(e) => setSearchRatings(e.target.value.toLowerCase())}
          />
        </div>

        <table id="ratingTable">
          <thead>
            <tr>
              <th>Select</th>
              <th>Client Name</th>
              <th>Trainer Name</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {ratings
              .filter((rating) =>
                Object.values(rating).some((val) =>
                  val.toString().toLowerCase().includes(searchRatings)
                )
              )
              .map((rating, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{rating.clientName}</td>
                  <td>{rating.trainerName}</td>
                  <td>{rating.rating}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientManagement;