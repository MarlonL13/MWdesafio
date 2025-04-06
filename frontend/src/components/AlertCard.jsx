import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Box, Typography, Button } from "@mui/material";

const AlertCard = ({ date, nome, read, id }) => {
  const { updateAlerta } = useContext(DataContext);

  const handleMarkAsRead = async (id) => {
    try {
      await updateAlerta(id);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "background.secondary",
          borderLeft: "8px solid",
          borderColor: read ? "transparent" : "color.highlight",
          padding: 1.5,
          marginY: 1.5,
          borderRadius: 0.5,
          transition: "all 0.3s ease-in-out", // Added transition for all properties
          "&:hover": {
            transform: read ? "none" : "translateX(5px)", // Optional hover effect
          }
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              variant="body2"
              sx={{ fontSize: "14px", color: "text.secondary" }}
            >
              {date}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              {nome}
            </Typography>
          </Box>

          {!read && (
            <Button
              onClick={() => handleMarkAsRead(id)}
              sx={{
                backgroundColor: "color.primary",
                color: "text.primary",
                border: "2px solid transparent",
                transition: "background-color 0.3s ease-in",
                "&:hover": {
                  backgroundColor: "color.selected",
                },
                padding: 1,
                marginTop: 1,
                borderRadius: "4px",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Marcar como lido
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AlertCard;
