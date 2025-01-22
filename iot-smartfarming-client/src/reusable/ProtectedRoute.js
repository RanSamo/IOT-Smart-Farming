import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const token = localStorage.getItem("token");
  console.log("Token in ProtectedRoute:", token);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch("/api/users/protected", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("ProtectedRoute: Response status:", response.status);
        if (response.ok) {
          console.log("ProtectedRoute: Token is valid");
          setIsAuthorized(true);
        } else {
          const errorData = await response.json();
          console.error(
            "ProtectedRoute: Validation failed with message:",
            errorData.message
          );
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("ProtectedRoute: Error during fetch:", error);
        setIsAuthorized(false);
      }
    };

    if (token) {
      validateToken();
    } else {
      setIsAuthorized(false);
    }
  }, [token]);

  if (isAuthorized === null) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "108.5vh",
          backgroundColor: "#eff2fa",
        }}
      />
    );
  }
  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
