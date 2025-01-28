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
//   Cloud as CloudIcon,
//   Water as DropletsIcon,
//   Thermostat as ThermometerIcon,
//   Air as WindIcon,
//   WbSunny as SunIcon,
//   Warning as AlertTriangleIcon,
// } from "@mui/icons-material";

// const WeatherDashboard = () => {
//   const { farmId } = useParams();
//   console.log("Farm ID:", farmId);
//   const [activeTab, setActiveTab] = useState(0);
//   const [currentWeather, setCurrentWeather] = useState(null);
//   const [weeklyForecast, setWeeklyForecast] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // router.get('/current-weather/:farmId', async (req, res) => {
//   //   let farmId = req.params.farmId.trim();

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };
//         // Fetch current weather
//         const currentResponse = await axios.get(
//           `/api/weather/current-weather/${farmId}`,
//           config
//         );
//         console.log("Weather data from backend:", currentResponse.data);
//         setCurrentWeather(currentResponse.data);

//         // Fetch weekly forecast
//         const forecastResponse = await axios.get(
//           `/api/weather/weeklyforecast/${farmId}`,
//           config
//         );
//         console.log("forecast Response from backend:", forecastResponse.data);
//         setWeeklyForecast(forecastResponse.data);

//         setLoading(false);
//         console.log("Weather data and forecast fetched successfully!");
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

//   if (loading) return <Typography>Loading...</Typography>;
//   if (error) return <Typography>Error fetching weather data</Typography>;

//   return (
//     <Container maxWidth="xl" sx={{ py: 3 }}>
//       <Grid container spacing={3}>
//         {/* Current Conditions */}
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Current Conditions
//               </Typography>
//               {currentWeather && (
//                 <Box
//                   display="flex"
//                   alignItems="center"
//                   justifyContent="space-between"
//                 >
//                   <Box>
//                     <Typography variant="h3" fontWeight="bold">
//                       {currentWeather.temperature.current.toFixed(1)}°C
//                     </Typography>
//                     <Typography color="textSecondary">
//                       {currentWeather.weatherConditions.description}
//                     </Typography>
//                   </Box>
//                   <img
//                     src={currentWeather.weatherConditions.icon}
//                     alt="Weather icon"
//                     style={{ width: 64, height: 64 }}
//                   />
//                 </Box>
//               )}
//               <Grid container spacing={2} mt={2}>
//                 {currentWeather &&
//                   [
//                     {
//                       Icon: DropletsIcon,
//                       label: "Humidity",
//                       value: `${currentWeather.humidity.percentage}%`,
//                       color: "primary.main",
//                     },
//                     {
//                       Icon: WindIcon,
//                       label: "Wind",
//                       value: `${currentWeather.wind.speed} km/h`,
//                       color: "primary.main",
//                     },
//                     {
//                       Icon: SunIcon,
//                       label: "Clouds",
//                       value: `${currentWeather.clouds.coverage}%`,
//                       color: "warning.main",
//                     },
//                   ].map(({ Icon, label, value, color }, index) => (
//                     <Grid item xs={4} key={index}>
//                       <Box display="flex" alignItems="center" gap={1}>
//                         <Icon sx={{ color }} />
//                         <Box>
//                           <Typography variant="body2" color="textSecondary">
//                             {label}
//                           </Typography>
//                           <Typography>{value}</Typography>
//                         </Box>
//                       </Box>
//                     </Grid>
//                   ))}
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* AI Insights */}
//         <Grid item xs={12} md={6}>
//           <Card
//             sx={{
//               background: "linear-gradient(135deg, #e6f2ff 0%, #b3d9ff 100%)",
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 AI Insights
//               </Typography>
//               {[
//                 {
//                   Icon: AlertTriangleIcon,
//                   color: "warning.main",
//                   text: "Frost risk predicted for tomorrow morning. Consider protective measures for sensitive crops.",
//                 },
//                 {
//                   Icon: DropletsIcon,
//                   color: "primary.main",
//                   text: "Ideal conditions for irrigation in the next 48 hours based on soil moisture and weather forecast.",
//                 },
//               ].map(({ Icon, color, text }, index) => (
//                 <Box
//                   key={index}
//                   display="flex"
//                   alignItems="start"
//                   gap={2}
//                   mb={2}
//                 >
//                   <Icon sx={{ color, mt: 1 }} />
//                   <Typography>{text}</Typography>
//                 </Box>
//               ))}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Tabs Section */}
//         <Grid item xs={12}>
//           <Tabs value={activeTab} onChange={handleTabChange} centered>
//             <Tab label="7-Day Forecast" />
//             <Tab label="Soil Conditions" />
//             <Tab label="Pest Risk Analysis" />
//           </Tabs>

//           {activeTab === 0 && (
//             <Card sx={{ mt: 2 }}>
//               <CardContent>
//                 <Grid container spacing={2}>
//                   {weeklyForecast.map((day, index) => (
//                     <Grid item xs key={index} textAlign="center">
//                       <Typography>
//                         {new Date(day.date).toLocaleDateString("en-US", {
//                           weekday: "short",
//                         })}
//                       </Typography>
//                       <img
//                         src={day.icon}
//                         alt="Forecast icon"
//                         style={{ width: 40, height: 40 }}
//                       />
//                       <Typography variant="body1">
//                         {day.tempMax.toFixed(1)}°C
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary">
//                         {day.tempMin.toFixed(1)}°C
//                       </Typography>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </CardContent>
//             </Card>
//           )}

//           {/* Existing Soil Conditions and Pest Risk Analysis tabs remain unchanged */}
//           {activeTab === 1 && (
//             <Card sx={{ mt: 2 }}>
//               <CardContent>
//                 {/* Existing Soil Conditions content */}
//               </CardContent>
//             </Card>
//           )}

//           {activeTab === 2 && (
//             <Card sx={{ mt: 2 }}>
//               <CardContent>
//                 {/* Existing Pest Risk Analysis content */}
//               </CardContent>
//             </Card>
//           )}
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default WeatherDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Tab,
  Tabs,
  Box,
} from "@mui/material";
import {
  Cloud as CloudIcon,
  Water as DropletsIcon,
  Thermostat as ThermometerIcon,
  Air as WindIcon,
  WbSunny as SunIcon,
  Warning as AlertTriangleIcon,
} from "@mui/icons-material";
import {
  Sun,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  Droplets,
  Wind,
} from "lucide-react";

const getWeatherIcon = (condition) => {
  const cleanCondition = condition?.toLowerCase().replace(/\s+/g, "");
  switch (cleanCondition) {
    case "clear":
    case "clearsky":
      return <Sun className="text-yellow-500" size={64} />;
    case "partlycloudy":
    case "scatteredclouds":
      return <Cloud className="text-gray-400" size={64} />;
    case "cloudy":
    case "overcast":
      return <Cloud className="text-gray-600" size={64} />;
    case "rain":
    case "lightrain":
      return <CloudRain className="text-blue-500" size={64} />;
    case "drizzle":
      return <CloudDrizzle className="text-blue-400" size={64} />;
    case "snow":
      return <CloudSnow className="text-blue-200" size={64} />;
    default:
      return <Sun className="text-yellow-500" size={64} />;
  }
};

const WeatherDashboard = () => {
  const { farmId } = useParams();
  console.log("Farm ID:", farmId);
  const [activeTab, setActiveTab] = useState(0);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // router.get('/current-weather/:farmId', async (req, res) => {
  //   let farmId = req.params.farmId.trim();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        // Fetch current weather
        const currentResponse = await axios.get(
          `/api/weather/current-weather/${farmId}`,
          config
        );
        console.log("Weather data from backend:", currentResponse.data);
        setCurrentWeather(currentResponse.data);

        // Fetch weekly forecast
        const forecastResponse = await axios.get(
          `/api/weather/weeklyforecast/${farmId}`,
          config
        );
        console.log("forecast Response from backend:", forecastResponse.data);
        setWeeklyForecast(forecastResponse.data);

        setLoading(false);
        console.log("Weather data and forecast fetched successfully!");
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [farmId]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching weather data</Typography>;

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Grid container spacing={3}>
        {/* Current Conditions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Conditions
              </Typography>
              {currentWeather && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="h3" fontWeight="bold">
                      {currentWeather.temperature.current.toFixed(1)}°C
                    </Typography>
                    <Typography color="textSecondary">
                      {currentWeather.weatherConditions.description}
                    </Typography>
                  </Box>
                  {getWeatherIcon(currentWeather.weatherConditions.description)}
                </Box>
              )}
              <Grid container spacing={2} mt={2}>
                {currentWeather &&
                  [
                    {
                      Icon: DropletsIcon,
                      label: "Humidity",
                      value: `${currentWeather.humidity.percentage}%`,
                      color: "primary.main",
                    },
                    {
                      Icon: WindIcon,
                      label: "Wind",
                      value: `${currentWeather.wind.speed} km/h`,
                      color: "primary.main",
                    },
                    {
                      Icon: SunIcon,
                      label: "Clouds",
                      value: `${currentWeather.clouds.coverage}%`,
                      color: "warning.main",
                    },
                  ].map(({ Icon, label, value, color }, index) => (
                    <Grid item xs={4} key={index}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Icon sx={{ color }} />
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            {label}
                          </Typography>
                          <Typography>{value}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* AI Insights */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #e6f2ff 0%, #b3d9ff 100%)",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                AI Insights
              </Typography>
              {[
                {
                  Icon: AlertTriangleIcon,
                  color: "warning.main",
                  text: "Frost risk predicted for tomorrow morning. Consider protective measures for sensitive crops.",
                },
                {
                  Icon: DropletsIcon,
                  color: "primary.main",
                  text: "Ideal conditions for irrigation in the next 48 hours based on soil moisture and weather forecast.",
                },
              ].map(({ Icon, color, text }, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="start"
                  gap={2}
                  mb={2}
                >
                  <Icon sx={{ color, mt: 1 }} />
                  <Typography>{text}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Tabs Section */}
        <Grid item xs={12}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="7-Day Forecast" />
            <Tab label="Soil Conditions" />
            <Tab label="Pest Risk Analysis" />
          </Tabs>

          {activeTab === 0 && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Grid container spacing={2}>
                  {weeklyForecast.map((day, index) => (
                    <Grid item xs key={index} textAlign="center">
                      <Typography>
                        {new Date(day.date).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </Typography>
                      {getWeatherIcon(day.description)}
                      <Typography variant="body1">
                        {day.tempMax.toFixed(1)}°C
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {day.tempMin.toFixed(1)}°C
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* Existing Soil Conditions and Pest Risk Analysis tabs remain unchanged */}
          {activeTab === 1 && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                {/* Existing Soil Conditions content */}
              </CardContent>
            </Card>
          )}

          {activeTab === 2 && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                {/* Existing Pest Risk Analysis content */}
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default WeatherDashboard;
