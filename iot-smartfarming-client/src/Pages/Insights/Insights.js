import { React } from "react";
import { Grid, Typography, Box, Paper } from "@mui/material";
import { Thermostat, WaterDrop, Opacity } from "@mui/icons-material";

// Data array for 3 cards
const cardData = [
  {
    icon: <Thermostat sx={{ fontSize: '2rem', color: '#60a5fa' }} />,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    icon: <WaterDrop sx={{ fontSize: '2rem', color: '#f87171' }} />,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    icon: <Opacity sx={{ fontSize: '2rem', color: '#a78bfa' }} />,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const Insights = () => {
  return (
    <Grid item xs={12} sm={12}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Center vertically
          alignItems: "center",     // Center horizontally
          minHeight: "100vh",       // Full viewport height
          backgroundColor: "#eff2fa",
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Insights
          </Typography>
        </Box>

        {/* Card Layout */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Center cards horizontally
            gap: 3,
          }}
        >
          {cardData.map((card, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "200px",
                height: "160px",
                padding: 2,
                borderRadius: "12px",
                textAlign: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.12)",
                },
              }}
            >
              {card.icon}
              <Typography variant="body1" sx={{ mt: 2 }}>
                {card.text}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Grid>
  );
};

export default Insights;
