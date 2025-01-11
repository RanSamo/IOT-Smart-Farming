import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  Paper,
  Grid,
} from "@mui/material";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <Grid item xs={12} sm={12}>
      <Box
        sx={{
          p: 3,
          backgroundColor: "#eff2fa",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6} lg={3}>
            <Paper elevation={1} sx={{ p: 4, borderRadius: 5 }}>
              <Typography
                variant="h4"
                fontWeight={600}
                component="h1"
                sx={{ mb: 1 }}
              >
                Sign up
              </Typography>

              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Create your account by filling in the information below.
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                action="#"
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={formData.name}
                  onChange={handleChange}
                  sx={{
                    mb: 2,
                    "& .MuiFormLabel-asterisk": {
                      display: "none",
                    },
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  sx={{
                    mb: 2,
                    "& .MuiFormLabel-asterisk": {
                      display: "none",
                    },
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  sx={{
                    mb: 2,
                    "& .MuiFormLabel-asterisk": {
                      display: "none",
                    },
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  sx={{
                    mb: 2,
                    "& .MuiFormLabel-asterisk": {
                      display: "none",
                    },
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  sx={{
                    mb: 2,
                    "& .MuiFormLabel-asterisk": {
                      display: "none",
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mb: 3,
                    py: 1.5,
                    backgroundColor: "primary.main",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  }}
                >
                  <Typography fontWeight={600}>Create Account</Typography>
                </Button>

                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="text.secondary"
                  >
                    Already have an account?{" "}
                    <Link href="#" color="primary">
                      Sign in here
                    </Link>
                  </Typography>
                </Box>
              </Box>

              <Alert severity="info" sx={{ mt: 3 }}>
                All fields are required for registration
              </Alert>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default SignUp;