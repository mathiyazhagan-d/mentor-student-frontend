import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import MentorForm from './components/MentorForm';
import StudentForm from './components/StudentForm';
import MentorListPage from './pages/MentorListPage';
import StudentListPage from './pages/StudentListPage';
import MentorDetailsPage from './components/MentorDetailsPage';
import StudentDetailsPage from './components/StudentDetailsPage';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}> 
        <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Poppins' }}>
              Mentor-Student
            </Typography>
            <Button color="inherit" component={Link} to="/mentors">Mentors</Button>
            <Button color="inherit" component={Link} to="/students">Students</Button>
          </Toolbar>
        </AppBar>
        <main style={{ flexGrow: 1, marginTop: '20px' }}>
          <Routes>
            <Route path="/mentors" element={<MentorListPage />} />
            <Route path="/mentors/add" element={<MentorForm />} />
            <Route path="/students/add" element={<StudentForm />} />
            <Route path="/mentors/:id" element={<MentorDetailsPage />} />
            <Route path="/students" element={<StudentListPage />} />
            <Route path="/students/:id" element={<StudentDetailsPage />} />
            <Route path="/" element={<StudentListPage />} />
          </Routes>
        </main>
        <footer style={{ backgroundColor: '#f5f5f5', padding: '20px', marginTop: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {/* Center content */}
  <Typography variant="body2" color="textSecondary">
    &copy; 2024 Mathiyazhagan. All rights reserved.
  </Typography>
</footer>

      </div>
    </Router>
  );
}

export default App;
