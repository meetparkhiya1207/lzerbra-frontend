import React from "react";
import { Grid, Card, CardContent, Typography, Box, Button, useTheme } from "@mui/material";

const products = [
  {
    id: 1,
    name: "Premium Cotton Fabric",
    price: 1200,
    discountPrice: 900,
    offer: "25% OFF",
    image: "/images/Slider1.jpg",
  },
  {
    id: 2,
    name: "Silk Shine Fabric",
    price: 1500,
    discountPrice: 1100,
    offer: "30% OFF",
    image: "/images/Slider2.jpg",
  },
  {
    id: 3,
    name: "Linen Classic Fabric",
    price: 1000,
    discountPrice: 750,
    offer: "25% OFF",
    image: "/images/Slider1.jpg",
  },
  {
    id: 4,
    name: "Designer Fabric",
    price: 2000,
    discountPrice: 1500,
    offer: "25% OFF",
    image: "/images/Slider2.jpg",
  },
];

const ProductListing = () => {
    const theme = useTheme();
  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 6 }}>
      <Typography fontWeight="bold" mb={4} textAlign="center" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.maindark , fontSize: { xs: "1.5rem", md: "2.5rem" }}}>
        Featured Fabrics
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={6} sm={6} md={3} key={product.id}>
            <Card sx={{ position: "relative", borderRadius: 3, boxShadow: 3 }}>
              {/* Offer Label */}
              <Box
                sx={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  backgroundColor: "error.main",
                  color: "white",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                {product.offer}
              </Box>

              {/* Image */}
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: "100%",
                  height: { xs: 160, sm: 200, md: 220 }, // responsive image height
                  objectFit: "cover",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />

              <CardContent>
                <Typography variant="h6" fontWeight="600">
                  {product.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                  <Typography variant="body1" fontWeight="bold" color="primary">
                    ₹{product.discountPrice}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: "line-through", color: "text.secondary" }}
                  >
                    ₹{product.price}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2, borderRadius: 2 }}
                >
                  Shop Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductListing;
