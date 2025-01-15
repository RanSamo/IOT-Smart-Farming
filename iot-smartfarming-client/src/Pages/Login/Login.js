import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Alert,
  Paper,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  async function login(user) {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      // Check if the response is okay
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to login.");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      // Save the token (e.g., in localStorage or a cookie)
      localStorage.setItem("token", data.token);

      return data; // Return token or other relevant data
    } catch (error) {
      console.error("Error during login:", error.message);
      throw error; // Rethrow for further handling
    }
  }

  const validateForm = () => {
    const newErrors = {};

    /*if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }*/

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      if (email == "agro@dashboard.com" && password == "12345678") {
        navigate("/");
      }
      // Form is valid, handle submission
      console.log("Form submitted:", { email, password });
      let loginUser = {
        email: email,
        password: password,
      };
      login(loginUser)
        .then((data) => {
          console.log("User logged in successfully:", data);
        })
        .catch((error) => {
          console.error("Login failed:", error.message);
        });
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
                Sign in
              </Typography>

              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Fill in the fields below to sign into your account.
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                action="#"
              >
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  sx={{
                    mb: 2,
                  }}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  sx={{
                    mb: 2,
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Link href="#" variant="body2" color="primary">
                    Lost password?
                  </Link>
                </Box>

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
                  <Typography fontWeight={600}>Sign in</Typography>
                </Button>

                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="text.secondary"
                  >
                    Don't have an account, yet?{" "}
                    <Link href="/sign-up" color="primary">
                      Sign up here
                    </Link>
                  </Typography>
                </Box>
              </Box>

              <Alert severity="info" sx={{ mt: 3 }}>
                Use agro@dashboard.com and password 12345678
              </Alert>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Login;
