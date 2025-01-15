import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout"; // Adjust the path if needed
import Overview from "./Pages/Overview/Overview"; // Adjust the path if needed
import Insights from "./Pages/Insights/Insights"; // Ensure you have an Insights component
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
          <Route element={<Layout />}>
            <Route
              path="/"
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
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
export default App;
