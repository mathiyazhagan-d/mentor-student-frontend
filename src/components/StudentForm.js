import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStudent, getAllStudents } from '../services/studentService';
import { getAllMentors } from '../services/mentorService';
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function StudentForm() {
  const [mentors, setMentors] = useState([]);
  const [existingEmails, setExistingEmails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const mentorData = await getAllMentors();
        const studentData = await getAllStudents();
        setMentors(mentorData);
        const emails = studentData.map(student => student.email);
        setExistingEmails(emails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required')
      .test('existing-email', 'Email already exists', function (value) {
        return !existingEmails.includes(value);
      }),
    mentor: Yup.string().required('Mentor is required'), // Add validation for mentor selection
  });

  const handleSubmit = async (values) => {
    try {
      await createStudent({ name: values.name, email: values.email, mentor: values.mentor }); // Send mentor ID along with other values
      navigate('/students');
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', margin: '20px 0' }}>
        Create Student
      </Typography>
      <Formik
        initialValues={{ name: '', email: '', mentor: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ marginBottom: '20px' }}>
              <Field
                as={TextField}
                name="name"
                label="Name"
                fullWidth
                required
              />
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <Field
                as={TextField}
                name="email"
                label="Email"
                fullWidth
                required
              />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <FormControl fullWidth>
                <InputLabel id="mentor-select-label">Select Mentor</InputLabel>
                <Field
                  as={Select}
                  name="mentor"
                  labelId="mentor-select-label"
                  id="mentor-select"
                  fullWidth
                >
                  <MenuItem value="">
                    <em>Select Mentor</em>
                  </MenuItem>
                  {mentors.map((mentor) => ( 
                    <MenuItem key={mentor._id} value={mentor._id}>
                      {mentor.name}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
              <ErrorMessage name="mentor" component="div" style={{ color: 'red' }} /> {/* Display error message for mentor selection */}
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default StudentForm;
