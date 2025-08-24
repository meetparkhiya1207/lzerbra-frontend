import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Rating,
  Stack,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const product = {
  id: 1,
  name: "Premium Cotton Shirt",
  description:
    "Experience comfort with our 100% premium cotton shirt, perfect for casual and formal wear.",
  price: 1200,
  discountPrice: 899,
  rating: 4.5,
  images: [
    "/images/Slider1.jpg",
    "/images/Slider2.jpg",
    "/images/Slider1.jpg",
    "/images/Slider2.jpg",
  ],
  sizes: ["S", "M", "L", "XL"],
  colors: ["White", "Blue", "Black"],
};

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        {/* Left Side: Product Images */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 2,
              mb: 2,
            }}
          >
            <img
              src={selectedImage}
              alt={product.name}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>

          {/* Thumbnails */}
          <Stack direction="row" spacing={2}>
            {product.images.map((img, index) => (
              <Box
                key={index}
                sx={{
                  border:
                    selectedImage === img
                      ? "2px solid #1976d2"
                      : "2px solid transparent",
                  borderRadius: 2,
                  cursor: "pointer",
                  overflow: "hidden",
                  width: 80,
                  height: 80,
                }}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            ))}
          </Stack>
        </Grid>

        {/* Right Side: Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold">
            {product.name}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary">
              {product.rating} / 5
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
            <Typography variant="h5" fontWeight="bold" color="primary">
              ₹{product.discountPrice}
            </Typography>
            <Typography
              variant="body1"
              sx={{ textDecoration: "line-through", color: "text.secondary" }}
            >
              ₹{product.price}
            </Typography>
            <Typography variant="body2" color="green">
              {Math.round(
                ((product.price - product.discountPrice) / product.price) * 100
              )}
              % OFF
            </Typography>
          </Stack>

          <Typography variant="body1" sx={{ mt: 2 }}>
            {product.description}
          </Typography>

          {/* Size Selection */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Select Size:
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "contained" : "outlined"}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </Stack>
          </Box>

          {/* Color Selection */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Select Color:
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              {product.colors.map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? "contained" : "outlined"}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Button>
              ))}
            </Stack>
          </Box>

          {/* Buttons */}
          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              size="large"
              fullWidth
            >
              Add to Cart
            </Button>
            <IconButton color="error">
              <FavoriteBorderIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
