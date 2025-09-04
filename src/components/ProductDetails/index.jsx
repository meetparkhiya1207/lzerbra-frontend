import React, { useMemo, useRef, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Breadcrumbs,
  Link as MLink,
  Chip,
  Rating,
  Stack,
  IconButton,
  Button,
  Divider,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  Badge,
  useMediaQuery,
  useTheme,
  Skeleton,
  Container,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ProductDetailsPage() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const product = useMemo(
    () => ({
      id: 1,
      productid: "P001",
      productname: "Striped Line Cotton Fabric",
      category: "Cotton Fabric",
      subcategory: "Line Cotton",
      price: 1200,
      mrp: 1500,
      discountLabel: "20% OFF",
      rating: 4.5,
      reviews: 34,
      images: [
        "/images/Product1.jpg",
        "/images/Product2.jpg",
        "/images/Product3.jpg",
        "/images/Product4.jpg",
      ],
      colors: [
        { key: "beige", label: "Beige", hex: "#f5f5dc", border: true },
        { key: "blue", label: "Blue", hex: "#0000ff" },
        { key: "green", label: "Green", hex: "#008000" },
        { key: "red", label: "Red", hex: "#ff0000" },
        { key: "black", label: "Black", hex: "#000000" },
      ],
      sizes: ["1.0 m", "1.5 m", "2.0 m", "2.5 m", "3.0 m"],
      badges: ["Bestseller", "Free Shipping"],
      highlights: [
        "100% Cotton fabric, soft and breathable",
        "Perfect for shirts, dresses, and light apparel",
        "Durable with a smooth finish",
        "Available in multiple colors and sizes",
      ],
      description:
        "This striped cotton fabric is perfect for creating comfortable and stylish clothing. Its breathable material ensures all-day comfort, while the vibrant stripes add a touch of elegance to any outfit. Ideal for both casual and formal wear.",
      instock: true,
    }),
    []
  );

  const [selectedImg, setSelectedImg] = useState(0);
  const [hoverZoom, setHoverZoom] = useState({ active: false, x: 50, y: 50 });
  const [color, setColor] = useState(product.colors[0].key);
  const [size, setSize] = useState(product.sizes[1]);
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const mainImgRef = useRef(null);

  const handlePrev = () =>
    setSelectedImg((i) => (i - 1 + product.images.length) % product.images.length);
  const handleNext = () => setSelectedImg((i) => (i + 1) % product.images.length);

  // Keyboard navigation
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  // Hover zoom logic (desktop only)
  const handleMouseMove = (e) => {
    if (!isMdUp) return;
    const rect = mainImgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHoverZoom({ active: true, x, y });
  };

  const handleMouseLeave = () =>
    setHoverZoom((z) => ({ ...z, active: false }));

  const priceBlock = (
    <Box>
      <Stack direction="row" spacing={1} alignItems="baseline" flexWrap="wrap">
        <Typography variant="h4" fontWeight={700} sx={{ color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily }}>
          ₹{product.price}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textDecoration: "line-through", color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily }}
        >
          ₹{product.mrp}
        </Typography>
        <Chip size="small" color="success" label={product.discountLabel} sx={{ color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily }} />
      </Stack>
      <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
        {product.badges.map((b) => (
          <Chip
            key={b}
            size="small"
            color="primary"
            variant="outlined"
            label={b}
            sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}
          />
        ))}
      </Stack>
    </Box>
  );

  return (
    <Container maxWidth="xl">
      <Box onKeyDown={onKeyDown} tabIndex={0} sx={{ outline: "none", py: 3 }}>


        <Grid container spacing={10}>
          {/* Left: Gallery */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                position: { md: "sticky" },
                top: { md: 24 },
                display: "grid",
                gap: 2,
              }}
            >
              {/* Main Image */}
              <Box
                ref={mainImgRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                sx={{
                  position: "relative",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: 3,
                  width: "100%",
                  aspectRatio: "1 / 1", // keeps square ratio on all screens
                  bgcolor: "background.paper",
                }}
              >
                {/* Navigation Arrows */}
                <IconButton
                  onClick={handlePrev}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: 12,
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(0,0,0,0.4)",
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
                  }}
                >
                  <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={handleNext}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: 12,
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(0,0,0,0.4)",
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
                  }}
                >
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>

                <Box
                  component="img"
                  src={product.images[selectedImg]}
                  alt={`Product image ${selectedImg + 1}`}
                  loading="lazy"
                  sx={{
                    width: { xs: '100%', sm: "800px" },
                    height: { xs: '100%', sm: "800px" },
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* Thumbnails */}
              <Stack
                direction="row"
                spacing={1}
                justifyContent={{ xs: "center", md: "flex-start" }}
                flexWrap="wrap"
              >
                {product.images.map((src, idx) => (
                  <Box
                    key={src}
                    component="img"
                    src={src}
                    alt={`Thumb ${idx + 1}`}
                    onClick={() => setSelectedImg(idx)}
                    sx={{
                      width: { xs: 64, sm: 80, md: 90 },
                      height: { xs: 64, sm: 80, md: 90 },
                      objectFit: "cover",
                      borderRadius: 2,
                      cursor: "pointer",
                      border: (theme) =>
                        `2px solid ${selectedImg === idx
                          ? theme.palette.primary.main
                          : "transparent"
                        }`,
                      boxShadow: selectedImg === idx ? 3 : 1,
                      transition: "transform .2s, box-shadow .2s",
                      "&:hover": { transform: "translateY(-2px)" },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Right: Details */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2} sx={{ paddingTop: { xs: 4, md: 0 } }}>
              <Typography variant="h4" fontWeight={700} lineHeight={1.2} sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                {product.productname}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Rating
                  name="read-only"
                  value={product.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                />
                <Typography variant="body2" color="text.secondary">
                  {product.rating} • {product.reviews} reviews
                </Typography>
              </Stack>

              {priceBlock}

              <Divider sx={{ my: 1 }} />

              {/* Quantity */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily }}>
                  Quantity :
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 0.5,
                    color: theme.palette.primary.main,
                    fontFamily: theme.palette.typography.fontFamily
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    sx={{ color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography width={28} textAlign="center">
                    {qty}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => setQty((q) => q + 1)}
                    sx={{ color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>

              {/* Actions */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                alignItems={{ xs: "stretch", sm: "center" }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCartIcon />}
                  sx={{ borderRadius: 2, minWidth: 180 }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ borderRadius: 2, minWidth: 160 }}
                >
                  Buy Now
                </Button>
                <Tooltip
                  title={liked ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <IconButton
                    onClick={() => setLiked((l) => !l)}
                    color={liked ? "error" : "default"}
                  >
                    {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share">
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </Stack>

              <Divider sx={{ my: 1.5 }} />


            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
