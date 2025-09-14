import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { addToCart, updateQuantity, removeFromCart, closeDrawer } from "@/redux/cartSlice";
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Button,
    Badge,
    Divider,
    List,
    ListItem,
    Card,
    CardMedia,
    CardContent,
    useTheme,
} from "@mui/material";
import { ShoppingCart, Close, Add, Remove, Delete } from "@mui/icons-material";
import { closeDrawer, removeFromCart, updateQuantity } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export const CartDrawer = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems, isDrawerOpen, totalQuantity } = useSelector(
        (state) => state.cart
    );
    const subtotal = cartItems.reduce((sum, item) => sum + item?.price * item.quantity, 0);
    const shipping = subtotal > 2000 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    console.log("totalQuantitytotalQuantity", totalQuantity);

    useEffect(() => {
        if (isDrawerOpen) {
            dispatch(closeDrawer());
        }
    }, []);

    return (
        <>
            {/* Drawer */}
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={() => dispatch(closeDrawer())}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: { xs: 350, sm: 400 },
                        maxWidth: "100vw",
                        display: "flex",
                        flexDirection: "column",
                    },
                }}
            >
                <Box sx={{ p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
                    {/* Header */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography variant="h6" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                            Shopping Cart
                        </Typography>
                        <IconButton onClick={() => dispatch(closeDrawer())}>
                            <Close />
                        </IconButton>
                    </Box>

                    {/* Scrollable Cart Items */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            pr: 1, // optional: to avoid scrollbar overlapping content
                            "&::-webkit-scrollbar": {
                                width: "6px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "rgba(0, 0, 0, 0.3)", // semi-transparent thumb
                                borderRadius: "3px",
                            },
                            "&::-webkit-scrollbar-track": {
                                background: "transparent", // transparent background
                            },
                        }}
                    >
                        {cartItems?.length === 0 ? (
                            <Box
                                sx={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 2,
                                }}
                            >
                                <ShoppingCart sx={{ fontSize: 64, color: "text.secondary" }} />
                                <Typography sx={{ color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily }}>
                                    Your cart is empty
                                </Typography>
                                <Button variant="contained" onClick={() => dispatch(closeDrawer())}>
                                    Continue Shopping
                                </Button>
                            </Box>
                        ) : (
                            <List sx={{ p: 0 }}>
                                {cartItems?.map((item) => (
                                    <ListItem key={item.id} sx={{ p: 0, mb: 1 }}>
                                        <Card sx={{ width: "100%", display: "flex", alignItems: 'center', px: 2 }}>
                                            <Box sx={{ width: 80, height: 80, flexShrink: 0 }}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 1 }}
                                                    image={item.images[0]?.url}
                                                    alt={item?.productName}
                                                    onClick={()=>{navigate(`/product-details/${item?.product_id}`); dispatch(closeDrawer())}}
                                                />
                                            </Box>
                                            <CardContent sx={{ flex: 1, p: 2, minWidth: 0 }}>
                                                <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} onClick={()=>{navigate(`/product-details/${item?.product_id}`); dispatch(closeDrawer())}}>
                                                    {item?.productName}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily }}>
                                                    ₹{item.price}
                                                </Typography>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                                                    <IconButton size="small" onClick={() => dispatch(updateQuantity({ id: item.product_id, change: -1 }))}>
                                                        <Remove fontSize="small" />
                                                    </IconButton>
                                                    <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily }}>
                                                        {item.quantity}
                                                    </Typography>
                                                    <IconButton size="small" onClick={() => dispatch(updateQuantity({ id: item.product_id, change: 1 }))}>
                                                        <Add fontSize="small" />
                                                    </IconButton>
                                                    <IconButton size="small" color="error" onClick={() => dispatch(removeFromCart(item.product_id))}>
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </CardContent>
                                            <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                                                <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily }}>
                                                    ₹{item.price * item.quantity}
                                                </Typography>
                                            </Box>
                                        </Card>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Box>

                    {/* Subtotal & Actions */}
                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>Subtotal</Typography>
                            <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>₹{subtotal.toFixed(2)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>Shipping</Typography>
                            <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                                {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>Tax</Typography>
                            <Typography sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>₹{tax.toFixed(2)}</Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h6" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>Total</Typography>
                            <Typography variant="h6" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>₹{total.toFixed(2)}</Typography>
                        </Box>

                        {/* Footer Buttons */}
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={() => { dispatch(closeDrawer()); navigate('/checkout'); }}
                            sx={{ mb: 2, fontFamily: theme.palette.typography.fontFamily, color: "#fff" }}
                        >
                            Proceed to Checkout
                        </Button>

                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => { dispatch(closeDrawer()); navigate('/shop'); }}
                            sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}
                        >
                            Continue Shopping
                        </Button>
                    </Box>
                </Box>
            </Drawer>

        </>
    );
};
