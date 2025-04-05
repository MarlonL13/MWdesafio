import React from "react";
import { Box, Typography, Button } from "@mui/material";

const AlertCard = ({ date, nome, read }) => {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "background.secondary",
          borderLeft: "6px solid",
          borderColor: read ? "transparent" : "color.highlight",
          padding: 1.5,
          marginY: 1.5,
          borderRadius: 0.5,
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
              onClick={() => {}}
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
