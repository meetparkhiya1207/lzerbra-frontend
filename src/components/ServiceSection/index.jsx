import React from "react";
import { Box, Typography, Grid, Paper, Container } from "@mui/material";
import { LocalShipping, SupportAgent, CreditCard, Replay } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CommonHeading from "../../comman/CommonHeading";

const services = [
    {
        icon: <LocalShipping sx={{ fontSize: { xs: 90, sm: 90, md: 100 } }} />,
        title: "Free & Fast Delivery",
        desc: "Fast delivery right to your doorstep.",
    },
    {
        icon: <SupportAgent sx={{ fontSize: { xs: 90, sm: 90, md: 100 } }} />,
        title: "24/7 Customer Support",
        desc: "Always ready to assist you anytime.",
    },
    {
        icon: <CreditCard sx={{ fontSize: { xs: 90, sm: 90, md: 100 } }} />,
        title: "Secure Payment",
        desc: "Safe and secure payments every time.",
    },
    {
        icon: <Replay sx={{ fontSize: { xs: 90, sm: 90, md: 100 } }} />,
        title: "Easy Returns",
        desc: "Quick and easy returns without hassle.",
    },
];

export default function ServiceSection() {
    const theme = useTheme();

    return (
        <Box sx={{ background: "#e6dcd33d", }}>
            <Container maxWidth="xl">
                <Box sx={{ pb: 6, pt: 4 }}>
                    {/* <Typography
                    variant="h5"
                    align="center"
                    sx={{
                        mb: 2,
                        fontFamily: theme.palette.typography.fontFamily,
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                    }}
                >
                    Our Services
                </Typography>
                <Box
                    sx={{
                        width: 90,
                        height: 3,
                        backgroundColor: theme.palette.primary.maindark,
                        mx: "auto",
                        borderRadius: 2,
                        mb: 5
                    }}
                /> */}

                    <CommonHeading
                        title="Our Services"
                        lineWidth={140}
                        align="center"
                    />

                    {/* ✅ Add container */}
                    <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
                        {services.map((service, index) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={3}
                                key={index}
                            >
                                <Paper
                                    elevation={3}
                                    sx={{
                                        p: 3,
                                        backgroundColor: "transparent",
                                        textAlign: "center",
                                        borderRadius: "16px",
                                        boxShadow: "none",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-5px)",
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            color: theme.palette.primary.main,
                                            display: "flex",
                                            justifyContent: "center",
                                            mb: 2,
                                        }}
                                    >
                                        {service.icon}
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontFamily: theme.palette.typography.fontFamily,
                                            fontWeight: 600,
                                            mb: 1,
                                            fontSize: { xs: "1.5rem", md: "1.1rem", lg: "1.4rem" },
                                        }}
                                    >
                                        {service.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontFamily: theme.palette.typography.fontFamily,
                                            color: theme.palette.primary.lightmain,
                                            fontSize: { xs: "1rem", },
                                        }}
                                    >
                                        {service.desc}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>

    );
}
