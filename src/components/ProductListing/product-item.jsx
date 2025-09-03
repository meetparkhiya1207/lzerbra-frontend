import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export function ProductItem({ product }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        fontSize: { xs: 10, sm: 12 },
        px: 0.5,
        height: { xs: 24, sm: 28 },
        borderRadius: "6px",
        letterSpacing: 0.5,
        fontFamily: theme.typography.fontFamily,
      }}
    />
  ) : null;

  // View label
  const renderView = (
    <Chip
      icon={<VisibilityIcon sx={{ fontSize: { xs: 14, sm: 18 }, color: theme.palette.primary.main }} />}
      size="small"
      onClick={() => navigate(`/product-details/${product.id}`)}
      sx={{
        position: "absolute",
        top: 12,
        right: 12,
        zIndex: 10,
        height: { xs: 30, sm: 44 },
        width: { xs: 30, sm: 44 },
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(255, 255, 255, 0.93)",
        border: `1px solid ${theme.palette.primary.main}`,
        cursor: "pointer",
        "& .MuiChip-label": { display: "none" },
        "& .MuiChip-icon": { margin: 0 },
      }}
    />
  );

  // Heart
  const renderHeart = (
    <Chip
      onClick={() => {
        setLiked(!liked);
        if (!liked) {
          confetti();
          dispatch({ type: 'liked/addLiked', payload: product });
        } else {
          dispatch({ type: 'liked/removeLiked', payload: product.id });
        }
      }}
      icon={
        liked ? (
          <FavoriteIcon sx={{ fontSize: { xs: 14, sm: 18 }, color: "#d32f2f !important" }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: { xs: 14, sm: 18 } }} />
        )
      }
      size="small"
      sx={{
        position: "absolute",
        top: { xs: 50, sm: 60 },
        right: 12,
        zIndex: 10,
        height: { xs: 30, sm: 44 },
        width: { xs: 30, sm: 44 },
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
      {product.price && (
        <Typography
          component="span"
          variant="body2"
          sx={{
            color: theme.palette.grey[600],
            textDecoration: 'line-through',
            mr: 1.2,
            fontFamily: theme.typography.fontFamily,

          }}
        >
          ₹{product.price}
        </Typography>
      )}
      <span style={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: isMobile ? '1.2rem' : '1.1rem', fontFamily: theme.typography.fontFamily }}>
        ₹{product.discountprice}
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
        height: 22,
        fontFamily: theme.typography.fontFamily,
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

      <Stack spacing={1.5} sx={{ px: 2, py:2 }}>
        <Link
          color="inherit"
          variant="subtitle2"
          noWrap
          onClick={() => navigate(`/product-details/${product.id}`)}
          sx={{
            fontFamily: theme.typography.fontFamily,
            fontWeight: 600,
            color: theme.palette.primary.main,
            fontSize: { xs: "1.2rem", md: "1.2rem" },
            textDecoration: 'none',
            cursor: "pointer",
          }}
        >
          {product.productname}
        </Link>

        {/* Stock + Price row */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {renderPrice}

        </Box>

        {/* Rating row */}
        {renderRating}

        {/* Buttons (only desktop) */}
        {!isMobile && (
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Button
              variant="contained"
              sx={{
                px: 2,
                py: 1,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.background.paper,
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "0.9rem",
                textTransform: "none",
                fontFamily: theme.typography.fontFamily,
              }}
            >
              Buy Now
            </Button>
            <Button
              onClick={() => { dispatch({ type: 'cart/addToCart', payload: product }); }}
              variant="outlined"
              sx={{
                px: 3,
                py: 1,
                color: theme.palette.primary.main,
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "0.9rem",
                textTransform: "none",
                fontFamily: theme.typography.fontFamily,
              }}
            >
              Add to Cart
            </Button>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
