import { React, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Paper,
} from "@mui/material";
import {
  Dashboard,
  Sensors,
  Thermostat,
  WaterDrop,
  Opacity,
  WbSunny,
  Science,
  Spa,
  WaterOutlined,
  Cloud,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { styled } from "@mui/system";

const sensorConditions = {
  thermostat: [
    { max: 25, color: "#d0f0c0" }, // Light green for < 25°C
    { min: 26, max: 40, color: "#ffa07a" }, // Light orange for 26°C - 40°C
    { min: 41, color: "#ffcccb" }, // Red for > 40°C
  ],
  water_drop: [
    { max: 30, color: "#cceeff" }, // Light blue for < 30% humidity
    { min: 31, max: 70, color: "#99dfff" }, // Blue for 31% - 70% humidity
    { min: 71, color: "#6699ff" }, // Dark blue for > 70% humidity
  ],
  opacity: [
    { max: 30, color: "#f4e1d2" }, // Light brown for < 30% soil moisture
    { min: 31, max: 60, color: "#ffcc99" }, // Orange for 31% - 60% soil moisture
    { min: 61, color: "#e68000" }, // Dark orange for > 60% soil moisture
  ],
  wb_sunny: [
    { max: 200, color: "#fffacd" }, // Light yellow for < 200 lx
    { min: 201, max: 500, color: "#ffe680" }, // Yellow for 201 lx - 500 lx
    { min: 501, color: "#ffd700" }, // Gold for > 500 lx
  ],
  science: [
    { max: 6, color: "#d4f1f9" }, // Light blue for pH < 6
    { min: 6.1, max: 7, color: "#a8dadc" }, // Blue-green for pH 6.1 - 7
    { min: 7.1, color: "#457b9d" }, // Dark blue for pH > 7
  ],
  spa: [
    { value: "Good", color: "#90ee90" }, // Green for Good
    { value: "Fair", color: "#ffff99" }, // Yellow for Fair
    { value: "Poor", color: "#ffcccb" }, // Red for Poor
  ],
  water_outlined: [
    { value: "Active", color: "#d0f0c0" }, // Light green for Active
    { value: "Inactive", color: "#ffcccb" }, // Red for Inactive
  ],
  cloud: [
    { value: "Sunny", color: "#ffe680" }, // Light yellow for Sunny
    { value: "Cloudy", color: "#d3d3d3" }, // Light grey for Cloudy
    { value: "Rainy", color: "#add8e6" }, // Light blue for Rainy
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
      const {
        min = -Infinity,
        max = Infinity,
        color,
        value: exactValue,
      } = condition;
      if (exactValue) {
        if (value === exactValue) return color;
      } else if (numericValue >= min && numericValue <= max) {
        return color;
      }
    }
  }

  return "#fff"; // Default white background if no match is found
};

// Function to return the correct icon
const getIcon = (icon) => {
  switch (icon) {
    case "thermostat":
      return <Thermostat />;
    case "water_drop":
      return <WaterDrop />;
    case "opacity":
      return <Opacity />;
    case "wb_sunny":
      return <WbSunny />;
    case "science":
      return <Science />;
    case "spa":
      return <Spa />;
    case "water_outlined":
      return <WaterOutlined />;
    case "cloud":
      return <Cloud />;
    default:
      return null;
  }
};

// Sensor card component
const SensorCard = ({ title, value, icon }) => {
  const tooltipText = sensorTooltips[icon] || "No information available";

  return (
    <Tooltip title={tooltipText} arrow>
      <Card
        sx={{
          borderRadius: 3,
          backgroundColor: getBackgroundColor(icon, value),
        }}
      >
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
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

export default SensorCard;
