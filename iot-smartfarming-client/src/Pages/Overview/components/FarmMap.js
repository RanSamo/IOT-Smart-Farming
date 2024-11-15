import { React} from "react";
import {
  Typography,
  Tooltip,
} from "@mui/material";



const FarmMap = () => {
  const sensors = [
    { id: 1, x: 45, y: 45, health: 90 },
    { id: 2, x: 195, y: 95, health: 20 },
    { id: 3, x: 295, y: 45, health: 88 },
    { id: 4, x: 445, y: 95, health: 55 },
    { id: 5, x: 245, y: 345, health: 55 },
    { id: 6, x: 395, y: 245, health: 50 },
    { id: 7, x: 595, y: 295, health: 80 },
  ];

  const getColor = (health) => {
    if (health >= 80) return "green"; // Green for health 80%+
    if (health >= 50) return "orange"; // Orange for health 50%+
    return "red"; // Red for health < 50%
  };

  return (
    <div
      style={{
        position: "relative",
        width: "700px",
        height: "400px",
        border: "1px solid black",
      }}
    >
      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundSize: "50px 50px",
          backgroundImage:
            "linear-gradient(to right, gray 1px, transparent 1px), linear-gradient(to bottom, gray 1px, transparent 1px)",
        }}
      />

      {/* Areas */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "350px",
          height: "200px",
          backgroundColor: "rgba(144, 238, 144, 0.3)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "90px",
            left: "125px",
            color: "black",
          }}
        >
          Area A
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "350px",
          width: "350px",
          height: "200px",
          backgroundColor: "rgba(255, 255, 0, 0.3)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "90px",
            left: "125px",
            color: "black",
          }}
        >
          Area B
        </span>
      </div>

      {/* Offices Area */}
      <div
        style={{
          position: "absolute",
          top: "200px",
          left: 0,
          width: "200px",
          height: "200px",
          backgroundColor: "rgba(173, 216, 230, 0.3)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "25px",
            left: "70px",
            color: "black",
          }}
        >
          Offices
        </span>
      </div>

      {/* Garden Area */}
      <div
        style={{
          position: "absolute",
          top: "200px",
          left: "200px",
          width: "500px",
          height: "200px",
          backgroundColor: "rgba(255, 192, 203, 0.3)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "100px",
            left: "200px",
            color: "black",
          }}
        >
          Garden
        </span>
      </div>

      {/* Sensors */}
      {sensors.map((sensor) => (
        <Tooltip
          key={sensor.id}
          title={`Health: ${sensor.health}%`}
          arrow
          placement="top"
          sx={{
            "& .MuiTooltip-arrow": { color: "#fffacd" },
            "& .MuiTooltip-tooltip": {
              backgroundColor: "#ffd700",
              fontSize: "0.9rem",
              borderRadius: "8px",
              padding: "8px 12px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "10px",
              height: "10px",
              backgroundColor: getColor(sensor.health),
              borderRadius: "50%",
              top: `${sensor.y}px`,
              left: `${sensor.x}px`,
              cursor: "default",
              animation: "ripple 1.5s infinite",
            }}
          />
        </Tooltip>
      ))}

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          padding: "10px",
          border: "1px solid gray",
          borderRadius: "4px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "green",
              borderRadius: "50%",
              marginRight: "5px",
            }}
          />
          <Typography variant="body2" color="black">
            Healthy (80%+)
          </Typography>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "orange",
              borderRadius: "50%",
              marginRight: "5px",
            }}
          />
          <Typography variant="body2" color="black">
            At Risk (50% - 79%)
          </Typography>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "red",
              borderRadius: "50%",
              marginRight: "5px",
            }}
          />
          <Typography variant="body2" color="black">
            Unhealthy (50%-)
          </Typography>
        </div>
      </div>

      <style>
        {`
            @keyframes ripple {
              0% {
                transform: scale(1);
                opacity: 1;
              }
              50% {
                transform: scale(1.5);
                opacity: 0.5;
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}
      </style>
    </div>
  );
};

export default FarmMap;
