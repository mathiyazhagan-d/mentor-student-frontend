import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMentorDetails } from '../services/mentorService';
import { getAllStudentsbyMentor } from '../services/studentService';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function MentorDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMentorDetails() {
      try {
        const mentorDetails = await getMentorDetails(id);
        const studentsData = await getAllStudentsbyMentor(id);
        setMentor(mentorDetails);
        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching mentor details:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMentorDetails();
  }, [id]);

  return (
    <Container maxWidth="md">
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <Box mt={5}>
          {mentor ? (
            <Paper elevation={3} style={{ padding: '20px', background: '#f5f5f5' }}>
              <Box display="flex" alignItems="center" mb={3}>
                <IconButton onClick={() => navigate('/mentors')} style={{ marginRight: '10px' }}>
                  <ArrowBackIcon />
                </IconButton>
                <Avatar style={{ background: '#3f51b5' }}>
                  <AccountCircleIcon />
                </Avatar>
                <Typography variant="h4" gutterBottom style={{ marginLeft: '10px', color: '#3f51b5' }}>
                  Mentor Details
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                <strong>Name:</strong> {mentor.name}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Email:</strong> {mentor.email}
              </Typography>
              <Typography variant="h5" gutterBottom mt={4} style={{ color: '#3f51b5' }}>
                Assigned Students
              </Typography>
              <Grid container spacing={3}>
                {students.map((student) => (
                  <Grid item xs={12} sm={6} md={4} key={student._id}>
                    <Card>
                      <CardHeader
                        avatar={
                          <Avatar style={{ background: '#3f51b5' }}>
                            <PersonIcon />
                          </Avatar>
                        }
                        title={student.name}
                        style={{ color: '#3f51b5' }}
                      />
                      <CardContent>
                        <Typography variant="body2" color="textSecondary">
                          <strong>Email:</strong> {student.email}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          ) : (
            <Typography variant="body1">Mentor not found</Typography>
          )}
        </Box>
      )}
    </Container>
  );
}

export default MentorDetailsPage;
