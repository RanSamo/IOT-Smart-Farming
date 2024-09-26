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
  Button
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

const Insights = () => {
    return (
      <Grid item xs={12} sm={12}>
        <Box sx={{ p: 3, backgroundColor: "#eff2fa", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Insights
            </Typography>
          </Box>
  
          {/* Spacer for content */}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Button Area - Centered Vertically */}
            <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%", maxWidth: "600px" }}>
              <Button variant="contained" color="primary">
                Button 1
              </Button>
              <Button variant="contained" color="secondary">
                Button 2
              </Button>
              <Button variant="contained" color="success">
                Button 3
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    );
  };

export default Insights;
