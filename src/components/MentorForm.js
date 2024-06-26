import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createMentor, checkExistingEmail } from '../services/mentorService'; // Import the function to check existing email

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'), 
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .test('existing-email', 'Email already exists', async function(value) {
      if (value) {
        const existingEmail = await checkExistingEmail(value);
        return !existingEmail;
      }
      return true;
    }),
});

function MentorForm() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await createMentor(values);
      navigate('/mentors');
    } catch (error) {
      console.error('Error creating mentor:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Mentor
        </Typography>
        <Formik
          initialValues={{ name: '', email: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Field
                  as={TextField}
                  type="text"
                  name="name"
                  label="Name"
                  fullWidth
                  margin="normal"
                  helperText={<ErrorMessage name="name" />}
                />
              </div>
              <div>
                <Field
                  as={TextField}
                  type="email"
                  name="email"
                  label="Email"
                  fullWidth
                  margin="normal"
                  helperText={<ErrorMessage name="email" />}
                />
              </div>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/mentors')}
                >
                  Close
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default MentorForm;
