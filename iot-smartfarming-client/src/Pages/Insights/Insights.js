import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Paper, IconButton } from "@mui/material";
import { Thermostat, ArrowBack, Agriculture,Timeline } from "@mui/icons-material";

const cardData = [
  { icon: <Thermostat sx={{ fontSize: "2rem", color: "#60a5fa" }} />, text: "Get insights based on today's data" },
  { icon: <Timeline sx={{ fontSize: "2rem", color: "#f87171" }} />, text: "Learn more about your farm based on all-time data" },
  { icon: <Agriculture sx={{ fontSize: "2rem", color: "#a78bfa" }} />, text: "Farming tips for your farm" },
];


const getAiInsights = async (message) => {
  try {
    const response = await fetch("/api/insights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message }),
    });
    if (!response.ok) throw new Error(`Failed to get insights: ${response.statusText}`);
    const data = await response.json();
    return data.message || "";
  } catch (error) {
    console.error("Error:", error.message);
    return "Error retrieving insights.";
  }
};

const formatText = (text) => {
  // Split text into lines
  const lines = text.split('\n');
  
  return lines.map((line, index) => {
    // Check for numbered points (e.g., "1.", "2.", etc.)
    const match = line.match(/^(\d+\.)\s*(.*)/);
    
    if (match) {
      // If it's a numbered point, return formatted version
      return (
        <Box key={index} sx={{ mb: 1 }}>
          <Typography variant="body1" component="div">
            <Box component="span" sx={{ fontWeight: 'bold' }}>
              {match[1]}
            </Box>{' '}
            {match[2]}
          </Typography>
        </Box>
      );
    }
    // If it's not a numbered point, return as is
    return (
      <Typography key={index} variant="body1" sx={{ mb: 1 }}>
        {line}
      </Typography>
    );
  });
};

const Insights = () => {
  const [showButtons, setShowButtons] = useState(true);
  const [aiResponse, setAiResponse] = useState("");
  const [typedText, setTypedText] = useState("");
  const [showBackButton, setShowBackButton] = useState(false);
  let aiText="";

  const handleButtonClick = async (buttonNumber) => {
    setShowButtons(false);
    setShowBackButton(true);
    const response = await fetch("/getLastData");
    const lastData = await response.json();
    console.log(lastData.lastData);
    const lastDataString = buttonNumber == 0 ? JSON.stringify(lastData.lastData) : buttonNumber == 1 ? JSON.stringify(lastData) : "";
    if(lastDataString == ""){
      aiText = await getAiInsights(`I have an outdoor farm, can you give me 3-4 points of general tips ?`);
    } else {
       aiText = await getAiInsights(`How can I improve my farm? provide the data in bullet points, keep it short , like 3-4 points. this is my data :  ${lastDataString}`);
    }
    setAiResponse(aiText);
  };

  const handleBackButtonClick = () => {
    setShowButtons(true);
    setShowBackButton(false);
    setAiResponse("");  // Clear the AI response when going back
  };

  useEffect(() => {
    if (aiResponse) {
      setTypedText("");
      let index = 0;
      const typingInterval = setInterval(() => {
        setTypedText(aiResponse.slice(0, index + 1));
        index++;
        if (index === aiResponse.length) clearInterval(typingInterval);
      }, 5);

      return () => clearInterval(typingInterval);
    }
  }, [aiResponse]);

  return (
    <Grid item xs={12} sm={12}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "108.5vh",
          backgroundColor: "#eff2fa",
        }}
      >
        {showBackButton && (
          <IconButton
            sx={{ position: "absolute", top: 20, left: 250 }}
            onClick={handleBackButtonClick}
          >
            <ArrowBack />
          </IconButton>
        )}

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Insights
          </Typography>
        </Box>

        {showButtons && (
          <Box sx={{ display: "flex", gap: 2 }}>
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
                onClick={()=> {handleButtonClick(index)}}
              >
                {card.icon}
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {card.text}
                </Typography>
              </Paper>
            ))}
          </Box>
        )}

        {!showButtons && aiResponse && (
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              borderRadius: "12px",
              maxWidth: "400px",
              marginTop: "20px",
              backgroundColor: "#fff",
            }}
          >
            {formatText(typedText)}
          </Paper>
        )}
      </Box>
    </Grid>
  );
};

export default Insights;
