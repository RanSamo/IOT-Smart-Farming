import React, { useState } from "react";
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
  Grass as GrassIcon,
  Insects as InsectsIcon,
  Fungus as FungusIcon,
} from "@mui/icons-material";

const WeatherDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h3" fontWeight="bold">
                    24°C
                  </Typography>
                  <Typography color="textSecondary">Partly Cloudy</Typography>
                </Box>
                <CloudIcon sx={{ fontSize: 64, color: "primary.main" }} />
              </Box>
              <Grid container spacing={2} mt={2}>
                {[
                  {
                    Icon: DropletsIcon,
                    label: "Humidity",
                    value: "65%",
                    color: "primary.main",
                  },
                  {
                    Icon: WindIcon,
                    label: "Wind",
                    value: "12 km/h",
                    color: "primary.main",
                  },
                  {
                    Icon: SunIcon,
                    label: "UV Index",
                    value: "6 - High",
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
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day, index) => (
                      <Grid item xs key={index} textAlign="center">
                        <Typography>{day}</Typography>
                        <ThermometerIcon />
                        <Typography variant="body1">24°C</Typography>
                        <Typography variant="body2" color="textSecondary">
                          16°C
                        </Typography>
                      </Grid>
                    )
                  )}
                </Grid>
              </CardContent>
            </Card>
          )}

          {activeTab === 1 && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Current Soil Conditions
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Box p={2} border={1} borderRadius={1}>
                            <Typography variant="body2" color="textSecondary">
                              Moisture
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                              32%
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box p={2} border={1} borderRadius={1}>
                            <Typography variant="body2" color="textSecondary">
                              Temperature
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                              18°C
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        3-Day Forecast
                      </Typography>
                      <Box p={2} border={1} borderRadius={1}>
                        <Typography variant="body2" color="textSecondary">
                          Moisture Trend
                        </Typography>
                        <Typography variant="body1" color="success.main">
                          ↗ Increasing
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {activeTab === 2 && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Current Risk Levels
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Box p={2} border={1} borderRadius={1}>
                      <Typography variant="body2" color="textSecondary">
                        Fungal Disease Risk
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="warning.main"
                      >
                        Medium
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box p={2} border={1} borderRadius={1}>
                      <Typography variant="body2" color="textSecondary">
                        Insect Activity
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="success.main"
                      >
                        Low
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box p={2} border={1} borderRadius={1}>
                      <Typography variant="body2" color="textSecondary">
                        Weed Growth
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="error.main"
                      >
                        High
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default WeatherDashboard;

// import React, { useState } from 'react';
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Tab,
//   Tabs,
//   Box
// } from '@mui/material';
// import {
//   Cloud as CloudIcon,
//   Water as DropletsIcon,
//   Air as WindIcon,
//   WbSunny as SunIcon,
//   Warning as AlertTriangleIcon
// } from '@mui/icons-material';

// const WeatherDashboard = () => {
//   const [activeTab, setActiveTab] = useState(0);

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   return (
//     <Container maxWidth="xl" sx={{ py: 3 }}>
//       {/* Current Conditions */}
//       <Card>
//         <CardContent>
//           <Typography variant="h5" gutterBottom>Current Conditions</Typography>
//           <Box display="flex" alignItems="center" justifyContent="space-between">
//             <Box>
//               <Typography variant="h3" fontWeight="bold">24°C</Typography>
//               <Typography color="textSecondary">Partly Cloudy</Typography>
//             </Box>
//             <Box display="flex" alignItems="center" gap={2}>
//               <DropletsIcon color="primary" />
//               <Typography>65%</Typography>
//               <WindIcon color="primary" />
//               <Typography>12 km/h</Typography>
//               <SunIcon color="warning" />
//               <Typography>6 - High</Typography>
//             </Box>
//           </Box>
//         </CardContent>
//       </Card>

//       {/* AI Insights */}
//       <Card sx={{ mt: 2, background: 'linear-gradient(135deg, #e6f2ff 0%, #b3d9ff 100%)' }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom>AI Insights</Typography>
//           <Box display="flex" alignItems="start" gap={2}>
//             <AlertTriangleIcon color="warning" />
//             <Typography>Frost risk predicted for tomorrow morning. Consider protective measures for sensitive crops.</Typography>
//           </Box>
//           <Box display="flex" alignItems="start" gap={2} mt={2}>
//             <DropletsIcon color="primary" />
//             <Typography>Ideal conditions for irrigation in the next 48 hours based on soil moisture and weather forecast.</Typography>
//           </Box>
//         </CardContent>
//       </Card>

//       {/* Tabs */}
//       <Box mt={2}>
//         <Box display="flex" borderBottom={1} borderColor="divider">
//           {['7-Day Forecast', 'Soil Conditions', 'Pest Risk Analysis'].map((tab, index) => (
//             <Box
//               key={index}
//               px={4}
//               py={2}
//               borderBottom={2}
//               borderColor="transparent"
//               sx={{
//                 cursor: 'pointer',
//                 transition: 'border-color 0.3s',
//                 '&:hover': {
//                   borderColor: 'primary.main'
//                 }
//               }}
//             >
//               <Typography>{tab}</Typography>
//             </Box>
//           ))}
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default WeatherDashboard;
