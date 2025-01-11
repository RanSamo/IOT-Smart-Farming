import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout"; // Adjust the path if needed
import Overview from "./Pages/Overview/Overview"; // Adjust the path if needed
import Insights from "./Pages/Insights/Insights"; // Ensure you have an Insights component
import Login from "./Pages/Login/Login";
import { ThemeProvider } from "@mui/material";
import mainTheme from "./Themes/mainTheme";

const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/insights" element={<Insights />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
export default App;
