import { React} from "react";
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

const OverallHealthChart = ({healthData}) => {

  return (
    <Card sx={{ height: "484px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Overall Health Trend
        </Typography>
        <Box sx={{ height: "400px", width: "100%" }}>
          <ResponsiveContainer>
            <LineChart
              data={healthData}
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
