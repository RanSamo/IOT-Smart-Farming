import {React,useState} from 'react';
import { Grid, Card, CardContent, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Divider, Tooltip, Paper } from '@mui/material';
import { Dashboard, Sensors, Thermostat, WaterDrop, Opacity, WbSunny, Science, Spa, WaterOutlined, Cloud } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { styled } from '@mui/system';
import SensorCard from './components/SensorCard'
import FarmMap from './components/FarmMap'
import OverallHealthChart from './components/OverallHealthChart'


  const Overview = () =>{
    return (
    <Grid item xs={12} sm={12}>
      <Box sx={{ p: 3, backgroundColor: '#eff2fa', minHeight: '100vh' }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Overview
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
    );
  }

  export default Overview;