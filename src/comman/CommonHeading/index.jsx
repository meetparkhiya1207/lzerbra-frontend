import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const CommonHeading = ({
    title,
    lineWidth,
    align = "center", // left, center, right
    color,
    mb = { xs: 4, md: 6 },
}) => {
    const theme = useTheme();

    return (
        <Box sx={{ textAlign: align, mb }}>
            {/* Title */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    color: color || theme.palette.primary.main,
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.2rem" },
                    fontFamily: theme.palette.typography.fontFamily,
                    lineHeight: 1.3,
                    mb: 2
                }}
            >
                {title}
            </Typography>
            <Box
                sx={{
                    width: lineWidth,
                    height: 3,
                    backgroundColor: theme.palette.primary.maindark,
                    mx: "auto",
                    borderRadius: 2,
                    mb: 5
                }}
            />
        </Box>
    );
};

export default CommonHeading;
