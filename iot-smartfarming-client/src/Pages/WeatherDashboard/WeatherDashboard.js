// //version3
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Tab,
//   Tabs,
//   Box,
// } from "@mui/material";
// import {
//   Water as DropletsIcon,
//   Air as WindIcon,
//   WbSunny as SunIcon,
//   Warning as AlertTriangleIcon,
// } from "@mui/icons-material";
// import { Sun, Cloud, CloudDrizzle, CloudRain, CloudSnow } from "lucide-react";

// // Clean Weather Icon Component
// const WeatherIcon = ({ condition, size = 64 }) => {
//   const getWeatherIconContent = (cleanCondition) => {
//     switch (cleanCondition) {
//       case "clear":
//       case "clearsky":
//         return <Sun className="text-yellow-400 stroke-2" size={size} />;
      
//       case "partlycloudy":
//       case "scatteredclouds":
//         return <Cloud className="text-sky-400 stroke-2" size={size} />;
      
//       case "cloudy":
//       case "overcast":
//         return <Cloud className="text-gray-400 stroke-2" size={size} />;
      
//       case "rain":
//       case "lightrain":
//         return <CloudRain className="text-blue-500 stroke-2" size={size} />;
      
//       case "drizzle":
//         return <CloudDrizzle className="text-blue-400 stroke-2" size={size} />;
      
//       case "snow":
//         return <CloudSnow className="text-sky-300 stroke-2" size={size} />;
      
//       default:
//         return <Sun className="text-yellow-400 stroke-2" size={size} />;
//     }
//   };

//   const cleanCondition = condition?.toLowerCase().replace(/\s+/g, "");
//   return (
//     <div className="flex items-center justify-center">
//       {getWeatherIconContent(cleanCondition)}
//     </div>
//   );
// };

// // Main Weather Dashboard Component
// const WeatherDashboard = () => {
//   const { farmId } = useParams();
//   const [activeTab, setActiveTab] = useState(0);
//   const [currentWeather, setCurrentWeather] = useState(null);
//   const [weeklyForecast, setWeeklyForecast] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };
        
//         const currentResponse = await axios.get(
//           `/api/weather/current-weather/${farmId}`,
//           config
//         );
//         setCurrentWeather(currentResponse.data);

//         const forecastResponse = await axios.get(
//           `/api/weather/weeklyforecast/${farmId}`,
//           config
//         );
//         setWeeklyForecast(forecastResponse.data);

//         setLoading(false);
//       } catch (err) {
//         setError(err);
//         setLoading(false);
//       }
//     };

//     fetchWeatherData();
//   }, [farmId]);

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   if (loading) return (
//     <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
//       <Typography>Loading weather data...</Typography>
//     </Box>
//   );
  
//   if (error) return (
//     <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
//       <Typography color="error">Error fetching weather data</Typography>
//     </Box>
//   );

//   return (
//     <Container maxWidth="xl" sx={{ py: 3 }}>
//       <Grid container spacing={3}>
//         {/* Current Conditions Card */}
//         <Grid item xs={12} md={6}>
//           <Card sx={{ bgcolor: '#f0f9ff' }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ color: '#1e40af', mb: 2 }}>
//                 Current Conditions
//               </Typography>
//               {currentWeather && (
//                 <>
//                   <Box
//                     display="flex"
//                     alignItems="center"
//                     justifyContent="space-between"
//                     sx={{ mb: 3 }}
//                   >
//                     <Box>
//                       <Typography variant="h3" sx={{ color: '#1e40af', fontWeight: 'bold' }}>
//                         {currentWeather.temperature.current.toFixed(1)}°C
//                       </Typography>
//                       <Typography sx={{ color: '#64748b' }}>
//                         {currentWeather.weatherConditions.description}
//                       </Typography>
//                     </Box>
//                     <WeatherIcon 
//                       condition={currentWeather.weatherConditions.description} 
//                       size={80} 
//                     />
//                   </Box>
//                   <Grid container spacing={2}>
//                     {[
//                       {
//                         Icon: DropletsIcon,
//                         label: "Humidity",
//                         value: `${currentWeather.humidity.percentage}%`,
//                         color: "#3b82f6",
//                       },
//                       {
//                         Icon: WindIcon,
//                         label: "Wind",
//                         value: `${currentWeather.wind.speed} km/h`,
//                         color: "#64748b",
//                       },
//                       {
//                         Icon: SunIcon,
//                         label: "Clouds",
//                         value: `${currentWeather.clouds.coverage}%`,
//                         color: "#f59e0b",
//                       },
//                     ].map(({ Icon, label, value, color }, index) => (
//                       <Grid item xs={4} key={index}>
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 1,
//                             bgcolor: 'rgba(255, 255, 255, 0.5)',
//                             p: 1,
//                             borderRadius: 1,
//                           }}
//                         >
//                           <Icon sx={{ color }} />
//                           <Box>
//                             <Typography variant="body2" sx={{ color: '#64748b' }}>
//                               {label}
//                             </Typography>
//                             <Typography sx={{ color: '#1e40af' }}>
//                               {value}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </>
//               )}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* AI Insights Card */}
//         <Grid item xs={12} md={6}>
//           <Card sx={{ bgcolor: '#dbeafe' }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ color: '#1e40af', mb: 2 }}>
//                 AI Insights
//               </Typography>
//               {[
//                 {
//                   Icon: AlertTriangleIcon,
//                   color: "#f59e0b",
//                   text: "Frost risk predicted for tomorrow morning. Consider protective measures for sensitive crops.",
//                 },
//                 {
//                   Icon: DropletsIcon,
//                   color: "#3b82f6",
//                   text: "Ideal conditions for irrigation in the next 48 hours based on soil moisture and weather forecast.",
//                 },
//               ].map(({ Icon, color, text }, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     display: "flex",
//                     alignItems: "start",
//                     gap: 2,
//                     mb: 2,
//                     bgcolor: 'rgba(255, 255, 255, 0.5)',
//                     p: 2,
//                     borderRadius: 1,
//                   }}
//                 >
//                   <Icon sx={{ color, mt: 1 }} />
//                   <Typography sx={{ color: '#1e3a8a' }}>{text}</Typography>
//                 </Box>
//               ))}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Forecast Section */}
//         <Grid item xs={12}>
//           <Card sx={{ bgcolor: '#f8fafc' }}>
//             <CardContent>
//               <Tabs
//                 value={activeTab}
//                 onChange={handleTabChange}
//                 centered
//                 sx={{
//                   mb: 3,
//                   '& .MuiTab-root': {
//                     color: '#64748b',
//                     '&.Mui-selected': {
//                       color: '#1e40af',
//                     },
//                   },
//                 }}
//               >
//                 <Tab label="7-Day Forecast" />
//                 <Tab label="Soil Conditions" />
//                 <Tab label="Pest Risk Analysis" />
//               </Tabs>

//               {activeTab === 0 && (
//                 <Grid container spacing={2}>
//                   {weeklyForecast.map((day, index) => (
//                     <Grid item xs={12} sm={6} md key={index}>
//                       <Box
//                         sx={{
//                           display: 'flex',
//                           flexDirection: 'column',
//                           alignItems: 'center',
//                           bgcolor: 'rgba(241, 245, 249, 0.5)',
//                           p: 2,
//                           borderRadius: 2,
//                         }}
//                       >
//                         <Typography sx={{ color: '#64748b', mb: 1 }}>
//                           {new Date(day.date).toLocaleDateString("en-US", {
//                             weekday: "short",
//                           })}
//                         </Typography>
//                         <WeatherIcon condition={day.description} size={48} />
//                         <Typography variant="h6" sx={{ color: '#1e40af', mt: 1 }}>
//                           {day.tempMax.toFixed(1)}°C
//                         </Typography>
//                         <Typography variant="body2" sx={{ color: '#64748b' }}>
//                           {day.tempMin.toFixed(1)}°C
//                         </Typography>
//                       </Box>
//                     </Grid>
//                   ))}
//                 </Grid>
//               )}

//               {activeTab === 1 && (
//                 <Box sx={{ p: 2 }}>
//                   <Typography variant="body1" sx={{ color: '#64748b' }}>
//                     Soil conditions content will be displayed here
//                   </Typography>
//                 </Box>
//               )}

//               {activeTab === 2 && (
//                 <Box sx={{ p: 2 }}>
//                   <Typography variant="body1" sx={{ color: '#64748b' }}>
//                     Pest risk analysis content will be displayed here
//                   </Typography>
//                 </Box>
//               )}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default WeatherDashboard;








import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Tab,
  Tabs,
  Box,
  Skeleton,
} from '@mui/material';
import {
  WbSunny as SunIcon,
  Cloud as CloudIcon,
  WaterDrop as RainIcon,
  Thunderstorm as StormIcon,
  AcUnit as SnowIcon,
  Air as WindIcon,
  Opacity as HumidityIcon,
  Warning as AlertIcon,
  CloudQueue as LightCloudIcon,
  Visibility as MistIcon,
} from '@mui/icons-material';

// Enhanced Weather Icon Component with better styling
const WeatherIcon = ({ condition, size = 'medium', ...props }) => {
  const iconSizes = {
    small: 24,
    medium: 40,
    large: 64
  };

  const getIconStyle = (IconComponent) => ({
    fontSize: iconSizes[size],
    padding: size === 'large' ? '12px' : '8px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    ...props.sx
  });

  const getIconByCondition = () => {
    const condition_lc = (condition || '').toLowerCase();
    
    switch (true) {
      case /clear|sunny/.test(condition_lc):
        return <SunIcon sx={{ ...getIconStyle(), color: '#fbbf24' }} />;
      case /few clouds|scattered/.test(condition_lc):
        return <LightCloudIcon sx={{ ...getIconStyle(), color: '#60a5fa' }} />;
      case /broken|overcast/.test(condition_lc):
        return <CloudIcon sx={{ ...getIconStyle(), color: '#6b7280' }} />;
      case /rain|drizzle|shower/.test(condition_lc):
        return <RainIcon sx={{ ...getIconStyle(), color: '#3b82f6' }} />;
      case /thunderstorm|storm/.test(condition_lc):
        return <StormIcon sx={{ ...getIconStyle(), color: '#7c3aed' }} />;
      case /snow|sleet|hail/.test(condition_lc):
        return <SnowIcon sx={{ ...getIconStyle(), color: '#9ca3af' }} />;
      case /mist|fog|haze/.test(condition_lc):
        return <MistIcon sx={{ ...getIconStyle(), color: '#9ca3af' }} />;
      default:
        return <CloudIcon sx={{ ...getIconStyle(), color: '#60a5fa' }} />;
    }
  };

  return getIconByCondition();
};

const WeatherDashboard = () => {
  const { farmId } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const [currentResponse, forecastResponse] = await Promise.all([
          axios.get(`/api/weather/current-weather/${farmId}`, config),
          axios.get(`/api/weather/weeklyforecast/${farmId}`, config)
        ]);

        setCurrentWeather(currentResponse.data);
        setWeeklyForecast(forecastResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [farmId]);

  // Weather metrics components
  const WeatherMetric = ({ Icon, label, value }) => (
    <Grid item xs={4}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        bgcolor: 'rgba(255, 255, 255, 0.3)',
        p: 1.5,
        borderRadius: '12px'
      }}>
        <Icon sx={{
          color: '#064e3b',
          fontSize: '28px',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          padding: '8px',
          borderRadius: '50%',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }} />
        <Box>
          <Typography sx={{
            color: '#065f46',
            fontSize: '0.875rem',
            fontWeight: 500
          }}>
            {label}
          </Typography>
          <Typography sx={{
            color: '#064e3b',
            fontWeight: 600,
            fontSize: '1.125rem'
          }}>
            {value}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 3, bgcolor: '#f3f4f6' }}>
        <Grid container spacing={3}>
          {/* Current Conditions Loading State */}
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: '#d1fae5', borderRadius: '16px', height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Skeleton variant="text" width="40%" height={40} />
                <Box sx={{ mt: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Box>
                      <Skeleton variant="text" width={120} height={80} />
                      <Skeleton variant="text" width={160} height={24} />
                    </Box>
                    <Skeleton variant="circular" width={80} height={80} />
                  </Box>
                  <Grid container spacing={3}>
                    {[1, 2, 3].map((item) => (
                      <Grid item xs={4} key={item}>
                        <Skeleton variant="rectangular" height={80} sx={{ borderRadius: '12px' }} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>

        {/* AI Insights */}
        <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: '#fff7ed', borderRadius: '16px', height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Skeleton variant="text" width="40%" height={40} />
                <Box sx={{ mt: 3 }}>
                  <Skeleton variant="rectangular" height={80} sx={{ borderRadius: '12px', mb: 2 }} />
                  <Skeleton variant="rectangular" height={80} sx={{ borderRadius: '12px' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

        {/* Weekly Forecast */}
        <Grid item xs={12}>
            <Card sx={{ bgcolor: 'white', borderRadius: '16px' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 2 }}>
                <Skeleton variant="rectangular" width="30%" height={40} sx={{ mx: 'auto' }} />
              </Box>
              <Box sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                    <Grid item xs key={item}>
                      <Skeleton variant="rectangular" height={150} sx={{ borderRadius: '12px' }} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return <Typography>Error fetching weather data</Typography>;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3, bgcolor: '#f3f4f6' }}>
      <Grid container spacing={3}>
        {/* Current Conditions Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{
            bgcolor: '#d1fae5',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            height: '100%'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#064e3b', mb: 3 }}>
                Current Conditions
              </Typography>
              {currentWeather && (
                <>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    mb: 3
                  }}>
                    <Box>
                      <Typography variant="h2" sx={{ fontWeight: 700, color: '#064e3b', mb: 1 }}>
                        {currentWeather?.temperature?.current?.toFixed(1)}°C
                      </Typography>
                      <Typography sx={{ color: '#065f46' }}>
                        {currentWeather?.weatherConditions?.description}
                      </Typography>
                    </Box>
                    <WeatherIcon
                      condition={currentWeather?.weatherConditions?.main}
                      size="large"
                      sx={{ color: '#064e3b' }}
                    />
                  </Box>
                  <Grid container spacing={3}>
                    {[
                      {
                        Icon: HumidityIcon,
                        label: "Humidity",
                        value: `${currentWeather?.humidity?.percentage}%`
                      },
                      {
                        Icon: WindIcon,
                        label: "Wind",
                        value: `${currentWeather?.wind?.speed} km/h`
                      },
                      {
                        Icon: CloudIcon,
                        label: "Clouds",
                        value: `${currentWeather?.clouds?.coverage}%`
                      }
                    ].map(({ Icon, label, value }, index) => (
                      <Grid item xs={4} key={index}>
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          bgcolor: 'rgba(255, 255, 255, 0.3)',
                          p: 1.5,
                          borderRadius: '12px'
                        }}>
                          <Icon sx={{
                            color: '#064e3b',
                            fontSize: '28px',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            padding: '8px',
                            borderRadius: '50%',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                          }} />
                          <Box>
                            <Typography sx={{
                              color: '#065f46',
                              fontSize: '0.875rem',
                              fontWeight: 500
                            }}>
                              {label}
                            </Typography>
                            <Typography sx={{
                              color: '#064e3b',
                              fontWeight: 600,
                              fontSize: '1.125rem'
                            }}>
                              {value || 'N/A'}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* AI Insights */}
        <Grid item xs={12} md={6}>
          <Card sx={{
            bgcolor: '#fff7ed',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            height: '100%'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#854d0e', mb: 3 }}>
                AI Insights
              </Typography>
              {[
                {
                  Icon: AlertIcon,
                  text: "Frost risk predicted for tomorrow morning. Consider protective measures for sensitive crops."
                },
                {
                  Icon: HumidityIcon,
                  text: "Ideal conditions for irrigation in the next 48 hours based on soil moisture and weather forecast."
                }
              ].map(({ Icon, text }, index) => (
                <Box key={index} sx={{
                  display: 'flex',
                  alignItems: 'start',
                  gap: 2,
                  mb: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.5)',
                  p: 2,
                  borderRadius: '12px'
                }}>
                  <Icon sx={{
                    color: '#854d0e',
                    fontSize: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    padding: '8px',
                    borderRadius: '50%',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    marginTop: '4px'
                  }} />
                  <Typography sx={{ color: '#854d0e' }}>{text}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Weekly Forecast */}
        <Grid item xs={12}>
          <Box sx={{ bgcolor: 'white', borderRadius: '16px', overflow: 'hidden' }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              centered
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTab-root': {
                  color: '#64748b',
                  '&.Mui-selected': {
                    color: '#064e3b',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#86efac',
                },
              }}
            >
              <Tab label="7-Day Forecast" />
            </Tabs>

            <Box sx={{ p: 3 }}>
              <Grid container spacing={2}>
                {weeklyForecast.map((day, index) => (
                  <Grid item xs key={index}>
                    <Box sx={{
                      textAlign: 'center',
                      bgcolor: '#f8fafc',
                      p: 2,
                      borderRadius: '12px',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      }
                    }}>
                      <Typography sx={{ color: '#334155', fontWeight: 600, mb: 1 }}>
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </Typography>
                      <Box sx={{ my: 2 }}>
                        <WeatherIcon
                          condition={day?.weatherConditions?.main}
                          size="medium"
                          sx={{ color: '#334155' }}
                        />
                      </Box>
                      <Typography sx={{ color: '#334155', fontWeight: 700 }}>
                        {day?.tempMax?.toFixed(1)}°C
                      </Typography>
                      <Typography sx={{ color: '#64748b' }}>
                        {day?.tempMin?.toFixed(1)}°C
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WeatherDashboard;