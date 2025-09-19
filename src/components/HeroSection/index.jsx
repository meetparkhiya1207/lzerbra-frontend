import React from "react";
import { Box, Typography, Button, Stack, useTheme, Container } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const sliderImages = [
  "/images/Slider1.jpg",
  "/images/Slider2.jpg",
  "/images/Slider1.jpg",
  "/images/Slider2.jpg",
];

const HeroSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  return (
    <Box
      sx={{
        width: "100%",
        py: 0,
        minHeight: { xs: "auto", sm: "80vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e6dcd33d",
        color: "white",
        // backgroundImage: "url('/images/Hero.jpg')",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        position: "relative",
        zIndex: 0
      }}
    >
      {/* Overlay */}
      {/* <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(70, 68, 68, 0.55)",
          zIndex: 1,
        }}
      /> */}

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={5}
          sx={{ width: "100%" }}
        >
          {/* Left Side - Text */}
          <Box sx={{ flex: 1, textAlign: { xs: "center", lg: "left" }, px: { xs: 0, lg: 4 } }} >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: { xs: "1.7rem", md: "3.5rem" },
                fontFamily: theme.palette.typography.fontFamily,
                color: theme.palette.primary.main
              }}
            >
              Premium Men’s Fabrics
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: { xs: "1.2rem", md: "2.5rem" },
                fontFamily: theme.palette.typography.fontFamily,
                color: theme.palette.primary.lightmain
              }}
            >
              New Arrival Collection 2025
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 2, sm: 4 },
                fontSize: { xs: "0.8rem", md: "1.2rem" },
                color: "#e0dcdc",
                maxWidth: "500px",
                fontFamily: theme.palette.typography.fontFamily,
                color: theme.palette.primary.lightmain
              }}
            >
              Discover our exclusive collection of fabrics crafted for men’s wear – from elegant suits to casual shirts. Tradition meets modern style.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 4,
                fontSize: { xs: "0.8rem" },
                color: "#e0dcdc",
                maxWidth: "500px",
                fontFamily: theme.palette.typography.fontFamily,
                color: theme.palette.primary.lightmain
              }}
            >
              Free shipping on orders above ₹999 | 100% Quality Guarantee
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
              onClick={() => { navigate("/shop") }}
            >
              Shop Now
            </Button>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              position: "relative",
              minHeight: { xs: "260px", md: "420px" },
              width: "100%",
              maxWidth: { xs: "100%", sm: "500px", md: "720px", lg: "620px" },
            }}
          >
            <Slider {...settings} style={{ width: "100%" }}>
              {sliderImages?.map((img, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={img}
                    alt={`slide-${idx}`}
                    sx={{
                      maxHeight: { xs: "260px", sm: "340px", md: "420px", lg: "520px" },
                      width: "100%",
                      borderRadius: "16px",
                      boxShadow: 4,
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Slider>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;