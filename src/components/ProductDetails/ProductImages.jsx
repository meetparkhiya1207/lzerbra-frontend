import { useState } from "react";
import { Box, IconButton, Typography, Card, CardMedia } from "@mui/material";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "@mui/icons-material";

export const ProductImages = ({ images, productName }) => {
  if (!images || images.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: 300,
          bgcolor: "grey.100",
          borderRadius: 2,
        }}
      >
        <ImageIcon sx={{ fontSize: 48, color: "grey.400", mb: 1 }} />
        <Typography variant="body2" color="text.secondary">
          No images available
        </Typography>
      </Box>
    );
  }

  const fullImages = images.map((img) => ({
    ...img,
    filename: `${process.env.REACT_APP_BACKEND_API}/uploads/${img.filename}`,
  }));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % fullImages.length);
  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + fullImages.length) % fullImages.length);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Main Image */}
      <Box sx={{ position: "relative" }}>
        <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
          <CardMedia
            component="img"
            height="400"
            image={fullImages[currentImageIndex].filename}
            alt={`${productName} - Image ${currentImageIndex + 1}`}
            sx={{ objectFit: "cover", bgcolor: "grey.100" }}
            onError={(e) => {
              e.target.src = "/placeholder.svg";
            }}
          />
        </Card>

        {fullImages.length > 1 && (
          <>
            <IconButton
              onClick={prevImage}
              sx={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.9)",
                "&:hover": { bgcolor: "rgba(255,255,255,1)" },
              }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              onClick={nextImage}
              sx={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(255,255,255,0.9)",
                "&:hover": { bgcolor: "rgba(255,255,255,1)" },
              }}
            >
              <ChevronRight />
            </IconButton>
          </>
        )}
      </Box>

      {/* Thumbnails */}
      {fullImages.length > 1 && (
        <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 1 }}>
          {fullImages.map((image, index) => (
            <Card
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              sx={{
                minWidth: 64,
                height: 64,
                cursor: "pointer",
                border: index === currentImageIndex ? 2 : 1,
                borderColor: index === currentImageIndex ? "primary.main" : "grey.300",
                borderRadius: 1,
                overflow: "hidden",
                "&:hover": { borderColor: "primary.main" },
              }}
            >
              <CardMedia
                component="img"
                height="64"
                image={image.filename}
                alt={`${productName} thumbnail ${index + 1}`}
                sx={{ objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = "/placeholder.svg";
                }}
              />
            </Card>
          ))}
        </Box>
      )}

      {fullImages.length > 1 && (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {currentImageIndex + 1} of {fullImages.length} images
        </Typography>
      )}
    </Box>
  );
};
