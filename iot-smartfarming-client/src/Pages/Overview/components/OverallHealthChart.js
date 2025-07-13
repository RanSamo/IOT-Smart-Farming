import { React } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

const OverallHealthChart = ({ healthData }) => {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Overall Health Trend
      </Typography>
      <Box sx={{ height: "85%", width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={healthData}
            margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <RechartsTooltip />
            <Line type="monotone" dataKey="health" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="waterLevel" stroke="#82ca9d" />
            <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Typography variant="body2" color="text.secondary" align="right" sx={{ mt: 1 }}>
        * Health, Water Level, and Temperature over time
      </Typography>
    </Box>
  );
};

export default OverallHealthChart;
