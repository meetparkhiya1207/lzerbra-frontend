import React from "react";
import { Box, Typography, Avatar, useTheme, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CommonHeading from "../../comman/CommonHeading";

const testimonials = [
    {
        name: "Cotton",
        role: "Fashion Designer",
        img: "/images/CottonFabric.jpg",
    },
    {
        name: "Linen",
        img: "/images/LinenFabric.jpg",
    },
    {
        name: "Popcorn",
        img: "/images/PopcornFabric.jpg",
    },
    {
        name: "Corduroy",
        img: "/images/CorduroyFabric.jpg",
    },
    {
        name: "Plan Black Berry Cotton",
        img: "/images/PlanBlackBerryCottonFabric.jpg",
    },
];

const CategorySlider = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                pt: { xs: 4, md: 10 },
                pb: { xs: 0, md: 10 },
                background: theme.palette.primary.lightdark,
            }}
        >
            <Container maxWidth="xl">
                {/* Section Title */}
                {/* <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            fontFamily: theme.palette.typography.fontFamily,
            mb: { xs: 4, md: 6 },
          }}
        >
          Shop By Prints & Types
        </Typography> */}
                <CommonHeading
                    title="Fabric Types"
                    lineWidth={140}
                    align="center"
                />

                {/* Swiper Slider */}
                <Swiper
                    spaceBetween={10}
                    slidesPerView={2.5} // 👈 Smallest screen
                    loop={true}
                    // autoplay={{ delay: 3000 }}
                    modules={[Autoplay]}
                    breakpoints={{
                        480: { slidesPerView: 3.5 },
                        400: { slidesPerView: 3.5 },
                        580: { slidesPerView: 3 },
                        650: { slidesPerView: 3.5 },
                        900: { slidesPerView: 3.5 },    // tablets
                        1200: { slidesPerView: 4 },   // desktops
                    }}
                >
                    {testimonials.map((item, i) => (
                        <SwiperSlide key={i}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    p: 1,
                                }}
                            >
                                {/* Avatar */}
                                <Avatar
                                    src={item.img}
                                    alt={item.name}
                                    sx={{
                                        width: { xs: 120, sm: 180, md: 220, lg: 250 },
                                        height: { xs: 120, sm: 180, md: 220, lg: 250 },
                                        mb: 2,
                                        borderRadius: "50%",
                                        boxShadow: "0px 6px 16px rgba(0,0,0,0.1)",
                                    }}
                                />

                                {/* Name */}
                                <Typography
                                    variant="subtitle1"
                                    sx={{ color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily, fontSize: { xs: 16, sm: 22 } }}
                                >
                                    {item.name}
                                </Typography>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </Box>
    );
};

export default CategorySlider;
