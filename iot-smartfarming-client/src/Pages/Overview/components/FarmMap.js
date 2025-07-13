import { React } from "react";
import { Typography, Tooltip } from "@mui/material";

const FarmMap = () => {
  const sensors = [
    { id: 1, x: "6%", y: "11%" },
    { id: 2, x: "28%", y: "24%" },
    { id: 3, x: "42%", y: "11%" },
    { id: 4, x: "63%", y: "24%" },
    { id: 5, x: "35%", y: "86%" },
    { id: 6, x: "56%", y: "61%" },
    { id: 7, x: "85%", y: "74%" },
  ];

  const getColor = (health) => {
    if (health >= 80) return "green";
    if (health >= 50) return "orange";
    return "red";
  };

  const sensorHealth = [90, 20, 88, 55, 55, 50, 80];

  return (
    <div
  style={{
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: "300px",
    maxHeight: "500px",
    aspectRatio: "7 / 4",
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
          backgroundSize: "7.14% 12.5%",
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
          width: "50%",
          height: "50%",
          backgroundColor: "rgba(144, 238, 144, 0.3)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "45%",
            left: "30%",
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
          left: "50%",
          width: "50%",
          height: "50%",
          backgroundColor: "rgba(255, 255, 0, 0.3)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "45%",
            left: "30%",
            color: "black",
          }}
        >
          Area B
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "28.5%",
          height: "50%",
          backgroundColor: "rgba(173, 216, 230, 0.3)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "15%",
            left: "30%",
            color: "black",
          }}
        >
          Offices
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "28.5%",
          width: "71.5%",
          height: "50%",
          backgroundColor: "rgba(255, 192, 203, 0.3)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "35%",
            color: "black",
          }}
        >
          Garden
        </span>
      </div>

      {/* Sensors */}
      {sensors.map((sensor, index) => (
        <Tooltip
          key={sensor.id}
          title={`Health: ${sensorHealth[index]}%`}
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
              width: "1.5%",
              height: "3%",
              backgroundColor: getColor(sensorHealth[index]),
              borderRadius: "50%",
              top: sensor.y,
              left: sensor.x,
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
        <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
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
        <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
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
            Unhealthy (&lt; 50%)
          </Typography>
        </div>
      </div>

      {/* Animation Keyframes */}
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