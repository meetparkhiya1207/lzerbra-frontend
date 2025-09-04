import React, { useState, useEffect } from "react";
import { Box, Typography, Button, useTheme, keyframes, Container } from "@mui/material";
import Snowfall from "react-snowfall";
import Confetti from "react-confetti";

const OfferSection = () => {
  const theme = useTheme();

  // ✅ Set target to tomorrow at midnight (00:00:00)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const targetTime = tomorrow;

  const calculateTimeLeft = () => {
    const difference = +targetTime - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  // Background animation
  const rotateInfinite = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  `;

  return (
    <Box className="offer-section" sx={{ position: "relative", bgcolor: theme.palette.background.maindark, overflow: "hidden" }}>

      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: { xs: "center", md: "left" },
            px: { xs: 0, sm: 4, md: 10 },
            py: { xs: 8, md: 8 },
            fontFamily: theme.palette.typography.fontFamily,
            // overflow: "hidden",
          }}
        >
          {/* Background Animated Shapes */}
          {/* <Box
            sx={{
              borderRadius: "40px",
              position: "absolute",
              top: { xs: "-80px", md: "-150px" },
              left: { xs: "-80px", md: "-150px" },
              width: { xs: "200px", md: "400px" },
              height: { xs: "200px", md: "400px" },
              border: `10px solid ${theme.palette.primary.main}`,
              zIndex: 0,
              transform: "rotate(45deg)",
              opacity: 0.3,
              animation: `${rotateInfinite} 20s linear infinite`,
            }}
          />
          <Box
            sx={{
              borderRadius: "40px",
              position: "absolute",
              bottom: { xs: "-80px", md: "-150px" },
              right: { xs: "-80px", md: "-150px" },
              width: { xs: "200px", md: "400px" },
              height: { xs: "200px", md: "400px" },
              border: `10px solid ${theme.palette.primary.main}`,
              zIndex: 0,
              transform: "rotate(45deg)",
              opacity: 0.3,
              animation: `${rotateInfinite} 20s linear infinite`,
            }}
          /> */}

          {/* Effects */}
          <Snowfall color={`${theme.palette.primary.main}`} snowflakeCount={20} />
          <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={20} />

          {/* LEFT SIDE - Text Content */}
          <Box className="offer-text" sx={{ flex: 1, zIndex: 1, p: 2 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={4}
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.lightmain,
                mb: 1,
                fontSize: { xs: "1rem", md: "1.125rem" },
              }}
            >
              LIMITED OFFER
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                fontSize: { xs: "3rem", md: "4rem" },
                lineHeight: 1.1,
                fontFamily: theme.palette.typography.fontFamily,
                mb: 2,
              }}
            >
              BUY 2 GET 1 FREE
            </Typography>
            <Typography
              sx={{
                mb: 2,
                color: theme.palette.primary.lightmain,
                fontFamily: theme.palette.typography.fontFamily,
                fontSize: { xs: "1rem", md: "1.125rem" },
              }}
            >
              Don’t miss out on this exclusive deal! Shop your favorites today and get even more for less with unbeatable discounts and savings.
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.background.default,
                fontFamily: theme.palette.typography.fontFamily,
                borderRadius: "999px",
                fontWeight: 600,
                fontSize: { xs: "1rem", md: "1.125rem" },
                textTransform: "none",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.15)",
                  color: theme.palette.primary.main,
                },
              }}
            >
              Shop Now
            </Button>
          </Box>

          {/* RIGHT SIDE - Countdown */}
          <Box
            sx={{
              bgcolor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              boxShadow: 4,
              px: { xs: 2, sm: 5 },
              py: { xs: 2, sm: 3 },
              textAlign: "center",
              width: { xs: "100%", sm: "auto" },
              maxWidth: { xs: 300, sm: 400 },
              mt: { xs: 6, md: 0 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
                fontSize: { xs: "1rem", sm: "1.5rem" },
                color: theme.palette.primary.main,
                fontFamily: theme.palette.typography.fontFamily,
              }}
            >
              🎉🔥 Offer Ends In 🔥🎉
            </Typography>

            {/* Time Blocks */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 1.5, sm: 2 },
              }}
            >
              {["hours", "minutes", "seconds"].map((unit, index) => (
                <React.Fragment key={unit}>
                  <Box
                    sx={{
                      textAlign: "center",
                      minWidth: { xs: 60, sm: 80 },
                      px: { xs: 1, sm: 2 },
                      py: { xs: 1, sm: 1.5 },
                      borderRadius: "12px",
                      bgcolor: theme.palette.grey[100],
                      boxShadow: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "1.5rem", sm: "2rem" },
                        color: theme.palette.primary.main,
                        fontFamily: theme.typography.fontFamily,
                      }}
                    >
                      {timeLeft[unit] !== undefined
                        ? timeLeft[unit].toString().padStart(2, "0")
                        : "00"}
                    </Typography>
                    <Typography
                      sx={{
                        textTransform: "capitalize",
                        color: theme.palette.primary.main,
                        fontSize: { xs: "0.75rem", sm: "0.9rem" },
                        fontFamily: theme.typography.fontFamily,
                      }}
                    >
                      {unit}
                    </Typography>
                  </Box>

                  {/* Colon only between units (not after last one) */}
                  {index < 2 && (
                    <Typography
                      sx={{
                        fontSize: { xs: "1.5rem", sm: "2rem" },
                        fontWeight: "bold",
                        color: theme.palette.primary.main,
                        fontFamily: theme.typography.fontFamily,
                      }}
                    >
                      :
                    </Typography>
                  )}
                </React.Fragment>
              ))}
            </Box>

          </Box>
        </Box>
      </Container>
    </Box>

  );
};

export default OfferSection;
