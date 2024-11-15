import {React,useState, useEffect} from 'react';
import { Grid, Card, CardContent, Typography, Box,CircularProgress } from '@mui/material';
import SensorCard from './components/SensorCard'
import FarmMap from './components/FarmMap'
import OverallHealthChart from './components/OverallHealthChart'


  const Overview = () =>{

    const [loading, setLoading] = useState(true); 
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
    const [healthTrendProcessed, setHealthTrendProcessed] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/getLastData'); // Adjust API endpoint as necessary
          const data = await response.json();
          
          // Update sensor data
          setSensorData({
            temperature: data.lastData.temperature,
            humidity: data.lastData.humidity,
            soilMoisture: data.lastData.soilMoisture,
            lightIntensity: data.lastData.lightIntensity,
            pHLevel: data.lastData.phLevel,
            cropHealth: data.lastData.cropHealth,
            irrigationStatus: data.lastData.irrigationStatus,
            weatherForecast: data.lastData.weatherForecast,
          });
    
          // Transform health trend data
          const transformedData = data.healthTrendData.map(item => ({
            date: item.date.split('T')[0], // Extract just the date part
            health: item.healthScore.toFixed(2),
            waterLevel: item.avgSoilMoisture.toFixed(2),
            temperature: item.avgTemperature.toFixed(2),
          }));
    
          // Update health trend data state
          setHealthTrendProcessed(transformedData);
    
          // Log transformed data to verify the transformation
          setLoading(false);
        } catch (error) {
          console.error('Error fetching sensor data:', error);
          setLoading(false);
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
  
          {/* Conditionally show spinner or data */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
              <CircularProgress /> {/* MUI Loading Spinner */}
            </Box>
          ) : (
            <>
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
                  <OverallHealthChart healthData={healthTrendProcessed} />
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
            </>
          )}
        </Box>
      </Grid>
    );
  };
  
  export default Overview;