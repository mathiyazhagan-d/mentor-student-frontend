import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllMentors } from '../services/mentorService';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  Avatar,
  Button,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function MentorListPage() {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    async function fetchMentors() {
      try {
        const data = await getAllMentors();
        setMentors(data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    }
    fetchMentors();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
          <Typography variant="h4" gutterBottom style={{ color: '#3f51b5' }}>
            Mentor List
          </Typography>
          {/* Button to add new mentor */}
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/mentors/add"
          >
            Add Mentor
          </Button>
        </Box>
        <List>
          {mentors.map((mentor) => (
            <ListItem
              key={mentor._id}
              button
              component={Link}
              to={`/mentors/${mentor._id}`}
              style={{ textDecoration: 'none', borderBottom: '1px solid #ccc' }}
            >
              <Avatar style={{ marginRight: '10px', background: '#3f51b5' }}>
                <PersonIcon />
              </Avatar>
              <ListItemText primary={mentor.name} style={{ color: '#3f51b5' }} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default MentorListPage;
