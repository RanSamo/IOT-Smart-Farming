// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Tab,
//   Tabs,
//   Box,
//   Skeleton,
// } from '@mui/material';
// import {
//   WbSunny as SunIcon,
//   Cloud as CloudIcon,
//   WaterDrop as RainIcon,
//   Thunderstorm as StormIcon,
//   AcUnit as SnowIcon,
//   Air as WindIcon,
//   Opacity as HumidityIcon,
//   Warning as AlertIcon,
//   CloudQueue as LightCloudIcon,
//   Visibility as MistIcon,
// } from '@mui/icons-material';

// // Enhanced Weather Icon Component with better styling
// const WeatherIcon = ({ condition, size = 'medium', ...props }) => {
//   const iconSizes = {
//     small: 24,
//     medium: 40,
//     large: 64
//   };

//   const getIconStyle = (IconComponent) => ({
//     fontSize: iconSizes[size],
//     padding: size === 'large' ? '12px' : '8px',
//     borderRadius: '50%',
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
//     ...props.sx
//   });

//   const getIconByCondition = () => {
//     const condition_lc = (condition || '').toLowerCase();

//     switch (true) {
//       case /clear|sunny/.test(condition_lc):
//         return <SunIcon sx={{ ...getIconStyle(), color: '#fbbf24' }} />;
//       case /few clouds|scattered/.test(condition_lc):
//         return <LightCloudIcon sx={{ ...getIconStyle(), color: '#60a5fa' }} />;
//       case /broken|overcast/.test(condition_lc):
//         return <CloudIcon sx={{ ...getIconStyle(), color: '#6b7280' }} />;
//       case /rain|drizzle|shower/.test(condition_lc):
//         return <RainIcon sx={{ ...getIconStyle(), color: '#3b82f6' }} />;
//       case /thunderstorm|storm/.test(condition_lc):
//         return <StormIcon sx={{ ...getIconStyle(), color: '#7c3aed' }} />;
//       case /snow|sleet|hail/.test(condition_lc):
//         return <SnowIcon sx={{ ...getIconStyle(), color: '#9ca3af' }} />;
//       case /mist|fog|haze/.test(condition_lc):
//         return <MistIcon sx={{ ...getIconStyle(), color: '#9ca3af' }} />;
//       default:
//         return <CloudIcon sx={{ ...getIconStyle(), color: '#60a5fa' }} />;
//     }
//   };

//   return getIconByCondition();
// };

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
//         const token = localStorage.getItem('token');
//         const config = {
//           headers: { Authorization: `Bearer ${token}` }
//         };

//         const [currentResponse, forecastResponse] = await Promise.all([
//           axios.get(`/api/weather/current-weather/${farmId}`, config),
//           axios.get(`/api/weather/weeklyforecast/${farmId}`, config)
//         ]);

//         setCurrentWeather(currentResponse.data);
//         setWeeklyForecast(forecastResponse.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err);
//         setLoading(false);
//       }
//     };

//     fetchWeatherData();
//   }, [farmId]);

//   // Weather metrics components
//   const WeatherMetric = ({ Icon, label, value }) => (
//     <Grid item xs={4}>
//       <Box sx={{
//         display: 'flex',
//         alignItems: 'center',
//         gap: 1,
//         bgcolor: 'rgba(255, 255, 255, 0.3)',
//         p: 1.5,
//         borderRadius: '12px'
//       }}>
//         <Icon sx={{
//           color: '#064e3b',
//           fontSize: '28px',
//           backgroundColor: 'rgba(255, 255, 255, 0.5)',
//           padding: '8px',
//           borderRadius: '50%',
//           boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
//         }} />
//         <Box>
//           <Typography sx={{
//             color: '#065f46',
//             fontSize: '0.875rem',
//             fontWeight: 500
//           }}>
//             {label}
//           </Typography>
//           <Typography sx={{
//             color: '#064e3b',
//             fontWeight: 600,
//             fontSize: '1.125rem'
//           }}>
//             {value}
//           </Typography>
//         </Box>
//       </Box>
//     </Grid>
//   );

//   if (loading) {
//     return (
//       <Container maxWidth="xl" sx={{ py: 3, bgcolor: '#f3f4f6' }}>
//         <Grid container spacing={3}>
//           {/* Current Conditions Loading State */}
//           <Grid item xs={12} md={6}>
//             <Card sx={{ bgcolor: '#d1fae5', borderRadius: '16px', height: '100%' }}>
//               <CardContent sx={{ p: 3 }}>
//                 <Skeleton variant="text" width="40%" height={40} />
//                 <Box sx={{ mt: 3 }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
//                     <Box>
//                       <Skeleton variant="text" width={120} height={80} />
//                       <Skeleton variant="text" width={160} height={24} />
//                     </Box>
//                     <Skeleton variant="circular" width={80} height={80} />
//                   </Box>
//                   <Grid container spacing={3}>
//                     {[1, 2, 3].map((item) => (
//                       <Grid item xs={4} key={item}>
//                         <Skeleton variant="rectangular" height={80} sx={{ borderRadius: '12px' }} />
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//         {/* AI Insights */}
//         <Grid item xs={12} md={6}>
//             <Card sx={{ bgcolor: '#fff7ed', borderRadius: '16px', height: '100%' }}>
//               <CardContent sx={{ p: 3 }}>
//                 <Skeleton variant="text" width="40%" height={40} />
//                 <Box sx={{ mt: 3 }}>
//                   <Skeleton variant="rectangular" height={80} sx={{ borderRadius: '12px', mb: 2 }} />
//                   <Skeleton variant="rectangular" height={80} sx={{ borderRadius: '12px' }} />
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//         {/* Weekly Forecast */}
//         <Grid item xs={12}>
//             <Card sx={{ bgcolor: 'white', borderRadius: '16px' }}>
//               <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 2 }}>
//                 <Skeleton variant="rectangular" width="30%" height={40} sx={{ mx: 'auto' }} />
//               </Box>
//               <Box sx={{ p: 3 }}>
//                 <Grid container spacing={2}>
//                   {[1, 2, 3, 4, 5, 6, 7].map((item) => (
//                     <Grid item xs key={item}>
//                       <Skeleton variant="rectangular" height={150} sx={{ borderRadius: '12px' }} />
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Box>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>
//     );
//   }

//   if (error) {
//     return <Typography>Error fetching weather data</Typography>;
//   }

//   return (
//     <Container maxWidth="xl" sx={{ py: 3, bgcolor: '#f3f4f6' }}>
//       <Grid container spacing={3}>
//         {/* Current Conditions Card */}
//         <Grid item xs={12} md={6}>
//           <Card sx={{
//             bgcolor: '#d1fae5',
//             borderRadius: '16px',
//             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//             height: '100%'
//           }}>
//             <CardContent sx={{ p: 3 }}>
//               <Typography variant="h6" sx={{ fontWeight: 600, color: '#064e3b', mb: 3 }}>
//                 Current Conditions
//               </Typography>
//               {currentWeather && (
//                 <>
//                   <Box sx={{
//                     display: 'flex',
//                     alignItems: 'flex-start',
//                     justifyContent: 'space-between',
//                     mb: 3
//                   }}>
//                     <Box>
//                       <Typography variant="h2" sx={{ fontWeight: 700, color: '#064e3b', mb: 1 }}>
//                         {currentWeather?.temperature?.current?.toFixed(1)}°C
//                       </Typography>
//                       <Typography sx={{ color: '#065f46' }}>
//                         {currentWeather?.weatherConditions?.description}
//                       </Typography>
//                     </Box>
//                     <WeatherIcon
//                       condition={currentWeather?.weatherConditions?.main}
//                       size="large"
//                       sx={{ color: '#064e3b' }}
//                     />
//                   </Box>
//                   <Grid container spacing={3}>
//                     {[
//                       {
//                         Icon: HumidityIcon,
//                         label: "Humidity",
//                         value: `${currentWeather?.humidity?.percentage}%`
//                       },
//                       {
//                         Icon: WindIcon,
//                         label: "Wind",
//                         value: `${currentWeather?.wind?.speed} km/h`
//                       },
//                       {
//                         Icon: CloudIcon,
//                         label: "Clouds",
//                         value: `${currentWeather?.clouds?.coverage}%`
//                       }
//                     ].map(({ Icon, label, value }, index) => (
//                       <Grid item xs={4} key={index}>
//                         <Box sx={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: 1,
//                           bgcolor: 'rgba(255, 255, 255, 0.3)',
//                           p: 1.5,
//                           borderRadius: '12px'
//                         }}>
//                           <Icon sx={{
//                             color: '#064e3b',
//                             fontSize: '28px',
//                             backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                             padding: '8px',
//                             borderRadius: '50%',
//                             boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
//                           }} />
//                           <Box>
//                             <Typography sx={{
//                               color: '#065f46',
//                               fontSize: '0.875rem',
//                               fontWeight: 500
//                             }}>
//                               {label}
//                             </Typography>
//                             <Typography sx={{
//                               color: '#064e3b',
//                               fontWeight: 600,
//                               fontSize: '1.125rem'
//                             }}>
//                               {value || 'N/A'}
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

//         {/* AI Insights */}
//         <Grid item xs={12} md={6}>
//           <Card sx={{
//             bgcolor: '#fff7ed',
//             borderRadius: '16px',
//             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//             height: '100%'
//           }}>
//             <CardContent sx={{ p: 3 }}>
//               <Typography variant="h6" sx={{ fontWeight: 600, color: '#854d0e', mb: 3 }}>
//                 AI Insights
//               </Typography>
//               {[
//                 {
//                   Icon: AlertIcon,
//                   text: "Frost risk predicted for tomorrow morning. Consider protective measures for sensitive crops."
//                 },
//                 {
//                   Icon: HumidityIcon,
//                   text: "Ideal conditions for irrigation in the next 48 hours based on soil moisture and weather forecast."
//                 }
//               ].map(({ Icon, text }, index) => (
//                 <Box key={index} sx={{
//                   display: 'flex',
//                   alignItems: 'start',
//                   gap: 2,
//                   mb: 2,
//                   bgcolor: 'rgba(255, 255, 255, 0.5)',
//                   p: 2,
//                   borderRadius: '12px'
//                 }}>
//                   <Icon sx={{
//                     color: '#854d0e',
//                     fontSize: '24px',
//                     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//                     padding: '8px',
//                     borderRadius: '50%',
//                     boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
//                     marginTop: '4px'
//                   }} />
//                   <Typography sx={{ color: '#854d0e' }}>{text}</Typography>
//                 </Box>
//               ))}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Weekly Forecast */}
//         <Grid item xs={12}>
//           <Box sx={{ bgcolor: 'white', borderRadius: '16px', overflow: 'hidden' }}>
//             <Tabs
//               value={activeTab}
//               onChange={(e, newValue) => setActiveTab(newValue)}
//               centered
//               sx={{
//                 borderBottom: 1,
//                 borderColor: 'divider',
//                 '& .MuiTab-root': {
//                   color: '#64748b',
//                   '&.Mui-selected': {
//                     color: '#064e3b',
//                   },
//                 },
//                 '& .MuiTabs-indicator': {
//                   backgroundColor: '#86efac',
//                 },
//               }}
//             >
//               <Tab label="5-Day Forecast" />
//             </Tabs>

//             <Box sx={{ p: 3 }}>
//               <Grid container spacing={2}>
//                 {weeklyForecast.map((day, index) => (
//                   <Grid item xs key={index}>
//                     <Box sx={{
//                       textAlign: 'center',
//                       bgcolor: '#f8fafc',
//                       p: 2,
//                       borderRadius: '12px',
//                       transition: 'transform 0.2s',
//                       '&:hover': {
//                         transform: 'translateY(-2px)',
//                       }
//                     }}>
//                       <Typography sx={{ color: '#334155', fontWeight: 600, mb: 1 }}>
//                         {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
//                       </Typography>
//                       <Box sx={{ my: 2 }}>
//                         <WeatherIcon
//                           condition={day?.weatherConditions?.main}
//                           size="medium"
//                           sx={{ color: '#334155' }}
//                         />
//                       </Box>
//                       <Typography sx={{ color: '#334155', fontWeight: 700 }}>
//                         {day?.tempMax?.toFixed(1)}°C
//                       </Typography>
//                       <Typography sx={{ color: '#64748b' }}>
//                         {day?.tempMin?.toFixed(1)}°C
//                       </Typography>
//                     </Box>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default WeatherDashboard;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  CircularProgress,
} from "@mui/material";
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
  ReportProblem,
} from "@mui/icons-material";

const WeatherIcon = ({ condition, size = "medium", ...props }) => {
  const iconSizes = {
    small: 24,
    medium: 40,
    large: 64,
  };

  const getIconStyle = (IconComponent) => ({
    fontSize: iconSizes[size],
    padding: size === "large" ? "12px" : "8px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    ...props.sx,
  });

  const getIconByCondition = () => {
    const condition_lc = (condition || "").toLowerCase();

    switch (true) {
      case /clear|sunny/.test(condition_lc):
        return <SunIcon sx={{ ...getIconStyle(), color: "#fbbf24" }} />;
      case /few clouds|scattered/.test(condition_lc):
        return <LightCloudIcon sx={{ ...getIconStyle(), color: "#60a5fa" }} />;
      case /broken|overcast/.test(condition_lc):
        return <CloudIcon sx={{ ...getIconStyle(), color: "#6b7280" }} />;
      case /rain|drizzle|shower/.test(condition_lc):
        return <RainIcon sx={{ ...getIconStyle(), color: "#3b82f6" }} />;
      case /thunderstorm|storm/.test(condition_lc):
        return <StormIcon sx={{ ...getIconStyle(), color: "#7c3aed" }} />;
      case /snow|sleet|hail/.test(condition_lc):
        return <SnowIcon sx={{ ...getIconStyle(), color: "#9ca3af" }} />;
      case /mist|fog|haze/.test(condition_lc):
        return <MistIcon sx={{ ...getIconStyle(), color: "#9ca3af" }} />;
      default:
        return <CloudIcon sx={{ ...getIconStyle(), color: "#60a5fa" }} />;
    }
  };

  return getIconByCondition();
};

const WeatherAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: "rain",
      message: "Rain expected within 3 hours. Check reservoir levels.",
      icon: <LightCloudIcon sx={{ color: "#3b82f6", fontSize: "28px" }} />,
    },
    {
      id: 2,
      type: "heat",
      message:
        "Heat wave tomorrow. Ensure plants are protected from direct sun.",
      icon: <SunIcon sx={{ color: "#fbbf24", fontSize: "28px" }} />,
    },
    {
      id: 3,
      type: "general",
      message: "Check soil sensors in the northern part of the farm.",
      icon: <ReportProblem sx={{ color: "#ef4444", fontSize: "28px" }} />,
    },
  ];

  return (
    <Card
      sx={{
        bgcolor: "#fee2e2",
        borderRadius: "16px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#991b1b", mb: 3 }}
        >
          Weather Alerts
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {alerts.map((alert) => (
            <Box
              key={alert.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                bgcolor: "rgba(255, 255, 255, 0.5)",
                p: 2,
                borderRadius: "12px",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              {alert.icon}
              <Typography sx={{ color: "#991b1b", flex: 1 }}>
                {alert.message}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

const WeatherDashboard = () => {
  const { farmId } = useParams();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const [currentResponse, forecastResponse] = await Promise.all([
          axios.get(`/api/weather/current-weather/${farmId}`, config),
          axios.get(`/api/weather/weeklyforecast/${farmId}`, config),
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

  if (loading) {
    return (
      <Box
        sx={{
          bgcolor: "#eff2fa",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ bgcolor: "#eff2fa", minHeight: "100vh" }}>
        <Container maxWidth="xl">
          <Typography>Error fetching weather data</Typography>
        </Container>
      </Box>
    );
  }

  const nextFiveDaysForecast = weeklyForecast.slice(1, 6);

  return (
    <Box sx={{ bgcolor: "#eff2fa", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Grid container spacing={5}>
          {/* Current Conditions Card */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: "#d1fae5",
                borderRadius: "16px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#064e3b", mb: 3 }}
                >
                  Current Conditions
                </Typography>
                {currentWeather && (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        mb: 3,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h2"
                          sx={{ fontWeight: 700, color: "#064e3b", mb: 1 }}
                        >
                          {currentWeather?.temperature?.current?.toFixed(1)}°C
                        </Typography>
                        <Typography sx={{ color: "#065f46" }}>
                          {currentWeather?.weatherConditions?.description}
                        </Typography>
                      </Box>
                      <WeatherIcon
                        condition={currentWeather?.weatherConditions?.main}
                        size="large"
                        sx={{ color: "#064e3b" }}
                      />
                    </Box>
                    <Grid container spacing={3}>
                      {[
                        {
                          Icon: HumidityIcon,
                          label: "Humidity",
                          value: `${currentWeather?.humidity?.percentage}%`,
                        },
                        {
                          Icon: WindIcon,
                          label: "Wind",
                          value: `${currentWeather?.wind?.speed} km/h`,
                        },
                        {
                          Icon: CloudIcon,
                          label: "Clouds",
                          value: `${currentWeather?.clouds?.coverage}%`,
                        },
                      ].map(({ Icon, label, value }, index) => (
                        <Grid item xs={4} key={index}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              bgcolor: "rgba(255, 255, 255, 0.3)",
                              p: 1.5,
                              borderRadius: "12px",
                            }}
                          >
                            <Icon
                              sx={{
                                color: "#064e3b",
                                fontSize: "28px",
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                                padding: "8px",
                                borderRadius: "50%",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                              }}
                            />
                            <Box>
                              <Typography
                                sx={{
                                  color: "#065f46",
                                  fontSize: "0.875rem",
                                  fontWeight: 500,
                                }}
                              >
                                {label}
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#064e3b",
                                  fontWeight: 600,
                                  fontSize: "1.125rem",
                                }}
                              >
                                {value || "N/A"}
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

          {/* Weather Alerts */}
          <Grid item xs={12} md={6}>
            <WeatherAlerts />
          </Grid>

          {/* AI Insights */}
          <Grid item xs={12}>
            <Card
              sx={{
                bgcolor: "#fff7ed",
                borderRadius: "16px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                height: "100%",
                minHeight: "180px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#854d0e", mb: 3 }}
                >
                  AI Insights
                </Typography>
                <Grid container spacing={3}>
                  {[
                    {
                      Icon: AlertIcon,
                      text: "Frost risk predicted for tomorrow morning. Consider protective measures for sensitive crops.",
                    },
                    {
                      Icon: HumidityIcon,
                      text: "Ideal conditions for irrigation in the next 48 hours based on soil moisture and weather forecast.",
                    },
                    {
                      Icon: WindIcon,
                      text: "Strong winds expected this weekend. Plan outdoor activities accordingly.",
                    },
                  ].map(({ Icon, text }, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "start",
                          gap: 2,
                          height: "100%",
                          bgcolor: "rgba(255, 255, 255, 0.5)",
                          p: 0.5,
                          borderRadius: "12px",
                        }}
                      >
                        <Icon
                          sx={{
                            color: "#854d0e",
                            fontSize: "24px",
                            backgroundColor: "rgba(255, 255, 255, 0.7)",
                            padding: "8px",
                            borderRadius: "50%",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                            marginTop: "4px",
                          }}
                        />
                        <Typography sx={{ color: "#854d0e" }}>
                          {text}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* 5-Day Forecast */}
          <Grid item xs={12}>
            <Card
              sx={{
                bgcolor: "white",
                borderRadius: "16px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#334155", mb: 3 }}
                >
                  5-Day Forecast
                </Typography>
                <Grid container spacing={2}>
                  {nextFiveDaysForecast.map((day, index) => (
                    <Grid item xs key={index}>
                      <Box
                        sx={{
                          textAlign: "center",
                          bgcolor: "#f8fafc",
                          p: 2,
                          borderRadius: "12px",
                          transition: "transform 0.2s",
                          "&:hover": {
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <Typography
                          sx={{ color: "#334155", fontWeight: 600, mb: 1 }}
                        >
                          {new Date(day.date).toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </Typography>
                        <Box sx={{ my: 2 }}>
                          <WeatherIcon
                            condition={day?.weatherConditions?.main}
                            size="medium"
                            sx={{ color: "#334155" }}
                          />
                        </Box>
                        <Typography sx={{ color: "#334155", fontWeight: 700 }}>
                          {day?.tempMax?.toFixed(1)}°C
                        </Typography>
                        <Typography sx={{ color: "#64748b" }}>
                          {day?.tempMin?.toFixed(1)}°C
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WeatherDashboard;
