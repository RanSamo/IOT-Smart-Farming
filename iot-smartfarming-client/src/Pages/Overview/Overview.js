import {React,useState, useEffect} from 'react';
import { Grid, Card, CardContent, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Divider, Tooltip, Paper } from '@mui/material';
import { Dashboard, Sensors, Thermostat, WaterDrop, Opacity, WbSunny, Science, Spa, WaterOutlined, Cloud } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { styled } from '@mui/system';
import SensorCard from './components/SensorCard'
import FarmMap from './components/FarmMap'
import OverallHealthChart from './components/OverallHealthChart'


  const Overview = () =>{

    const [sensorData, setSensorData] = useState({
      temperature: null,
      humidity: null,
      soilMoisture: null,
      lightIntensity: null,
      pHLevel: null,
      cropHealth: null,
      irrigationStatus: null,
      weatherForecast: null,
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/getLastData');
          const data = await response.json();
          setSensorData({
            temperature: data.temperature,
            humidity: data.humidity,
            soilMoisture: data.soilMoisture,
            lightIntensity: data.lightIntensity,
            pHLevel: data.phLevel,
            cropHealth: data.cropHealth,
            irrigationStatus: data.irrigationStatus,
            weatherForecast: data.weatherForecast,
          });
        } catch (error) {
          console.error('Error fetching sensor data:', error);
        }
      };
  
      fetchData();
    }, []);

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
                <SensorCard title="Temperature" value={`${sensorData.temperature}°C`} icon="thermostat" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SensorCard title="Humidity" value={`${sensorData.humidity}%`} icon="water_drop" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SensorCard title="Soil Moisture" value={`${sensorData.soilMoisture}%`} icon="opacity" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SensorCard title="Light Intensity" value={`${sensorData.lightIntensity} lx`} icon="wb_sunny" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SensorCard title="pH Level" value={sensorData.pHLevel} icon="science" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SensorCard title="Crop Health" value={sensorData.cropHealth} icon="spa" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SensorCard title="Irrigation Status" value={sensorData.irrigationStatus} icon="water_outlined" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <SensorCard title="Weather Forecast" value={sensorData.weatherForecast} icon="cloud" />
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