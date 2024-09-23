import {React,useState} from 'react';
import { Grid, Card, CardContent, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Divider, Tooltip, Paper } from '@mui/material';
import { Dashboard, Sensors, Thermostat, WaterDrop, Opacity, WbSunny, Science, Spa, WaterOutlined, Cloud } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { styled } from '@mui/system';

// Configuration for each sensor and its respective conditions
const sensorConditions = {
  thermostat: [
    { max: 25, color: '#d0f0c0' }, // Light green for < 25°C
    { min: 26, max: 40, color: '#ffa07a' }, // Light orange for 26°C - 40°C
    { min: 41, color: '#ffcccb' }, // Red for > 40°C
  ],
  water_drop: [
    { max: 30, color: '#cceeff' }, // Light blue for < 30% humidity
    { min: 31, max: 70, color: '#99dfff' }, // Blue for 31% - 70% humidity
    { min: 71, color: '#6699ff' }, // Dark blue for > 70% humidity
  ],
  opacity: [
    { max: 30, color: '#f4e1d2' }, // Light brown for < 30% soil moisture
    { min: 31, max: 60, color: '#ffcc99' }, // Orange for 31% - 60% soil moisture
    { min: 61, color: '#e68000' }, // Dark orange for > 60% soil moisture
  ],
  wb_sunny: [
    { max: 200, color: '#fffacd' }, // Light yellow for < 200 lx
    { min: 201, max: 500, color: '#ffe680' }, // Yellow for 201 lx - 500 lx
    { min: 501, color: '#ffd700' }, // Gold for > 500 lx
  ],
  science: [
    { max: 6, color: '#d4f1f9' }, // Light blue for pH < 6
    { min: 6.1, max: 7, color: '#a8dadc' }, // Blue-green for pH 6.1 - 7
    { min: 7.1, color: '#457b9d' }, // Dark blue for pH > 7
  ],
  spa: [
    { value: 'Good', color: '#90ee90' }, // Green for Good
    { value: 'Fair', color: '#ffff99' }, // Yellow for Fair
    { value: 'Poor', color: '#ffcccb' }, // Red for Poor
  ],
  water_outlined: [
    { value: 'Active', color: '#d0f0c0' }, // Light green for Active
    { value: 'Inactive', color: '#ffcccb' }, // Red for Inactive
  ],
  cloud: [
    { value: 'Sunny', color: '#ffe680' }, // Light yellow for Sunny
    { value: 'Cloudy', color: '#d3d3d3' }, // Light grey for Cloudy
    { value: 'Rainy', color: '#add8e6' }, // Light blue for Rainy
  ],
};

// Explanations for each sensor's color scheme
const sensorTooltips = {
  thermostat: "Green: <25°C, Orange: 26-40°C, Red: >40°C",
  water_drop: "Light blue: <30%, Blue: 31-70%, Dark blue: >70%",
  opacity: "Light brown: <30%, Orange: 31-60%, Dark orange: >60%",
  wb_sunny: "Light yellow: <200 lx, Yellow: 201-500 lx, Gold: >500 lx",
  science: "Light blue: pH < 6, Blue-green: pH 6.1 - 7, Dark blue: pH > 7",
  spa: "Green: Good, Yellow: Fair, Red: Poor",
  water_outlined: "Green: Active, Red: Inactive",
  cloud: "Light yellow: Sunny, Grey: Cloudy, Light blue: Rainy",
};

// Function to get the background color based on the sensor type and value
const getBackgroundColor = (icon, value) => {
  const numericValue = parseFloat(value); // Extract the numeric part from the value (handles decimals too)
  const conditions = sensorConditions[icon];

  // Iterate over conditions and return the matching background color
  if (conditions) {
    for (const condition of conditions) {
      const { min = -Infinity, max = Infinity, color, value: exactValue } = condition;
      if (exactValue) {
        if (value === exactValue) return color;
      } else if (numericValue >= min && numericValue <= max) {
        return color;
      }
    }
  }

  return '#fff'; // Default white background if no match is found
};

// Sidebar component
const Sidebar = () => (
  <Box sx={{ height: '100vh', padding: 2 }}>
    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mt: 5, mb: 5 }}>
      AGRO Data
    </Typography>
    <Divider sx={{ mb: 2 }} />
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
  const tooltipText = sensorTooltips[icon] || "No information available";

  return (
    <Tooltip title={tooltipText} arrow>
      <Card sx={{ borderRadius: 3, backgroundColor: getBackgroundColor(icon, value) }}>
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
    </Tooltip>
  );
};

// Function to return the correct icon
const getIcon = (icon) => {
  switch (icon) {
    case 'thermostat': return <Thermostat />;
    case 'water_drop': return <WaterDrop />;
    case 'opacity': return <Opacity />;
    case 'wb_sunny': return <WbSunny />;
    case 'science': return <Science />;
    case 'spa': return <Spa />;
    case 'water_outlined': return <WaterOutlined />;
    case 'cloud': return <Cloud />;
    default: return null;
  }
};



const FarmMap = () => {
  const sensors = [
    { id: 1, x: 45, y: 45, health: 90 },
    { id: 2, x: 195, y: 95, health: 20 },
    { id: 3, x: 295, y: 45, health: 88 },
    { id: 4, x: 445, y: 95, health: 55 },
    { id: 5, x: 245, y: 345, health: 55 },
    { id: 6, x: 395, y: 245, health: 50 },
    { id: 7, x: 595, y: 295, health: 80 },
  ];

  const getColor = (health) => {
    if (health >= 80) return 'green';  // Green for health 80%+
    if (health >= 50) return 'orange'; // Orange for health 50%+
    return 'red';                       // Red for health < 50%
  };

  return (
    <div style={{ position: 'relative', width: '700px', height: '400px', border: '1px solid black' }}>
      {/* Grid lines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundSize: '50px 50px',
          backgroundImage: 'linear-gradient(to right, gray 1px, transparent 1px), linear-gradient(to bottom, gray 1px, transparent 1px)',
        }}
      />

       {/* Areas */}
  <div style={{ position: 'absolute', top: 0, left: 0, width: '350px', height: '200px', backgroundColor: 'rgba(144, 238, 144, 0.3)' }}>
    <span style={{ position: 'absolute', top: '90px', left: '125px', color: 'black' }}>Area A</span>
  </div>
  <div style={{ position: 'absolute', top: 0, left: '350px', width: '350px', height: '200px', backgroundColor: 'rgba(255, 255, 0, 0.3)' }}>
    <span style={{ position: 'absolute', top: '90px', left: '125px', color: 'black' }}>Area B</span>
  </div>
  
  {/* Offices Area */}
  <div style={{ position: 'absolute', top: '200px', left: 0, width: '200px', height: '200px', backgroundColor: 'rgba(173, 216, 230, 0.3)' }}>
    <span style={{ position: 'absolute', top: '25px', left: '70px', color: 'black' }}>Offices</span>
  </div>
  
  {/* Garden Area */}
  <div style={{ position: 'absolute', top: '200px', left: '200px', width: '500px', height: '200px', backgroundColor: 'rgba(255, 192, 203, 0.3)' }}>
    <span style={{ position: 'absolute', top: '100px', left: '200px', color: 'black' }}>Garden</span>
  </div>

      {/* Sensors */}
      {sensors.map(sensor => (
        <Tooltip
          key={sensor.id}
          title={`Health: ${sensor.health}%`}
          arrow
          placement="top"
          sx={{
            '& .MuiTooltip-arrow': { color: '#fffacd' },
            '& .MuiTooltip-tooltip': {
              backgroundColor: '#ffd700',
              fontSize: '0.9rem',
              borderRadius: '8px',
              padding: '8px 12px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '10px',
              height: '10px',
              backgroundColor: getColor(sensor.health),
              borderRadius: '50%',
              top: `${sensor.y}px`,
              left: `${sensor.x}px`,
              cursor: 'default',
              animation: 'ripple 1.5s infinite',
            }}
          />
        </Tooltip>
      ))}

{/* Legend */}
<div style={{
  position: 'absolute',
  bottom: '10px',
  left: '10px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  padding: '10px',
  border: '1px solid gray',
  borderRadius: '4px',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
}}>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
    <div style={{
      width: '10px',
      height: '10px',
      backgroundColor: 'green',
      borderRadius: '50%',
      marginRight: '5px',
    }} />
    <Typography variant="body2" color="black">Healthy (80%+)</Typography>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
    <div style={{
      width: '10px',
      height: '10px',
      backgroundColor: 'orange',
      borderRadius: '50%',
      marginRight: '5px',
    }} />
    <Typography variant="body2" color="black">At Risk (50% - 79%)</Typography>
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{
      width: '10px',
      height: '10px',
      backgroundColor: 'red',
      borderRadius: '50%',
      marginRight: '5px',
    }} />
    <Typography variant="body2" color="black">Unhealthy (50%-)</Typography>
  </div>
</div>

      <style>
        {`
          @keyframes ripple {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.5);
              opacity: 0.5;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

const OverallHealthChart = () => {
  const data = [
    { date: '2024-09-15', health: 85, waterLevel: 70, temperature: 22 },
    { date: '2024-09-16', health: 82, waterLevel: 75, temperature: 23 },
    { date: '2024-09-17', health: 88, waterLevel: 80, temperature: 21 },
    { date: '2024-09-18', health: 90, waterLevel: 85, temperature: 24 },
    { date: '2024-09-19', health: 87, waterLevel: 90, temperature: 26 },
    { date: '2024-09-20', health: 91, waterLevel: 95, temperature: 25 },
  ];

  return (
    <Card sx={{ height: '484px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Overall Health Trend
        </Typography>
        <Box sx={{ height: '400px', width: '100%' }}>
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <RechartsTooltip />
              <Line type="monotone" dataKey="health" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="waterLevel" stroke="#82ca9d" />
              <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Typography variant="body2" color="text.secondary" align="right">
          * Health, Water Level, and Temperature over time
        </Typography>
      </CardContent>
    </Card>
  );
};





// Main app component
const App = () => (
  <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
    {/* Sidebar - 3 columns wide */}
    <Grid item xs={1} sm={1.5}>
      <Sidebar />
    </Grid>
    
    {/* Main content - 9 columns wide */}
    <Grid item xs={12} sm={10.5}>
      <Box sx={{ p: 3, backgroundColor: '#eff2fa', minHeight: '100vh' }}>
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
            <SensorCard title="Temperature" value="40°C" icon="thermostat" />
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

        {/* Map and Chart */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6}>
            <OverallHealthChart />
          </Grid>
          <Grid item xs={12} md={6}>
      <Card>
        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6" style={{ alignSelf: 'flex-start', marginBottom: '10px' }}>
            Farm Map
          </Typography>
          <div style={{ flexGrow: 1 }}>
            <FarmMap />
          </div>
        </CardContent>
      </Card>
    </Grid>
        </Grid>
      </Box>
    </Grid>
  </Grid>
);

export default App;
