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

const OverallHealthChart = () => {
  const data = [
    { date: "2024-09-15", health: 85, waterLevel: 70, temperature: 22 },
    { date: "2024-09-16", health: 82, waterLevel: 75, temperature: 23 },
    { date: "2024-09-17", health: 88, waterLevel: 80, temperature: 21 },
    { date: "2024-09-18", health: 90, waterLevel: 85, temperature: 24 },
    { date: "2024-09-19", health: 87, waterLevel: 90, temperature: 26 },
    { date: "2024-09-20", health: 91, waterLevel: 95, temperature: 25 },
  ];

  return (
    <Card sx={{ height: "484px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Overall Health Trend
        </Typography>
        <Box sx={{ height: "400px", width: "100%" }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <RechartsTooltip />
              <Line
                type="monotone"
                dataKey="health"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="waterLevel" stroke="#82ca9d" />
              <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Typography variant="body2" color="text.secondary" align="right">
          * Health, Water Level, and Temperature over time
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OverallHealthChart;
