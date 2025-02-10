// import React from "react";
// import {
//   Grid,
//   Box,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Typography,
// } from "@mui/material";
// import { Dashboard, Sensors } from "@mui/icons-material";
// import { Link, Outlet } from "react-router-dom";


// const Sidebar = () => (
//   <Box
//     sx={{
//       height: "105vh",
//       padding: 2,
//       backgroundColor: "#fff",
//       boxShadow: 2,
//       borderRight: "1px solid #ddd", // Optional: add a border to separate from the main content
//     }}
//   >
//     <Typography
//       variant="h6"
//       gutterBottom
//       sx={{ textAlign: "center", mt: 5, mb: 5 }}
//     >
//       AGRO Data
//     </Typography>
//     <Divider sx={{ mb: 2 }} />
//     <List>
//       <ListItem
//         button
//         component={Link}
//         to="/overview"
//         sx={{
//           "&:hover": { backgroundColor: "#f0f0f0" },
//           textDecoration: "none", // Ensure no underline on links
//         }}
//       >
//         <ListItemIcon>
//           <Dashboard />
//         </ListItemIcon>
//         <ListItemText
//           primary={<span style={{ color: "black" }}>Overview</span>}
//         />
//       </ListItem>
//       <ListItem
//         button
//         component={Link}
//         to="/insights"
//         sx={{
//           "&:hover": { backgroundColor: "#f0f0f0" },
//           textDecoration: "none", // Ensure no underline on links
//         }}
//       >
//         <ListItemIcon>
//           <Sensors />
//         </ListItemIcon>
//         <ListItemText
//           primary={<span style={{ color: "black" }}>Insights</span>}
//         />
//       </ListItem>
//     </List>
//   </Box>
// );

// const Layout = ({ children }) => (
//   <Grid container sx={{ height: "100vh", overflow: "visible", zIndex: 2 }}>
//     {/* Sidebar */}
//     <Grid item sm={1.5}>
//       <Sidebar />
//     </Grid>

//     {/* Main content area */}
//     <Grid item sm={10.5} sx={{ overflowY: "auto", zIndex: 1 }}>
//       <Outlet>{children}</Outlet>
//     </Grid>
//   </Grid>
// );

// export default Layout;




import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { Dashboard, Sensors, WbSunny } from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  const [farmId, setFarmId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user && data.user.farmId) {
          setFarmId(data.user.farmId._id);
        }
      })
      .catch(err => console.error('Error fetching user data:', err));
    }
  }, []);

  return (
    <Box
      sx={{
        height: "105vh",
        padding: 2,
        backgroundColor: "#fff",
        boxShadow: 2,
        borderRight: "1px solid #ddd",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ textAlign: "center", mt: 5, mb: 5 }}
      >
        AGRO Data
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        <ListItem
          button
          component={Link}
          to="/overview"
          sx={{
            "&:hover": { backgroundColor: "#f0f0f0" },
            textDecoration: "none",
          }}
        >
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText
            primary={<span style={{ color: "black" }}>Overview</span>}
          />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/insights"
          sx={{
            "&:hover": { backgroundColor: "#f0f0f0" },
            textDecoration: "none",
          }}
        >
          <ListItemIcon>
            <Sensors />
          </ListItemIcon>
          <ListItemText
            primary={<span style={{ color: "black" }}>Insights</span>}
          />
        </ListItem>
        {farmId && (
          <ListItem
            button
            component={Link}
            to={`/WeatherDashboard/${farmId}`}
            sx={{
              "&:hover": { backgroundColor: "#f0f0f0" },
              textDecoration: "none",
            }}
          >
            <ListItemIcon>
              <WbSunny />
            </ListItemIcon>
            <ListItemText
              primary={<span style={{ color: "black" }}>Weather Dashboard</span>}
            />
          </ListItem>
        )}
      </List>
    </Box>
  );
};

const Layout = ({ children }) => (
  <Grid container sx={{ height: "100vh", overflow: "visible", zIndex: 2 }}>
    <Grid item sm={1.5}>
      <Sidebar />
    </Grid>
    <Grid item sm={10.5} sx={{ overflowY: "auto", zIndex: 1 }}>
      <Outlet>{children}</Outlet>
    </Grid>
  </Grid>
);

export default Layout;