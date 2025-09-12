import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    Avatar,
    IconButton,
    Button,
    Divider,
    Chip,
    Paper,
    Alert,
    useTheme,
} from '@mui/material';
import {
    Add,
    Remove,
    Delete,
    ShoppingCart,
    LocalShipping,
    Security,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CommonHeading from '../CommonHeading';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../features/cart/cartSlice';

const CartPageSimple = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const cartProduct = useSelector((state) => state.cart.cartItems);
    console.log("cartProductcartProduct", cartProduct);

    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Premium Wireless Headphones',
            price: 199.99,
            quantity: 1,
            image: '/placeholder.svg',
            color: 'Black',
        },
        {
            id: 2,
            name: 'Smart Fitness Watch',
            price: 299.99,
            quantity: 2,
            image: '/placeholder.svg',
            color: 'Silver',
        },
        {
            id: 3,
            name: 'Laptop Stand Aluminum',
            price: 79.99,
            quantity: 1,
            image: '/placeholder.svg',
        },
    ]);

    // const updateQuantity = (id, change) => {
    //     setCartItems(items =>
    //         items.map(item =>
    //             item.id === id
    //                 ? { ...item, quantity: Math.max(1, item.quantity + change) }
    //                 : item
    //         )
    //     );
    // };

    const subtotal = cartProduct.reduce((sum, item) => sum + item?.price * item.quantity, 0);
    const shipping = subtotal > 2000 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <CommonHeading
                title="Shopping Cart"
                lineWidth={140}
                align="center"
            />

            {cartProduct?.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <ShoppingCart sx={{ fontSize: 64, color: theme.palette.primary.main, mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                        Your cart is empty
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/shop')}
                        sx={{ mt: 2, fontFamily: theme.palette.typography.fontFamily, color: "#fff" }}
                    >
                        Continue Shopping
                    </Button>
                </Paper>
            ) : (
                <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
                    <Box sx={{ flex: 1 }}>
                        {subtotal > 2000 && (
                            <Alert sx={{ mb: 2, fontFamily: theme.palette.typography.fontFamily, color: "green" }}>
                                🎉 Congratulations! You qualify for free shipping
                            </Alert>
                        )}

                        {cartProduct?.map(item => (
                            <Card key={item.id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                                        <Avatar
                                            src={item?.images[0]?.url}
                                            variant="rounded"
                                            sx={{ width: 80, height: 80 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/product-details/${item?.product_id}`)
                                            }}
                                        />

                                        <Box sx={{ flex: 1, minWidth: 200 }}>
                                            <Typography variant="h6" gutterBottom sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/product-details/${item?.product_id}`)
                                                }}>
                                                {item?.productName}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                {item?.category && (
                                                    <Chip
                                                        label={`Category: ${item?.category}`}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.lightmain }}
                                                    />
                                                )}
                                                {item?.inStock && (
                                                    <Chip
                                                        label={`In Stock: ${item?.inStock}`}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.lightmain }}
                                                    />
                                                )}
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <IconButton
                                                onClick={() => dispatch(updateQuantity({ id: item.id, change: -1 }))}
                                                size="small"
                                            >
                                                <Remove />
                                            </IconButton>
                                            <Typography sx={{ minWidth: 30, textAlign: 'center', fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                                                {item.quantity}
                                            </Typography>
                                            <IconButton
                                                onClick={() => dispatch(updateQuantity({ id: item.id, change: 1 }))}

                                                size="small"
                                            >
                                                <Add />
                                            </IconButton>
                                        </Box>

                                        <Typography variant="h6" sx={{ minWidth: 80, textAlign: 'center', fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                                            ₹{(item?.price * item.quantity).toFixed(2)}
                                        </Typography>

                                        <IconButton
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            color="error"
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                    <Box sx={{ width: { xs: '100%', md: 400 } }}>
                        <Card sx={{ position: 'sticky', top: 20 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                                    Order Summary
                                </Typography>

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

                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    onClick={() => navigate('/checkout')}
                                    sx={{ mb: 2, fontFamily: theme.palette.typography.fontFamily, color: "#fff" }}
                                >
                                    Proceed to Checkout
                                </Button>

                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => navigate('/shop')}
                                    sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}
                                >
                                    Continue Shopping
                                </Button>

                                <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'grey.200' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <LocalShipping sx={{ mr: 1, color: theme.palette.primary.main }} />
                                        <Typography variant="body2" sx={{ fontFamily: theme.palette.typography.fontFamily }}>Free shipping over ₹2000</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Security sx={{ mr: 1, color: theme.palette.primary.main }} />
                                        <Typography variant="body2" sx={{ fontFamily: theme.palette.typography.fontFamily }}>Secure checkout</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default CartPageSimple;