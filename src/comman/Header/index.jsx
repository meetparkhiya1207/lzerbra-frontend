import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useTheme,
    Badge,
    Container, // Import Container
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const menuItems = ["Home", "About", "Contact", "Shop", "Blog"];

export default function Header() {
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <AppBar
                position="static"
                elevation={0}
                sx={{ backgroundColor: theme.palette.backgroundcolor.main, color: "black", px: 0 }}
            >
                <Container maxWidth="xl">
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 0 }}>
                        {/* Left: Logo */}
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                                component="img"
                                src="images/LZEBRA_LOGO.png"
                                alt="Logo"
                                sx={{
                                    objectFit: "contain",
                                    height: { xs: "60px", md: "80px" },
                                    width: { xs: "100px", md: "150px" },
                                }}
                            />
                        </Box>

                        {/* Center: Menu Items (hidden on small screens) */}
                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                gap: 4,
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                fontSize: "14px",
                            }}
                        >
                            {menuItems.map((item, index) => (
                                <Typography
                                    key={index}
                                    variant="body2"
                                    sx={{
                                        cursor: "pointer",
                                        position: "relative",
                                        "&:hover": { color: theme.palette.primary.main },
                                        fontFamily: theme.palette.typography.fontFamily,
                                        fontWeight: "500",
                                        "&::after": {
                                            content: '""',
                                            display: "block",
                                            position: "absolute",
                                            left: 0,
                                            bottom: -2,
                                            width: 0,
                                            height: "2px",
                                            background: theme.palette.primary.main,
                                            transition: "width 0.3s",
                                        },
                                        "&:hover::after": {
                                            width: "100%",
                                        },
                                    }}
                                >
                                    {item}
                                </Typography>
                            ))}
                        </Box>

                        {/* Right: Icons + Mobile Menu */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <IconButton sx={{ color: theme.palette.primary.main }}>
                                <SearchIcon />
                            </IconButton>
                            <IconButton sx={{ color: theme.palette.primary.main }}>
                                <AccountCircleIcon />
                            </IconButton>
                            <Badge
                                badgeContent={2}
                                color="error"
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <IconButton sx={{ color: theme.palette.primary.main }}>
                                    <ShoppingBagOutlinedIcon />
                                </IconButton>
                            </Badge>
                            {/* Mobile Menu (hamburger) */}
                            <Box sx={{ display: { xs: "block", md: "none" } }}>
                                <IconButton onClick={() => setDrawerOpen(true)}>
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Drawer for Mobile */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box sx={{ width: 250 }} role="presentation">
                    <List>
                        {menuItems.map((text, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => setDrawerOpen(false)}>
                                    <ListItemText
                                        primary={text}
                                        primaryTypographyProps={{ fontWeight: "bold" }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );}