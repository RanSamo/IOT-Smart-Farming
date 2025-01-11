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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log({ email: email, password: password });
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
                  required
                  fullWidth
                  id="email"
                  label="Email address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    mb: 2,
                    "& .MuiFormLabel-asterisk": {
                      display: "none",
                    },
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
                    <Link href="#" color="primary">
                      Sign up here
                    </Link>
                  </Typography>
                </Box>
              </Box>

              <Alert severity="info" sx={{ mt: 3 }}>
                Use demo@example.com and password agrodashboard
              </Alert>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Login;
