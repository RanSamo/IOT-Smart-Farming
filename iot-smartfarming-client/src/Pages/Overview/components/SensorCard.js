import { React } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import {
  Thermostat,
  WaterDrop,
  Opacity,
  WbSunny,
  Science,
  Spa,
  WaterOutlined,
  Cloud,
} from "@mui/icons-material";

// Function to get the background color and tooltip explanation based on value
const getBackgroundColor = (value) => {
  const numericValue = parseFloat(value);
  if (numericValue <= 30) {
    return { color: "#90ee90", explanation: "Green: Low value (<= 30)" };
  } else if (numericValue > 30 && numericValue <= 70) {
    return { color: "#ffcc80", explanation: "Orange: Medium value (31-70)" };
  } else {
    return { color: "#ff6f61", explanation: "Red: High value (> 70)" };
  }
};

// Function to return the correct icon
const getIcon = (icon) => {
  switch (icon) {
    case "thermostat":
      return <Thermostat style={{ fontSize: "1.5rem", color: "#555" }} />;
    case "water_drop":
      return <WaterDrop style={{ fontSize: "1.5rem", color: "#555" }} />;
    case "opacity":
      return <Opacity style={{ fontSize: "1.5rem", color: "#555" }} />;
    case "wb_sunny":
      return <WbSunny style={{ fontSize: "1.5rem", color: "#555" }} />;
    case "science":
      return <Science style={{ fontSize: "1.5rem", color: "#555" }} />;
    case "spa":
      return <Spa style={{ fontSize: "1.5rem", color: "#555" }} />;
    case "water_outlined":
      return <WaterOutlined style={{ fontSize: "1.5rem", color: "#555" }} />;
    case "cloud":
      return <Cloud style={{ fontSize: "1.5rem", color: "#555" }} />;
    default:
      return null;
  }
};

// Sensor card component with modern design
const SensorCard = ({ title, value, icon }) => {
  const { color, explanation } = getBackgroundColor(value);

  return (
    <Tooltip title={explanation} arrow>
      <Card
        sx={{
          borderRadius: 2,
          backgroundColor: color,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
          },
          minWidth: "200px",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: "#333", mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#000", mb: 2 }}>
              {value}
            </Typography>
            {getIcon(icon)}
          </Box>
        </CardContent>
      </Card>
    </Tooltip>
  );
};

export default SensorCard;
