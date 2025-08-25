import React from "react";
import { Box, Typography, Button, useTheme, keyframes } from "@mui/material";
import Snowfall from "react-snowfall";
import Confetti from "react-confetti";


const OfferSection = () => {
  const theme = useTheme();
  // Up-Down Animation
  const rotateInfinite = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

  return (
    <Box
      className="offer-section"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: { xs: 4, md: 10 },
        py: { xs: 8, md: 10 },
        fontFamily: theme.palette.typography.fontFamily,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top Left Animated Blur */}
      <Box
        sx={{
          borderRadius: "40px",
          position: "absolute",
          top: { xs: "-80px", md: "-150px" },
          left: { xs: "-80px", md: "-150px" },
          width: { xs: "200px", md: "400px" },
          height: { xs: "200px", md: "400px" },
          // background: theme.palette.primary.main,
          border: `10px solid ${theme.palette.primary.main}`,
          zIndex: 0,
          transform: "rotate(45deg)",
          // filter: "blur(100px)",
          opacity: 0.3,
          animation: `${rotateInfinite} 20s linear infinite`,
        }}
      />

      {/* Bottom Right Animated Blur */}
      <Box
        sx={{
          borderRadius: "40px",
          position: "absolute",
          bottom: { xs: "-80px", md: "-150px" },
          right: { xs: "-80px", md: "-150px" },
          width: { xs: "200px", md: "400px" },
          height: { xs: "200px", md: "400px" },
          // background: theme.palette.primary.main,  
          border: `10px solid ${theme.palette.primary.main}`,
          zIndex: 0,
          transform: "rotate(45deg)",
          // filter: "blur(100px)",
          opacity: 0.3,
          animation: `${rotateInfinite} 20s linear infinite`,
        }}
      />


      <Snowfall color={`${theme.palette.primary.main}`} snowflakeCount={100} />
      <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={150} />

      {/* Text Content */}
      <Box className="offer-text">
        <Typography
          variant="h4" fontWeight="bold" mb={4}
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.maindark,
            mb: 1,
            fontSize: { xs: "1rem", md: "1.125rem" },
            fontFamily: theme.palette.typography.fontFamily,
          }}
        >
          LIMITED OFFER
        </Typography>
        <Typography
          variant="h1"
          className="offer-text"
          sx={{ fontFamily: theme.palette.typography.fontFamily, fontWeight: 'bold', color: theme.palette.primary.main, fontSize: { xs: "3rem", md: "4rem" }, lineHeight: 1.1, mb: 2, }}
        >
          BUY 2 <br />
          GET 1 <br />
          FREE
        </Typography>
        <Typography
          sx={{
            mb: 2,
            color: "text.secondary",
            fontSize: { xs: "1rem", md: "1.125rem" },
            fontFamily: theme.palette.typography.fontFamily,
          }}
        >
          Don’t miss out on this exclusive deal! Shop your favorites and get more for less.
        </Typography>
        <Button
          className="shop-now-btn"
          variant="contained"
          sx={{
            mt: 2,
            px: 4,
            py: 1.5,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.backgroundcolor.main,
            borderRadius: "999px",
            fontWeight: 600,
            fontSize: { xs: "1rem", md: "1.125rem" },
            textTransform: "none",
            fontFamily: theme.palette.typography.fontFamily,
            transition: "background 0.2s",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.15)",
              color: theme.palette.primary.main,
            },
          }}
        >
          Shop Now
        </Button>
      </Box>
    </Box>
  );
};

export default OfferSection;