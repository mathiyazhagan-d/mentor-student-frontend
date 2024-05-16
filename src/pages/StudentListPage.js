import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllStudents } from '../services/studentService';
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
import SchoolIcon from '@mui/icons-material/School';

function StudentListPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }
    fetchStudents();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f5f5f5', marginBottom: '20px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
          <Typography variant="h4" style={{ color: '#3f51b5' }}>
            Student List
          </Typography>
          <Button component={Link} to="/students/add" variant="contained" color="primary">
            Add Student
          </Button>
        </Box>
        <List>
          {students.map((student) => (
            <ListItem
              key={student._id}
              button
              component={Link}
              to={`/students/${student._id}`}
              style={{ textDecoration: 'none', borderBottom: '1px solid #ccc' }}
            >
              <Avatar style={{ marginRight: '10px', background: '#3f51b5' }}>
                <SchoolIcon />
              </Avatar>
              <ListItemText primary={student.name} style={{ color: '#3f51b5' }} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default StudentListPage;
