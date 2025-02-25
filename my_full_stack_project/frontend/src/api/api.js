import axios from 'axios';

// Base URLs
const CLIENT_API_URL = 'http://localhost:8080/api/clients'; // Replace with your backend URL
const TRAINER_API_URL = 'http://localhost:8080/api/trainers'; // Replace with your backend URL
const WORKOUT_PLAN_API_URL = 'http://localhost:8080/api/workout-plans'; // Replace with your backend URL

// Client API Functions
export const createClient = async (clientData) => {
  try {
    const response = await axios.post(CLIENT_API_URL, clientData);
    return response.data;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

export const getAllClients = async () => {
  try {
    const response = await axios.get(CLIENT_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

export const updateClient = async (id, clientData) => {
  try {
    const response = await axios.put(`${CLIENT_API_URL}/${id}`, clientData);
    return response.data;
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
};

export const deleteClient = async (id) => {
  try {
    const response = await axios.delete(`${CLIENT_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
};

// Trainer API Functions
export const createTrainer = async (trainerData) => {
  try {
    const response = await axios.post(TRAINER_API_URL, trainerData);
    return response.data;
  } catch (error) {
    console.error('Error creating trainer:', error);
    throw error;
  }
};

export const getAllTrainers = async () => {
  try {
    const response = await axios.get(TRAINER_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching trainers:', error);
    throw error;
  }
};

export const getTrainerById = async (id) => {
  try {
    const response = await axios.get(`${TRAINER_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trainer by ID:', error);
    throw error;
  }
};

export const updateTrainer = async (id, trainerData) => {
  try {
    const response = await axios.put(`${TRAINER_API_URL}/${id}`, trainerData);
    return response.data;
  } catch (error) {
    console.error('Error updating trainer:', error);
    throw error;
  }
};

export const deleteTrainers = async (trainerIds) => {
  try {
    const response = await axios.delete(TRAINER_API_URL, {
      data: { ids: trainerIds }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting trainers:', error);
    throw error;
  }
};

// Workout Plan API Functions
export const createWorkoutPlan = async (workoutPlanData) => {
  try {
    const response = await axios.post(WORKOUT_PLAN_API_URL, workoutPlanData);
    return response.data;
  } catch (error) {
    console.error('Error creating workout plan:', error);
    throw error;
  }
};

export const getAllWorkoutPlans = async () => {
  try {
    const response = await axios.get(WORKOUT_PLAN_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching workout plans:', error);
    throw error;
  }
};

export const getWorkoutPlanById = async (id) => {
  try {
    const response = await axios.get(`${WORKOUT_PLAN_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching workout plan by ID:', error);
    throw error;
  }
};

export const updateWorkoutPlan = async (id, workoutPlanData) => {
  try {
    const response = await axios.put(`${WORKOUT_PLAN_API_URL}/${id}`, workoutPlanData);
    return response.data;
  } catch (error) {
    console.error('Error updating workout plan:', error);
    throw error;
  }
};

export const deleteWorkoutPlan = async (id) => {
  try {
    const response = await axios.delete(`${WORKOUT_PLAN_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting workout plan:', error);
    throw error;
  }
};