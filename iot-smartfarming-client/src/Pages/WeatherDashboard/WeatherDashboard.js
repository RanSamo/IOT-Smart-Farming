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
  CloudQueue as LightCloudIcon,
  Visibility as MistIcon,
  ReportProblem,
} from "@mui/icons-material";

// Weather Icon Component (unchanged)
const WeatherIcon = ({ condition = "clouds", size = "medium", ...props }) => {
  const iconSizes = { small: 24, medium: 40, large: 64 };

  const getIconStyle = () => ({
    fontSize: iconSizes[size],
    padding: size === "large" ? "12px" : "8px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    ...props.sx,
  });

  const condition_lc = (condition || "").toLowerCase();

  if (condition_lc.includes("clear sky")) {
    return <SunIcon sx={{ ...getIconStyle(), color: "#fbbf24" }} />;
  } else if (condition_lc.includes("few clouds")) {
    return <LightCloudIcon sx={{ ...getIconStyle(), color: "#60a5fa" }} />;
  } else if (
    condition_lc.includes("scattered") ||
    condition_lc.includes("broken") ||
    condition_lc.includes("overcast")
  ) {
    return <CloudIcon sx={{ ...getIconStyle(), color: "#6b7280" }} />;
  } else if (
    condition_lc.includes("rain") ||
    condition_lc.includes("drizzle")
  ) {
    return <RainIcon sx={{ ...getIconStyle(), color: "#3b82f6" }} />;
  } else if (condition_lc.includes("thunderstorm")) {
    return <StormIcon sx={{ ...getIconStyle(), color: "#7c3aed" }} />;
  } else if (condition_lc.includes("snow")) {
    return <SnowIcon sx={{ ...getIconStyle(), color: "#e5e7eb" }} />;
  } else if (condition_lc.includes("mist") || condition_lc.includes("fog")) {
    return <MistIcon sx={{ ...getIconStyle(), color: "#9ca3af" }} />;
  } else {
    return <CloudIcon sx={{ ...getIconStyle(), color: "#60a5fa" }} />;
  }
};

// Weather Alerts Component with responsive sizing
const WeatherAlerts = (props) => {
  const alerts = [
    {
      id: 1,
      type: "rain",
      message:
        " Check reservoir levels for expected rainfall on February 20th and 22nd.",
      icon: <LightCloudIcon sx={{ color: "#3b82f6", fontSize: "16px" }} />,
    },
    {
      id: 2,
      type: "heat",
      message:
        "Heat wave tomorrow. Ensure plants are protected from direct sun.",
      icon: <SunIcon sx={{ color: "#fbbf24", fontSize: "16px" }} />,
    },
    {
      id: 3,
      type: "general",
      message: "Check soil sensors in the northern part of the farm.",
      icon: <ReportProblem sx={{ color: "#ef4444", fontSize: "16px" }} />,
    },
  ];

  return (
    <Card
      {...props}
      sx={{
        bgcolor: "#fee2e2",
        borderRadius: "16px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        height: "100%",
        minHeight: "280px",
        ...props.sx,
      }}
    >
      <CardContent sx={{ p: 2, height: "100%" }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: "#991b1b", mb: 2, fontSize: "1.25rem" }}
        >
          Weather Alerts
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {alerts.map((alert) => (
            <Box
              key={alert.id}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                bgcolor: "rgba(255,255,255,0.5)",
                p: 1.5,
                borderRadius: "12px",
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-2px)" },
                minHeight: "60px",
              }}
            >
              {alert.icon}
              <Typography 
                sx={{ 
                  color: "#991b1b", 
                  flex: 1, 
                  fontSize: "0.95rem",
                  lineHeight: 1.4,
                }}
              >
                {alert.message}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

// Helper for AI Insights icons (unchanged)
const getIconForInsight = (insight) => {
  const lower = insight?.toLowerCase() || "";
  if (lower.includes("wind")) return WindIcon;
  if (
    lower.includes("rain") ||
    lower.includes("moisture") ||
    lower.includes("humidity")
  )
    return HumidityIcon;
  if (
    lower.includes("temperature") ||
    lower.includes("heat") ||
    lower.includes("warm")
  )
    return SunIcon;
  if (
    lower.includes("snow") ||
    lower.includes("frost") ||
    lower.includes("cold")
  )
    return SnowIcon;
  if (lower.includes("storm") || lower.includes("thunder")) return StormIcon;
  if (lower.includes("cloud")) return CloudIcon;
  return ReportProblem;
};

// The main dashboard component
const WeatherDashboard = () => {
  const { farmId } = useParams();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [insights, setInsights] = useState({ daily: [], weekly: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentWeatherIcon = currentWeather?.weatherConditions?.description;
  const nextFiveDaysForecast = weeklyForecast.slice(1, 6);

  useEffect(() => {
    let isMounted = true;
    const fetchWeatherData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const [currentResponse, forecastResponse, insightsResponse] =
          await Promise.all([
            axios.get(`/api/weather/current-weather/${farmId}`, config),
            axios.get(`/api/weather/weeklyforecast/${farmId}`, config),
            axios.post(
              `/api/weather/weatherinsights/${farmId}`,
              {
                message:
                  "Please provide weather insights for my farm, in the exact structure you recieved.",
              },
              config
            ),
          ]);

        if (!isMounted) return;
        setCurrentWeather(currentResponse.data);
        setWeeklyForecast(forecastResponse.data);

        // Process insights response (convert insight strings to objects)
        if (insightsResponse.data) {
          if (Array.isArray(insightsResponse.data.insights)) {
            const insightsArray = insightsResponse.data.insights.map((msg) => ({
              message: msg,
            }));
            const daily = insightsArray.filter((insight) =>
              insight.message?.toLowerCase().includes("today")
            );
            const weekly = insightsArray.filter(
              (insight) => !insight.message?.toLowerCase().includes("today")
            );
            setInsights({ daily, weekly });
          } else {
            setInsights({
              daily: insightsResponse.data.daily || [],
              weekly: insightsResponse.data.weekly || [],
            });
          }
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchWeatherData();
    return () => {
      isMounted = false;
    };
  }, [farmId]);

  // The layout with proper responsive sizing
  const InsightsDisplay = () => {
    return (
      <Box
        sx={{
          minHeight: "100vh",
           maxHeight: "100vh", 
           overflowY: "auto",  
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#eff2fa",
           overflow: "auto",
        }}
      >
        {/* Header */}
        <Box
          sx={{ 
            paddingLeft: 3, 
            flexShrink: 0, 
            marginBottom: 2, 
            paddingTop: 3,
            minHeight: "100px",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Weather
          </Typography>
          <Typography variant="subtitle1">
            {new Date().toLocaleString()}
          </Typography>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, p: 3 }}>
          {loading ? (
            <Box
              sx={{
                height: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {/* Row 1: Current Conditions & Weather Alerts */}
              <Grid container item xs={12} spacing={3} sx={{ minHeight: "300px" }}>
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      height: "100%",
                      minHeight: "280px",
                      bgcolor: "#d1fae5",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                    }}
                  >
                    <CardContent sx={{ p: 3, height: "100%" }}>
                      <Grid
                        container
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Grid item xs={8}>
                          <Typography
                            variant="h5"
                            sx={{ fontWeight: 600, color: "#064e3b", mb: 1 }}
                          >
                            Current Conditions
                          </Typography>
                          <Typography
                            sx={{ color: "#065f46", fontSize: "1.0rem", mb: 2 }}
                          >
                            {new Date().toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: "right" }}>
                          <WeatherIcon
                            condition={currentWeatherIcon}
                            size="large"
                            sx={{ color: "#064e3b" }}
                          />
                        </Grid>
                      </Grid>
                      
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                          <Typography
                            variant="h3"
                            sx={{
                              fontWeight: 700,
                              color: "#064e3b",
                              fontSize: "1.8rem",
                            }}
                          >
                            {currentWeather?.temperature?.current?.toFixed(1)}°C
                          </Typography>
                          <Typography
                            sx={{ color: "#065f46", fontSize: "1.0rem" }}
                          >
                            {currentWeather?.weatherConditions?.description
                              .split(" ")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </Typography>
                        </Box>
                      </Box>

                      <Grid container spacing={2}>
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
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 1,
                                bgcolor: "rgba(255,255,255,0.3)",
                                p: 2,
                                borderRadius: "10px",
                                minHeight: "80px",
                              }}
                            >
                              <Icon
                                sx={{ color: "#064e3b", fontSize: "32px" }}
                              />
                              <Box sx={{ textAlign: "center" }}>
                                <Typography
                                  sx={{ fontSize: "0.85rem", color: "#065f46" }}
                                >
                                  {label}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "1rem",
                                    color: "#064e3b",
                                    fontWeight: 600,
                                  }}
                                >
                                  {value || "N/A"}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <WeatherAlerts />
                </Grid>
              </Grid>

              {/* Row 2: AI Insights */}
              <Grid item xs={12} sx={{ minHeight: "300px" }}>
                <Card
                  sx={{
                    height: "100%",
                    minHeight: "250px",
                    bgcolor: "#fff7ed",
                    borderRadius: "14px",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardContent sx={{ p: 3, height: "100%" }}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 600, color: "#854d0e", mb: 2 }}
                    >
                      AI Insights
                    </Typography>
                    <Grid container spacing={2}>
                      {(() => {
                        const allInsights = [
                          ...(insights?.daily || []).map((insight) => ({
                            ...insight,
                            type: "daily",
                          })),
                          ...(insights?.weekly || []).map((insight) => ({
                            ...insight,
                            type: "weekly",
                          })),
                        ];
                        const filteredInsights = allInsights.filter(
                          (insight) => {
                            const lowerMessage =
                              insight?.message?.toLowerCase() || "";
                            return (
                              !lowerMessage.includes("weekly") &&
                              !lowerMessage.includes("daily")
                            );
                          }
                        );
                        if (filteredInsights.length === 0) {
                          return (
                            <Grid item xs={12}>
                              <Box
                                sx={{
                                  height: "200px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  bgcolor: "rgba(255,255,255,0.5)",
                                  borderRadius: "8px",
                                  p: 2,
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: "#854d0e",
                                    fontSize: "1.0rem",
                                    textAlign: "center",
                                  }}
                                >
                                  No insights available at the moment.
                                </Typography>
                              </Box>
                            </Grid>
                          );
                        }
                        const limitedInsights = filteredInsights.slice(0, 4);
                        return limitedInsights.map((insight, index) => {
                          const Icon = getIconForInsight(insight?.message);
                          return (
                            <Grid item xs={12} md={6} key={`insight-${index}`}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: 1.2,
                                  bgcolor:
                                    insight?.priority === "high"
                                      ? "rgba(254,226,226,0.5)"
                                      : "rgba(255,255,255,0.5)",
                                  p: 2,
                                  borderRadius: "10px",
                                  minHeight: "100px",
                                }}
                              >
                                <Icon
                                  sx={{
                                    color: "#854d0e",
                                    fontSize: "24px",
                                    backgroundColor: "rgba(255,255,255,0.7)",
                                    p: 1,
                                    borderRadius: "50%",
                                    flexShrink: 0,
                                  }}
                                />
                                <Typography
                                  sx={{
                                    color: "#854d0e",
                                    fontSize: "1rem",
                                    lineHeight: 1.4,
                                  }}
                                >
                                  {insight?.message?.replace(/^\*\s*/, "")}
                                </Typography>
                              </Box>
                            </Grid>
                          );
                        });
                      })()}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Row 3: 5-Day Forecast */}
              <Grid item xs={12} sx={{ minHeight: "300px" }}>
                <Card
                  sx={{
                    height: "100%",
                    minHeight: "240px",
                    bgcolor: "white",
                    borderRadius: "14px",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardContent sx={{ p: 3, height: "100%" }}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 600, color: "#334155", mb: 2 }}
                    >
                      5 - Day Forecast
                    </Typography>
                    <Grid container spacing={2}>
                      {nextFiveDaysForecast.map((day, index) => (
                        <Grid item xs key={index}>
                          <Box
                            sx={{
                              textAlign: "center",
                              bgcolor: "#f8fafc",
                              p: 2,
                              borderRadius: "10px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: 1,
                              minHeight: "200px",
                            }}
                          >
                            <Typography
                              sx={{
                                color: "#334155",
                                fontWeight: 600,
                                fontSize: "1rem",
                              }}
                            >
                              {new Date(day?.date).toLocaleDateString("en-US", {
                                weekday: "short",
                              })}
                            </Typography>
                            <Typography
                              sx={{
                                color: "#64748b",
                                fontSize: "0.9rem",
                              }}
                            >
                              {new Date(day?.date).toLocaleDateString("en-US", {
                                day: "2-digit",
                                month: "2-digit",
                              })}
                            </Typography>
                            <Box sx={{ my: 1 }}>
                              <WeatherIcon
                                condition={day?.description}
                                size="large"
                                sx={{ color: "#334155" }}
                              />
                            </Box>
                            <Typography
                              sx={{
                                color: "#334155",
                                fontWeight: 700,
                                fontSize: "1.2rem",
                              }}
                            >
                              {day?.tempMax?.toFixed(1)}°C
                            </Typography>
                            <Typography
                              sx={{ color: "#64748b", fontSize: "1rem" }}
                            >
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
          )}
        </Box>
      </Box>
    );
  };

  return <InsightsDisplay />;
};

export default WeatherDashboard;