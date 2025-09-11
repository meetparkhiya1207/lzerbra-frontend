import React, { use, useState } from "react";
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
    Container,
    Menu,
    MenuItem,
    Popover,
    Divider,
    Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useAuth } from "../../context/AuthContext";
import UserMenu from "../UserMenu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete"
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Shop", path: "/shop" },
    { label: "Blog", path: "/blog" },
];

const likedProductsExample = [
    { id: 1, name: "Striped Line Cotton Fabric", price: 1200, discountprice: 900, image: "/images/Product1.jpg" },
    { id: 2, name: "Classic Plain Cotton Fabric", price: 1400, discountprice: 1000, image: "/images/Product2.jpg" },
    { id: 3, name: "Soft Touch Linen Fabric", price: 1800, discountprice: 1350, image: "/images/Product3.jpg" },
    { id: 4, name: "Elegant Pure Silk Fabric", price: 2490, discountprice: 2000, image: "/images/Product4.jpg" },
];

export default function Header() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [favProduct, setFavProduct] = useState(null);
    const [cartProductPopover, setCartProductPopover] = useState(null);
    // const [cartProduct, setCartProduct] = useState(null);
    const cartProduct = useSelector((state) => state.cart.cartItems);
    console.log("cartProductcartProduct",cartProduct);
    
    const likedProduct = useSelector((state) => state.liked.likedProducts);

    // Profile menu state
    const [anchorEl, setAnchorEl] = useState(null);
    const { isAuthenticated, user, logout } = useAuth();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setFavProduct(null);
        setCartProductPopover(null);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    // Hanndle Favorites Popover
    const handleFavClick = (event) => {
        setFavProduct(event.currentTarget);
    };

    const handleClose = () => {
        setFavProduct(null);
        setAnchorEl(null);
        setCartProductPopover(null);
    };

    // Hanndle Cart Popover
    const handleCartClick = (event) => {
        setCartProductPopover(event.currentTarget);
        setFavProduct(null);
        setAnchorEl(null);
    };

    const handleCartClose = () => {
        setCartProductPopover(null);
    };

    const open = Boolean(favProduct);
    const cartPopoverOpen = Boolean(cartProductPopover);
    const id = open ? "simple-popover" : undefined;

    return (
        <>
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    backgroundColor: theme.palette.backgroundcolor.main,
                    color: "black",
                    px: 0,
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar
                        sx={{ display: "flex", justifyContent: "space-between", px: 0 }}
                    >
                        {/* Left: Logo */}
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                                component="img"
                                src="/images/LZEBRA_LOGO.png"
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
                                    onClick={() => navigate(item.path)}
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
                                    {item?.label}
                                </Typography>
                            ))}
                        </Box>

                        {/* Right: Icons + Mobile Menu */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Badge
                                badgeContent={likedProduct?.length || 0}
                                color="error"
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                            >
                                <IconButton sx={{ color: theme.palette.primary.main }} onClick={handleFavClick} >
                                    <FavoriteBorderIcon />
                                </IconButton>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={favProduct}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    PaperProps={{
                                        sx: {
                                            width: { xs: 300, sm: 350 },
                                            p: 2,
                                            bgcolor: "background.paper",
                                            boxShadow: 3,
                                            borderRadius: 2,
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                        sx={{ fontFamily: theme.palette.typography.fontFamily }}
                                    >
                                        Liked Products
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />

                                    {likedProduct?.length > 0 ? (
                                        <>

                                            <Box
                                                sx={{
                                                    maxHeight: 210,
                                                    overflowY: "auto",
                                                    scrollbarWidth: "none",
                                                    "&::-webkit-scrollbar": {
                                                        display: "none",
                                                    },
                                                }}
                                            >
                                                {likedProduct?.map((product) => (
                                                    <>
                                                        <Box
                                                            key={product.id}
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: 1,
                                                                my: 1,
                                                            }}
                                                        >
                                                            {/* Product Image */}
                                                            <Box
                                                                component="img"
                                                                src={product.image}
                                                                alt={product.name}
                                                                sx={{ width: 60, height: 60, objectFit: "cover", borderRadius: 1 }}
                                                            />

                                                            {/* Product Details */}
                                                            <Box sx={{ flex: 1 }}>
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        fontFamily: theme.palette.typography.fontFamily,
                                                                        fontWeight: 500,
                                                                    }}
                                                                >
                                                                    {product.productname}
                                                                </Typography>
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        fontFamily: theme.palette.typography.fontFamily,
                                                                        fontWeight: 400,
                                                                        fontSize: 13,
                                                                    }}
                                                                >
                                                                    ₹{product.price} &nbsp; <del>₹{product.discountprice}</del>
                                                                </Typography>
                                                            </Box>

                                                            {/* Delete Icon */}
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => dispatch({ type: 'liked/removeLiked', payload: product.id })}
                                                                sx={{ color: "error.main" }}
                                                            >
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Box>
                                                        <Divider sx={{ my: 1 }} />
                                                    </>

                                                ))}
                                            </Box>
                                            <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    sx={{
                                                        fontFamily: theme.palette.typography.fontFamily,
                                                        backgroundColor: "#fff",
                                                        textTransform: "none",
                                                        fontWeight: "bold",
                                                        color: theme.palette.primary.main,
                                                    }}
                                                    onClick={() => console.log("View All clicked")}
                                                >
                                                    View All
                                                </Button>
                                            </Box>
                                        </>

                                    ) : (
                                        <Typography variant="body2" sx={{ textAlign: 'center', fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main, }}>No liked products</Typography>
                                    )}
                                </Popover>
                            </Badge>

                            {/* Profile Icon */}
                            <IconButton
                                sx={{ color: theme.palette.primary.main }}
                                onClick={handleMenuOpen}
                            >
                                <AccountCircleIcon />
                            </IconButton>

                            <UserMenu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                handleMenuClose={handleMenuClose}
                                isAuthenticated={isAuthenticated}
                                user={user}
                                logout={logout}
                            />

                            {/* Cart */}
                            <Badge
                                badgeContent={cartProduct?.length || 0}
                                color="error"
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                            >
                                <IconButton sx={{ color: theme.palette.primary.main }} onClick={handleCartClick}>
                                    <ShoppingBagOutlinedIcon />
                                </IconButton>
                                <Popover
                                    open={cartPopoverOpen}
                                    anchorEl={cartProductPopover}
                                    onClose={handleCartClose}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    PaperProps={{
                                        sx: {
                                            width: { xs: 300, sm: 350 },
                                            p: 2,
                                            bgcolor: "background.paper",
                                            boxShadow: 3,
                                            borderRadius: 2,
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                        sx={{ fontFamily: theme.palette.typography.fontFamily, color:theme.palette.primary.main }}
                                    >
                                        Cart Products
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />

                                    {cartProduct?.length > 0 ? (
                                        <>
                                            <Box
                                                sx={{
                                                    maxHeight: 210,
                                                    overflowY: "auto",
                                                    scrollbarWidth: "none",
                                                    "&::-webkit-scrollbar": { display: "none" },
                                                }}
                                            >
                                                {cartProduct?.map((product) => (
                                                    <Box key={product.id}>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "start",
                                                                gap: 1,
                                                                my: 1,
                                                            }}
                                                        >
                                                            {/* Product Image */}
                                                            <Box
                                                                component="img"
                                                                src={`${import.meta.env.VITE_BACKEND_API}/uploads/${product?.images[0]?.filename}`}
                                                                alt={product.productName}
                                                                sx={{ width: 60, height: 60, objectFit: "cover", borderRadius: 1 }}
                                                            />

                                                            {/* Product Details */}
                                                            <Box sx={{ flex: 1 }}>
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        fontFamily: theme.palette.typography.fontFamily,
                                                                        fontWeight: 500,
                                                                        mb: 1,
                                                                    }}
                                                                >
                                                                    {product?.productName}
                                                                </Typography>

                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        fontFamily: theme.palette.typography.fontFamily,
                                                                        fontWeight: 400,
                                                                        fontSize: 13,
                                                                    }}
                                                                >
                                                                    ₹{product.price} × {product.quantity}
                                                                </Typography>
                                                            </Box>

                                                            {/* Delete Icon */}
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => dispatch({ type: 'cart/removeFromCart', payload: product.id })}
                                                                sx={{ color: "error.main" }}
                                                            >
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Box>
                                                        <Divider sx={{ my: 1 }} />
                                                    </Box>
                                                ))}
                                            </Box>

                                            {/* View All Button */}
                                            <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    sx={{
                                                        fontFamily: theme.palette.typography.fontFamily,
                                                        backgroundColor: "#fff",
                                                        textTransform: "none",
                                                        fontWeight: "bold",
                                                        color: theme.palette.primary.main,
                                                    }}
                                                    onClick={() => {handleCartClose(); navigate("/cart")}}
                                                >
                                                    View All
                                                </Button>
                                            </Box>
                                        </>
                                    ) : (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                textAlign: 'center',
                                                fontFamily: theme.palette.typography.fontFamily,
                                                color: theme.palette.primary.main,
                                            }}
                                        >
                                            Cart Is Empty
                                        </Typography>
                                    )}


                                </Popover>
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
            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 250 }} role="presentation">
                    <List>
                        {menuItems.map((text, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => {navigate(text.path); setDrawerOpen(false)}}>
                                    <ListItemText
                                        primary={text?.label}
                                        primaryTypographyProps={{ fontWeight: "bold" }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
}
