import React from 'react';
import { Grid, Box, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import { Dashboard, Sensors } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => (
<Box 
  sx={{ 
    height: '105vh', 
    padding: 2, 
    backgroundColor: '#fff', 
    boxShadow: 2,
    borderRight: '1px solid #ddd' // Optional: add a border to separate from the main content
  }}
>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mt: 5, mb: 5 }}>
        AGRO Data
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        <ListItem 
          button 
          component={Link} 
          to="/" 
          sx={{ 
            '&:hover': { backgroundColor: '#f0f0f0' }, 
            textDecoration: 'none' // Ensure no underline on links
          }}
        >
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText primary={<span style={{ color: 'black' }}>Overview</span>} />
        </ListItem>
        <ListItem 
          button 
          component={Link} 
          to="/insights" 
          sx={{ 
            '&:hover': { backgroundColor: '#f0f0f0' }, 
            textDecoration: 'none' // Ensure no underline on links
          }}
        >
          <ListItemIcon><Sensors /></ListItemIcon>
          <ListItemText primary={<span style={{ color: 'black' }}>Insights</span>} />
        </ListItem>
      </List>
    </Box>
  );

const Layout = ({ children }) => (
  <Grid container sx={{ height: '100vh', overflow: 'visible',zIndex: 2 }}>
    {/* Sidebar */}
    <Grid item sm={1.5}>
      <Sidebar />
    </Grid>

    {/* Main content area */}
    <Grid item sm={10.5} sx={{ overflowY: 'auto',zIndex: 1 }}>
      {children}
    </Grid>
  </Grid>
);

export default Layout;
