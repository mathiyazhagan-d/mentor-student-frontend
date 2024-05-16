import axios from 'axios';
import { REACT_APP_API_URL } from '../config/config';


const API_URL = REACT_APP_API_URL;
// Function to create a new student
export const createStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_URL}/students`, studentData);
    return response.data;
  } catch (error) {
    console.error('Error creating student:', error.response || error.message);
    throw error;
  }
};

// Function to get all students
export const getAllStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/students`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all students:', error.response || error.message);
    throw error;
  }
};

// Function to get details of a specific student by ID
export const getStudentDetails = async (studentId) => {
  try {
    const response = await axios.get(`${API_URL}/students/${studentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching student details for ID ${studentId}:`, error.response || error.message);
    throw error;
  }
};

// Function to update details of a specific student by ID
export const updateStudent = async (studentId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/students/${studentId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating student details for ID ${studentId}:`, error.response || error.message);
    throw error;
  }
};


// Function to get all students assigned to a specific mentor by mentor ID
export const getAllStudentsbyMentor = async (mentorId) => {
  try {
    const response = await axios.get(`${API_URL}/students/mentor?id=${mentorId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching students for mentor ID ${mentorId}:`, error.response || error.message);
    throw error;
  }
};
