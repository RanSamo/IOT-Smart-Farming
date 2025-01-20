import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./Layout";
import Overview from "./Pages/Overview/Overview";
import Insights from "./Pages/Insights/Insights";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import { ThemeProvider } from "@mui/material";
import mainTheme from "./Themes/mainTheme";
import ProtectedRoute from "./reusable/ProtectedRoute";

const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <Routes>
          {/* Redirect root path to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* Protected routes under Layout */}
          <Route element={<Layout />}>
            <Route
              path="/overview"
              element={
                <ProtectedRoute>
                  <Overview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/insights"
              element={
                <ProtectedRoute>
                  <Insights />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
