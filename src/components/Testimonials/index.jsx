import React from "react";
import { Box, Typography, Avatar, useTheme, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FormatQuote } from "@mui/icons-material";

const testimonials = [
  {
    name: "Ravi Patel",
    role: "Fashion Designer",
    feedback:
      "The quality and style are beyond expectations. Truly unique designs that make me stand out!",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Neha Sharma",
    role: "Entrepreneur",
    feedback:
      "Amazing craftsmanship! Every piece feels premium and the experience was smooth & satisfying.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Amit Singh",
    role: "Model",
    feedback:
      "Absolutely love it! Modern yet classy—perfect balance. Highly recommended to everyone.",
    img: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    name: "Amit Singh",
    role: "Model",
    feedback:
      "Absolutely love it! Modern yet classy—perfect balance. Highly recommended to everyone.",
    img: "https://randomuser.me/api/portraits/men/52.jpg",
  },
];

export default function Testimonials() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: theme.palette.primary.lightdark,
      }}
    >
      <Container maxWidth="xl">
        {/* Section Title */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            mb: { xs: 4, md: 6 },
          }}
        >
          What Our Customers Say
        </Typography>

        {/* Swiper Slider */}
         <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000 }}
        // pagination={{ clickable: true }}
        // navigation={true} // 👈 Arrows enable
        sx={{color: theme.palette.primary.main}}
        modules={[Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1 },
          900: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
          {testimonials.map((item, i) => (
            <SwiperSlide key={i}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  bgcolor: "#fff",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  position: "relative",
                //   boxShadow: "0px 8px 20px rgba(0,0,0,0.08)",
                }}
              >
                {/* Decorative Quote Icon */}
                <FormatQuote
                  sx={{
                    fontSize: 50,
                    color: theme.palette.primary.main,
                    opacity: 0.15,
                    position: "absolute",
                    top: 20,
                    left: 20,
                  }}
                />

                {/* Avatar */}
                <Avatar
                  src={item.img}
                  alt={item.name}
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 2,
                    border: `3px solid ${theme.palette.primary.main}`,
                    zIndex: 1,
                  }}
                />

                {/* Feedback */}
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "italic",
                    color: theme.palette.text.secondary,
                    mb: 2,
                    px: 2,
                    zIndex: 1,
                    fontFamily: theme.palette.typography.fontFamily,
                  }}
                >
                  {item.feedback}
                </Typography>

                {/* Name & Role */}
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: theme.palette.primary.main , fontFamily: theme.palette.typography.fontFamily}}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.text.dark, fontFamily: theme.palette.typography.fontFamily }}
                >
                  {item.role}
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}
