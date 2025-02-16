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

const WeatherIcon = ({ condition = "clouds", size = "medium", ...props }) => {
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
      case condition_lc.includes("clear sky"):
        return <SunIcon sx={{ ...getIconStyle(), color: "#fbbf24" }} />;
      case condition_lc.includes("few clouds"):
        return <LightCloudIcon sx={{ ...getIconStyle(), color: "#60a5fa" }} />;
      case condition_lc.includes("scattered clouds"):
      case condition_lc.includes("broken clouds"):
      case condition_lc.includes("overcast"):
        return <CloudIcon sx={{ ...getIconStyle(), color: "#6b7280" }} />;
      case condition_lc.includes("rain"):
      case condition_lc.includes("drizzle"):
        return <RainIcon sx={{ ...getIconStyle(), color: "#3b82f6" }} />;
      case condition_lc.includes("thunderstorm"):
        return <StormIcon sx={{ ...getIconStyle(), color: "#7c3aed" }} />;
      case condition_lc.includes("snow"):
        return <SnowIcon sx={{ ...getIconStyle(), color: "#e5e7eb" }} />;
      case condition_lc.includes("mist"):
      case condition_lc.includes("fog"):
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
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentWeatherIcon = currentWeather?.weatherConditions?.description;
  const nextFiveDaysForecast = weeklyForecast.slice(1, 6);

  console.log("nextFiveDaysForecast length:", nextFiveDaysForecast.length);
  console.log("nextFiveDaysForecast data:", nextFiveDaysForecast);

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
                message: "Please provide weather insights for my farm",
              },
              config
            ),
          ]);

        // console.log("Full insights response object:", JSON.stringify(insightsResponse.data, null, 2));
        // console.log("Response object keys:", Object.keys(insightsResponse.data));
        if (!isMounted) return;
        setCurrentWeather(currentResponse.data);
        setWeeklyForecast(forecastResponse.data);

        // Debug logs
        console.log("Raw insights response:", insightsResponse.data);

        if (insightsResponse.data) {
          if (Array.isArray(insightsResponse.data.insights)) {
            const processedInsights = {
              daily: insightsResponse.data.insights
                .filter(
                  (insight) =>
                    insight.toLowerCase().includes("current") ||
                    insight.toLowerCase().includes("today")
                )
                .map((message) => ({
                  message,
                  type: "general",
                  priority: "normal",
                })),
              weekly: insightsResponse.data.insights
                .filter(
                  (insight) =>
                    !insight.toLowerCase().includes("current") &&
                    !insight.toLowerCase().includes("today")
                )
                .map((message) => ({
                  message,
                  type: "general",
                  priority: "normal",
                })),
            };

            console.log("Processed insights:", processedInsights);
            setInsights(processedInsights);
          } else if (
            insightsResponse.data.daily ||
            insightsResponse.data.weekly
          ) {
            setInsights({
              daily: insightsResponse.data.daily || [],
              weekly: insightsResponse.data.weekly || [],
            });
          } else {
            console.warn("Unexpected insights format:", insightsResponse.data);
            setInsights({ daily: [], weekly: [] });
          }
        } else {
          console.warn("No insights data in response");
          setInsights({ daily: [], weekly: [] });
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

  const getIconForInsight = (insight) => {
    const lowerInsight = insight.toLowerCase();
    if (lowerInsight.includes("wind")) return WindIcon;
    if (
      lowerInsight.includes("rain") ||
      lowerInsight.includes("moisture") ||
      lowerInsight.includes("humidity")
    )
      return HumidityIcon;
    if (
      lowerInsight.includes("temperature") ||
      lowerInsight.includes("heat") ||
      lowerInsight.includes("warm")
    )
      return SunIcon;
    if (
      lowerInsight.includes("snow") ||
      lowerInsight.includes("frost") ||
      lowerInsight.includes("cold")
    )
      return SnowIcon;
    if (lowerInsight.includes("storm") || lowerInsight.includes("thunder"))
      return StormIcon;
    if (lowerInsight.includes("cloud")) return CloudIcon;
    return AlertIcon;
  };

  const InsightsDisplay = ({ insights }) => {
    return (
      <Grid item xs={12} sm={12}>
        <Box sx={{ p: 3, backgroundColor: "#eff2fa", minHeight: "100vh" }}>
          {/* Header - יוצג תמיד */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Weather
            </Typography>
            <Typography variant="subtitle1">
              {new Date().toLocaleString()}
            </Typography>
          </Box>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
                width: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
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
                      <Typography
                        sx={{
                          color: "#065f46",
                          fontSize: "1.1rem",
                          mb: 3,
                          fontWeight: 600,
                        }}
                      >
                        {new Date().toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Typography>
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
                          condition={currentWeatherIcon}
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
                                transition: "transform 0.2s",
                                "&:hover": {
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                                },
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
                      height: "330px",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: "#854d0e", mb: 3 }}
                      >
                        AI Insights
                      </Typography>

                      <Grid
                        container
                        spacing={3}
                        sx={{ height: "calc(100% - 60px)" }}
                      >
                        {(() => {
                          // Combine daily and weekly insights into a single array
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

                          // Filter out insights containing "weekly" or "daily" in their messages
                          const filteredInsights = allInsights.filter(
                            (insight) => {
                              const lowerMessage =
                                insight.message.toLowerCase();
                              return (
                                !lowerMessage.includes("weekly") &&
                                !lowerMessage.includes("daily")
                              );
                            }
                          );

                          // If no insights are available, show message
                          if (filteredInsights.length === 0) {
                            return (
                              <Grid item xs={12}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "200px",
                                    bgcolor: "rgba(255, 255, 255, 0.5)",
                                    borderRadius: "12px",
                                    p: 2,
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      color: "#854d0e",
                                      fontSize: "1.1rem",
                                      textAlign: "center",
                                    }}
                                  >
                                    No insights available at the moment.
                                  </Typography>
                                </Box>
                              </Grid>
                            );
                          }

                          // Take only the first 4 insights
                          const limitedInsights = filteredInsights.slice(0, 4);

                          return limitedInsights.map((insight, index) => {
                            const Icon = getIconForInsight(insight.message);
                            return (
                              <Grid
                                item
                                xs={12}
                                md={6}
                                key={`insight-${index}`}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "start",
                                    gap: 2,
                                    bgcolor:
                                      insight.priority === "high"
                                        ? "rgba(254, 226, 226, 0.5)"
                                        : "rgba(255, 255, 255, 0.5)",
                                    p: 2,
                                    borderRadius: "12px",
                                    height: "70px",
                                    transition: "all 0.2s ease-in-out",
                                    "&:hover": {
                                      transform: "translateY(-2px)",
                                      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                                    },
                                  }}
                                >
                                  <Icon
                                    sx={{
                                      color: "#854d0e",
                                      fontSize: "24px",
                                      backgroundColor:
                                        "rgba(255, 255, 255, 0.7)",
                                      padding: "8px",
                                      borderRadius: "50%",
                                      flexShrink: 0,
                                    }}
                                  />
                                  <Typography
                                    sx={{
                                      color: "#854d0e",
                                      flex: 1,
                                      overflow: "hidden",
                                      display: "-webkit-box",
                                      WebkitLineClamp: 4,
                                      WebkitBoxOrient: "vertical",
                                    }}
                                  >
                                    {insight.message.replace(/^\*\s*/, "")}
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
                                borderRadius: "12px",
                                transition: "transform 0.2s",
                                "&:hover": { transform: "translateY(-2px)" },
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "#334155",
                                  fontWeight: 600,
                                  mb: 1,
                                }}
                              >
                                {new Date(day.date).toLocaleDateString(
                                  "en-US",
                                  { weekday: "short" }
                                )}
                                ,{" "}
                                {new Date(day.date).toLocaleDateString(
                                  "en-US",
                                  { day: "2-digit", month: "2-digit" }
                                )}
                              </Typography>
                              <Box sx={{ my: 2 }}>
                                <WeatherIcon
                                  condition={day.description}
                                  size="medium"
                                  sx={{ color: "#334155" }}
                                />
                              </Box>
                              <Typography
                                sx={{ color: "#334155", fontWeight: 700 }}
                              >
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
          )}
        </Box>
      </Grid>
    );
  };

  return <InsightsDisplay insights={insights} />;
};

export default WeatherDashboard;
