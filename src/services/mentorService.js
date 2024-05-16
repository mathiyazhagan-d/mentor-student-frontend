import axios from 'axios';
import { REACT_APP_API_URL } from '../config/config';

const API_URL = REACT_APP_API_URL;
console.log(API_URL)

// Function to create a new mentor
export const createMentor = async (mentorData) => {
  try {
    const response = await axios.post(`${API_URL}/mentors`, mentorData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get all mentors
export const getAllMentors = async () => {
  try {
    const response = await axios.get(`${API_URL}/mentors`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get mentor details including assigned students by ID
export const getMentorDetails = async (mentorId) => {
  try {
    const response = await axios.get(`${API_URL}/mentors/${mentorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkExistingEmail = async (email) => {
  try {
    const mentors = await getAllMentors();
    return mentors.some((mentor) => mentor.email === email);
  } catch (error) {
    throw error;
  }
};
