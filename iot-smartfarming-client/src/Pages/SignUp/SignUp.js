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
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
    farmName: "",
    farmLocation: "",
    cropName: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    const newErrors = {};

    const requiredFields = [
      'fullName', 
      'userName', 
      'phoneNumber', 
      'email', 
      'password', 
      'confirmPassword',
      'farmName',
      'farmLocation',
      'cropName'
    ];
    
    requiredFields.forEach((field) => {
      if (!formData[field] || !formData[field].toString().trim()) {
        newErrors[field] = "This field is required";
      }
    });

    if (formData.phoneNumber && formData.phoneNumber.length !== 10) {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      let newUser = {
        fullName: formData.fullName,
        userName: formData.userName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
        name: formData.farmName,
        location: formData.farmLocation,
        cropName: formData.cropName
      };

      try {
        const result = await createNewUser(newUser);
        if (result.success) {
          console.log("User and farm created:", result.data);
        } else {
          console.error("Failed to create user:", result.error);
          setErrors({ submit: result.error });
        }
      } catch (error) {
        console.error("Error during signup:", error);
        setErrors({ submit: "An error occurred during signup" });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
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
      <Paper 
        elevation={1} 
        sx={{ 
          p: 4, 
          borderRadius: 5, 
          width: '100%', 
          maxWidth: 1200,
          mx: 2
        }}
      >
        <Typography variant="h4" fontWeight={600} component="h1" sx={{ mb: 1 }}>
          Sign up
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Create your account by filling in the information below.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={4}>
            {/* Left Column - User Details */}
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
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
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                margin="normal"
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
            </Grid>

            {/* Right Column - Farm Details */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, mt: 2 }}>
                Farm Information
              </Typography>
              
              <TextField
                margin="normal"
                fullWidth
                label="Farm Name"
                name="farmName"
                value={formData.farmName}
                onChange={handleChange}
                error={Boolean(errors.farmName)}
                helperText={errors.farmName}
                sx={{ mb: 2 }}
              />

              <TextField
                margin="normal"
                fullWidth
                label="Farm Location"
                name="farmLocation"
                value={formData.farmLocation}
                onChange={handleChange}
                error={Boolean(errors.farmLocation)}
                helperText={errors.farmLocation}
                sx={{ mb: 2 }}
              />

              <TextField
                margin="normal"
                fullWidth
                label="Crop Name"
                name="cropName"
                value={formData.cropName}
                onChange={handleChange}
                error={Boolean(errors.cropName)}
                helperText={errors.cropName}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          {errors.submit && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errors.submit}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 3,
              py: 1.5,
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            <Typography fontWeight={600}>Create Account</Typography>
          </Button>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" fontWeight={600} color="text.secondary">
              Already have an account?{" "}
              <Link href="/login" color="primary">
                Sign in here
              </Link>
            </Typography>
          </Box>

          <Alert severity="info" sx={{ mt: 3 }}>
            All fields are required for registration
          </Alert>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUp;
