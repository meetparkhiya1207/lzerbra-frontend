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
                onClose={() => dispatch(closeDrawer())} // 👈 Corrected
                sx={{
                    "& .MuiDrawer-paper": { width: { xs: "100%", sm: 400 }, maxWidth: "100vw" },
                }}
            >
                <Box sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
                    {/* Header */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography variant="h6" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>Shopping Cart</Typography>
                        <IconButton onClick={() => dispatch(closeDrawer())}>
                            <Close />
                        </IconButton>
                    </Box>

                    {/* Empty Cart */}
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
                            <Typography sx={{ color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily }}>Your cart is empty</Typography>
                            <Button variant="contained" onClick={() => dispatch(closeDrawer())}>
                                Continue Shopping
                            </Button>
                        </Box>
                    ) : (
                        <>
                            {/* Items */}
                            <Box sx={{ flex: 1, overflow: "auto" }}>
                                <List sx={{ p: 0 }}>
                                    {cartItems?.map((item) => (
                                        <ListItem key={item.id} sx={{ p: 0, mb: 2, }}>
                                            <Card sx={{ width: "100%", display: "flex", alignItems: 'center', px: 2 }}>
                                                <Box
                                                    sx={{
                                                        width: 80,
                                                        height: 80,
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 1 }}
                                                        image={item.images[0]?.url}
                                                        alt={item?.productName}
                                                    />
                                                </Box>
                                                <CardContent sx={{ flex: 1, p: 2, minWidth: 0 }}>
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            color: theme.palette.primary.main,
                                                            fontFamily: theme.palette.typography.fontFamily,
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden", // 👈 add this
                                                            textOverflow: "ellipsis", // 👈 will now work
                                                        }}
                                                    >
                                                        {item?.productName}
                                                    </Typography>

                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: theme.palette.primary.main,
                                                            fontFamily: theme.palette.typography.fontFamily,
                                                        }}
                                                    >
                                                        ₹{item.price}
                                                    </Typography>

                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => dispatch(updateQuantity({ id: item.product_id, change: -1 }))}
                                                        >
                                                            <Remove fontSize="small" />
                                                        </IconButton>

                                                        <Typography
                                                            variant="body2"
                                                            sx={{ color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily }}
                                                        >
                                                            {item.quantity}
                                                        </Typography>

                                                        <IconButton
                                                            size="small"
                                                            onClick={() => dispatch(updateQuantity({ id: item.product_id, change: 1 }))}
                                                        >
                                                            <Add fontSize="small" />
                                                        </IconButton>

                                                        <IconButton
                                                            size="small"
                                                            color="error"
                                                            onClick={() => dispatch(removeFromCart(item.product_id))}
                                                        >
                                                            <Delete fontSize="small" />
                                                        </IconButton>
                                                    </Box>
                                                </CardContent>


                                                <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                                                    <Typography variant="subtitle2">
                                                        ₹{item.price * item.quantity}
                                                    </Typography>
                                                </Box>
                                            </Card>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                            <Box sx={{ mb: 2 }}>
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
                            </Box>
                            {/* Footer */}
                            <Box sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    onClick={() => { dispatch(closeDrawer()); navigate('/checkout') }}
                                    sx={{ mb: 2, fontFamily: theme.palette.typography.fontFamily, color: "#fff" }}
                                >
                                    Proceed to Checkout
                                </Button>

                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => {dispatch(closeDrawer()); navigate('/shop')}}
                                    sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}
                                >
                                    Continue Shopping
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Drawer>
        </>
    );
};
