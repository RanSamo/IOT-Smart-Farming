import React from 'react';
import { Grid, Card, CardContent, Typography, Box, List, ListItem, ListItemIcon, ListItemText,Divider } from '@mui/material';
import { Dashboard, Settings, Sensors, BarChart, Thermostat, WaterDrop, Opacity, WbSunny, Science,Spa,WaterOutlined,Cloud } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const App = () => {
  // Sidebar component
  const Sidebar = () => (
    <Box sx={{ height: '100vh', padding: 2 }}>
      {/* AGRO Data Text */}
      <Typography variant="h6" gutterBottom sx={{textAlign: 'center',mt: 5,mb: 5}}>
        AGRO Data
      </Typography>
      
      {/* Divider below the text */}
      <Divider sx={{ mb: 2 }} />
  
      {/* Buttons */}
      <List>
        <ListItem button>
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Sensors /></ListItemIcon>
          <ListItemText primary="Insights" />
        </ListItem>
      </List>
    </Box>
  );

  // Sensor card component
  const SensorCard = ({ title, value, icon }) => {
    const getIcon = (icon) => {
      switch (icon) {
        case 'thermostat': return <Thermostat />;
        case 'water_drop': return <WaterDrop />;
        case 'opacity': return <Opacity />;
        case 'wb_sunny': return <WbSunny />;
        case 'science': return <Science />;
        case 'spa': return <Spa/>;
        case 'water_outlined': return <WaterOutlined/>
        case 'cloud': return <Cloud/>
        default: return null;
      }
    };

    return (
      <Card sx={{ borderRadius: 3}}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="h4">{value}</Typography>
            </Box>
            <Box>{getIcon(icon)}</Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  // Farm map component
  const FarmMap = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Farm Map
        </Typography>
        <Typography variant="body2">
          {/* Mockup for now, but later you can add an actual map */}
          Real-time map with sensor locations goes here.
        </Typography>
      </CardContent>
    </Card>
  );
  
  const OverallHealthChart = () => {
    const data = [
      { date: '2024-09-15', health: 85 },
      { date: '2024-09-16', health: 82 },
      { date: '2024-09-17', health: 88 },
      { date: '2024-09-18', health: 90 },
      { date: '2024-09-19', health: 87 },
      { date: '2024-09-20', health: 91 },
    ];

    return (
      <Card sx={{ height: '300px' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Overall Health Trend
          </Typography>
          <Box sx={{ height: 220, width: '100%' }}>
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="health" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    );
  };


  return (
    <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar - 3 columns wide */}
      <Grid item xs={1} sm={1.5}>
        <Sidebar />
      </Grid>
      
      {/* Main content - 9 columns wide */}
      <Grid item xs={12} sm={10.5}>
        <Box sx={{ p: 3, backgroundColor:'#eff2fa', minHeight: '100vh'}}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Smart Farming Dashboard
            </Typography>
            <Typography variant="subtitle1">
              {new Date().toLocaleString()}
            </Typography>
          </Box>

          {/* Data Cards */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <SensorCard title="Temperature" value="25°C" icon="thermostat" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SensorCard title="Humidity" value="65%" icon="water_drop" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SensorCard title="Soil Moisture" value="45%" icon="opacity" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SensorCard title="Light Intensity" value="300 lx" icon="wb_sunny" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SensorCard title="pH Level" value="6.8" icon="science" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <SensorCard title="Crop Health" value="Good" icon="spa" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SensorCard title="Irrigation Status" value="Active" icon="water_outlined" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SensorCard title="Weather Forecast" value="Sunny" icon="cloud" />
          </Grid>
          </Grid>
          {/* Map */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6}>
          <OverallHealthChart />
          </Grid>
          <Grid item xs={12} md={6}>
          <FarmMap />
          </Grid>
        </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default App;