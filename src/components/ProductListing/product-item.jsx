import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';   // <-- ADD
import { useTheme } from '@emotion/react';
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { use, useState } from 'react';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

export function ProductItem({ product }) {
  const theme = useTheme();
  const dispatch  = useDispatch();
  const [liked, setLiked] = useState(false);

  const discountPercentage =
    product.price && product.discountprice
      ? Math.round(((product.price - product.discountprice) / product.price) * 100)
      : 0;

  // Discount label
  const renderDiscount = discountPercentage ? (
    <Chip
      label={discountPercentage + "% OFF"}
      color="error"
      size="small"
      sx={{
        position: 'absolute',
        top: 12,
        left: 12,
        zIndex: 10,
        fontWeight: 600,
        fontSize: 12,
        px: 0.5,
        height: 28,
        borderRadius: "6px",
        letterSpacing: 0.5,
        fontFamily: theme.palette.typography.fontFamily,
      }}
    />
  ) : null;

  // View label
  const renderView = (
    <Chip
      icon={<VisibilityIcon sx={{ fontSize: 18, color: "white" }} />}
      color="primary"
      size="small"
      sx={{
        position: "absolute",
        top: 12,
        right: 12,
        zIndex: 10,
        height: 44,
        width: 44,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(255, 255, 255, 0.93)",
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
        "& .MuiChip-label": {
          display: "none" // label remove kariye to only icon center ma
        },
        "& .MuiChip-icon": {
          margin: 0 // default margin remove
        }
      }}
    />
  );

  // Heart
  const renderHeart = (
    <Chip
      onClick={() => setLiked(!liked)}
      icon={
        liked ? (
          <FavoriteIcon sx={{ fontSize: 22, color: "#d32f2f !important" }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: 22 }} />
        )
      }
      size="small"
      sx={{
        position: "absolute",
        top: 60,
        right: 12,
        zIndex: 10,
        height: 44,
        width: 44,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(255, 255, 255, 0.93)",
        border: liked ? `1px solid #d32f2f` : `1px solid ${theme.palette.primary.main}`,
        cursor: "pointer",
        "& .MuiChip-label": { display: "none" },
        "& .MuiChip-icon": { margin: 0 },
        "&:hover": { backgroundColor: "rgba(255,255,255,0.93)" },
      }}
    />
  );




  // Product Image
  const renderImg = (
    <Box
      component="img"
      alt={product.productname}
      src={product.image}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  // Price section
  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body2"
        sx={{
          color: theme.palette.primary.maindark,
          textDecoration: 'line-through',
          mr: 1.2,
          fontFamily: theme.palette.typography.fontFamily
        }}
      >
        {product.price ? `₹${product.discountprice}` : ''}
      </Typography>{""}
      <span style={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: '1.5rem', fontFamily: theme.palette.typography.fontFamily }}>
        ₹{product.price || product.discountprice}
      </span>
    </Typography>
  );

  // Stock status
  const renderStock = (
    <Chip
      label={product.instock ? "In Stock" : "Out of Stock"}
      size="small"
      sx={{
        bgcolor: product.instock ? "#C8E6C9" : "#FFCDD2",
        color: product.instock ? "#2E7D32" : "#C62828",
        fontWeight: 600,
        fontSize: 12,
        borderRadius: "6px",
        py: 1.8,
        height: 22,
        fontFamily: theme.palette.typography.fontFamily,
      }}
    />
  );

  // Rating
  const renderRating = (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Rating value={product.rating || 0} precision={0.5} readOnly size="small" />
      <Typography variant="body2" sx={{ ml: 0.5, color: "text.secondary" }}>
        ({product.rating || 0})
      </Typography>
    </Box>
  );

  return (
    <Card
      sx={{
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {renderView}
        {renderHeart}
        {renderDiscount}
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link
          color="inherit"
          variant="subtitle2"
          noWrap
          sx={{
            fontFamily: theme.palette.typography.fontFamily,
            fontWeight: 600,
            color: theme.palette.primary.main,
            fontSize: { xs: "1.2rem", md: "1.4rem" },
            textDecoration: 'none',
          }}
        >
          {product.productname}
        </Link>



        {/* Stock + Price row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {renderPrice}
          {renderStock}
        </Box>
        {/* Rating row */}
        {renderRating}
        {/* Buttons */}
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              px: 2,
              py: 1,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.backgroundcolor.main,
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: { xs: "16px" },
              textTransform: "none",
              fontFamily: theme.palette.typography.fontFamily,
              transition: "background 0.2s",
            }}
          >
            Buy Now
          </Button>
          <Button
            onClick={() => { dispatch({ type: 'cart/addToCart', payload: product }); }}
            variant="outlined"
            sx={{
              mt: 2,
              px: 4,
              py: 1,
              bgcolor: "rgba(255,255,255,0.15)",
              color: theme.palette.primary.main,
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: { xs: "1rem", md: "1.125rem" },
              textTransform: "none",
              fontFamily: theme.palette.typography.fontFamily,
              transition: "background 0.2s",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.15)",
                color: theme.palette.primary.main,
              },
            }}
          >
            Add to Cart
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
