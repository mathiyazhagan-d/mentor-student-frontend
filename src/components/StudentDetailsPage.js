import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentDetails, updateStudent } from '../services/studentService';
import { getAllMentors } from '../services/mentorService';
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Backdrop,
} from '@mui/material';

function StudentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [newMentor, setNewMentor] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const studentDetails = await getStudentDetails(id);
        setStudent(studentDetails);
        setNewMentor(studentDetails.mentor); // Set current mentor as default
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student details:', error);
        setError('Failed to load student details.');
        setLoading(false);
      }
    }

    async function fetchMentorsData() {
      try {
        const mentorsData = await getAllMentors();
        setMentors(mentorsData);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    }

    fetchData();
    fetchMentorsData();
  }, [id]);

  const handleMentorChange = (event) => {
    setNewMentor(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await updateStudent(id, { name: student.name, email: student.email, mentor: newMentor });
      const updatedStudent = { ...student, mentor: newMentor }; 
      setStudent(updatedStudent); 
      navigate(`/students/${id}`);
    } catch (error) {
      console.error('Error updating student mentor:', error);
      setError('Failed to update mentor.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Backdrop open={loading} style={{ zIndex: 1300, color: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#3f51b5' }}>
          Student Details
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Name:</strong> {student.name}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Email:</strong> {student.email}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Mentor:</strong> {student.mentor}
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
            <InputLabel id="mentor-select-label">Change Mentor</InputLabel>
            <Select
              labelId="mentor-select-label"
              id="mentor-select"
              value={newMentor}
              onChange={handleMentorChange}
            >
              {mentors.map((mentor) => (
                <MenuItem key={mentor._id} value={mentor._id}>
                  {mentor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: '10px' }}
              disabled={submitting}
            >
              {submitting ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginTop: '10px' }}
              onClick={() => navigate('/students')}
              disabled={submitting}
            >
              Close
            </Button>
          </Box>
        </form>
        {submitting && (
          <Backdrop open={submitting} style={{ zIndex: 1300, color: '#fff' }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Paper>
    </Container>
  );
}

export default StudentDetailsPage;
