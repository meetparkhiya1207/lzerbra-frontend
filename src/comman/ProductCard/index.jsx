import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Rating,
    Chip,
    useTheme,
    IconButton,
} from '@mui/material';
import { ShoppingCart, FavoriteBorder, Favorite, Visibility } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../features/cart/cartSlice';

const ProductCard = ({
    product,
}) => {
    console.log("productproductproduct", product);

    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const [hovered, setHovered] = useState(false);


    const discountPercentage = product.discountPrice
        ? Math.round(((product.discountPrice - product.price) / product.discountPrice) * 100)
        : 0;

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: { xs: 'none', md: 'translateY(-4px)' },
                    boxShadow: { xs: 2, md: 6 },
                },
            }}
        >
            {/* Discount Badge */}
            {discountPercentage > 0 && (
                <Chip
                    label={`${discountPercentage}% OFF`}
                    color="error"
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        zIndex: 10,
                        fontWeight: 600,
                        fontSize: { xs: 10, sm: 12 },
                        px: 0.5,
                        height: { xs: 24, sm: 28 },
                        borderRadius: "6px",
                        letterSpacing: 0.5,
                        fontFamily: theme.typography.fontFamily,
                    }}
                />
            )}

            {/* Image + Overlay Icons */}
            <Box sx={{ position: 'relative', pt: '100%' }}>
                <Box
                    component="img"
                    src={hovered ? product?.images[1]?.url : product?.images[0]?.url}
                    alt={product.productName}
                    sx={{
                        top: 0,
                        width: 1,
                        height: 1,
                        objectFit: 'cover',
                        position: 'absolute',
                        borderRadius: '4px 4px 0 0',
                        transition: '0.3s ease-in-out !important',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={() => navigate(`/product-details/${product.product_id}`)}
                />

                {/* View Button */}
                <IconButton
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product-details/${product.product_id}`)
                    }}
                    sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        zIndex: 10,
                        height: { xs: 30, sm: 40 },
                        width: { xs: 30, sm: 40 },
                        borderRadius: "50%",
                        bgcolor: "rgba(255, 255, 255, 0.93)",
                        border: `1px solid ${theme.palette.primary.main}`,
                        "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                    }}
                >
                    <Visibility fontSize="small" sx={{ color: theme.palette.primary.main }} />
                </IconButton>

                {/* Wishlist Button */}
                <IconButton
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        setLiked(!liked);
                        console.log("likedliked", liked);

                        if (!liked) {
                            confetti();
                            dispatch({ type: 'liked/addLiked', payload: product });
                        } else {
                            dispatch({ type: 'liked/removeLiked', payload: product.id });
                        }
                    }}
                    sx={{
                        position: "absolute",
                        top: { xs: 50, sm: 60 },
                        right: 12,
                        zIndex: 10,
                        height: { xs: 30, sm: 40 },
                        width: { xs: 30, sm: 40 },
                        borderRadius: "50%",
                        bgcolor: "rgba(255, 255, 255, 0.93)",
                        border: liked
                            ? `1px solid #d32f2f`
                            : `1px solid ${theme.palette.primary.main}`,
                        "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                    }}
                >
                    {liked ? (
                        <Favorite sx={{ fontSize: 18, color: "#d32f2f" }} />
                    ) : (
                        <FavoriteBorder sx={{ fontSize: 18, color: theme.palette.primary.main }} />
                    )}
                </IconButton>
            </Box>

            {/* Content */}
            <CardContent sx={{ flexGrow: 1, p: { xs: 1, sm: 2 } }}>
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        fontWeight: 600,
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        fontFamily: theme.palette.typography.fontFamily,
                        color: theme.palette.primary.main,
                    }}
                >
                    {product.productName}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={product.rating} readOnly size="small" precision={0.1} />
                    <Typography
                        variant="body2"
                        color={theme.palette.primary.lightmain}
                        sx={{ ml: 1, fontFamily: theme.palette.typography.fontFamily }}
                    >
                        ({product.reviewCount || 0})
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 2 } }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            mr: 1,
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                            fontFamily: theme.palette.typography.fontFamily,
                            color: theme.palette.primary.main,
                        }}
                    >
                        ₹{product.price.toLocaleString()}
                    </Typography>
                    {product.discountPrice && (
                        <Typography
                            variant="body2"
                            sx={{
                                textDecoration: 'line-through',
                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                fontFamily: theme.palette.typography.fontFamily,
                                color: theme.palette.primary.lightmain,
                            }}
                        >
                            ₹{product.discountPrice.toLocaleString()}
                        </Typography>
                    )}
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ShoppingCart />}
                    disabled={!product.inStock}
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addToCart(product))
                    }}
                    sx={{
                        mt: 'auto',
                        textTransform: 'none',
                        fontWeight: 600,
                        py: { xs: 1, sm: 1.2 },
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        fontFamily: theme.palette.typography.fontFamily,
                        backgroundColor: theme.palette.primary.main,
                    }}
                >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
