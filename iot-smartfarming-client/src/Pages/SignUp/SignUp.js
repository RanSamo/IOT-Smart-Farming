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

async function createNewUser(newUser) {
  try {
    const response = await fetch("/api/users/newUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating user:", errorData.error);
      return { success: false, error: errorData.error };
    }

    const data = await response.json();
    console.log("User and farm created successfully:", data);
    return { success: true, data };
  } catch (err) {
    console.error("An error occurred:", err.message);
    return { success: false, error: err.message };
  }
}

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    if (formData.phoneNumber && formData.phoneNumber.length != 10) {
      newErrors.phoneNumber = "Phone Number must be 10 characters";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, handle submission
      console.log("Form submitted:", formData);
      let newUser = {
        fullName: formData.fullName,
        userName: formData.userName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
        name: "Default Farm Name",
        location: "Unknown",
      };
      createNewUser(newUser).then((result) => {
        if (result.success) {
          console.log("User and farm created:", result.data);
        } else {
          console.error("Failed to create user:", result.error);
        }
      });
      console.log(newUser);
    } else {
      // Form has errors
      setErrors(newErrors);
    }
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

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  error={Boolean(errors.fullName)}
                  helperText={errors.fullName}
                  sx={{ mb: 2 }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  error={Boolean(errors.userName)}
                  helperText={errors.userName}
                  sx={{ mb: 2 }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  error={Boolean(errors.phoneNumber)}
                  helperText={errors.phoneNumber}
                  sx={{ mb: 2 }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  sx={{ mb: 2 }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  sx={{ mb: 2 }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={Boolean(errors.confirmPassword)}
                  helperText={errors.confirmPassword}
                  sx={{ mb: 2 }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mb: 3,
                    py: 1.5,
                    backgroundColor: "primary.main",
                    "&:hover": { backgroundColor: "primary.dark" },
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
                    <Link href="/login" color="primary">
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
