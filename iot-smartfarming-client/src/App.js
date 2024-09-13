import React from 'react';
import { Drawer, Typography, Box, Divider,Container,Grid } from '@mui/material/';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import AutoFixHighTwoToneIcon from '@mui/icons-material/AutoFixHighTwoTone';

function App() {
  return (
    <div style={{ backgroundColor: '#f4f7fe', minHeight: '100vh', width: '100vw' }}>
      <Drawer
        variant="permanent"
        sx={{ width: 300, flexShrink: 0, '& .MuiDrawer-paper': { width: 300 } }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', paddingTop: '80px', alignItems: 'center' }}>
          <Typography variant="h4">OUR Company</Typography>
          <Divider sx={{ width: '70%', marginY: 2 }} />
          <Container sx={{display: 'flex',flexDirection:'row',paddingBottom:'30px'}}>
            <HomeTwoToneIcon sx={{paddingRight:'20px'}}/>
            <Typography variant="h6">Main Dashboard</Typography>
          </Container>
          <Container sx={{display: 'flex',flexDirection:'row'}}>
            <AutoFixHighTwoToneIcon sx={{paddingRight:'20px'}}/>
            <Typography variant="h6">something nice</Typography>
          </Container>
        </Box>
      </Drawer>
    </div>
  );
}

export default App;