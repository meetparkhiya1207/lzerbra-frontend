import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  Box,
  Button,
  Chip,
  Rating,
  Divider,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Paper,
  Stack,
  useTheme,
  CircularProgress,
} from '@mui/material';
import {
  FavoriteBorder,
  Share,
  Add,
  Remove,
  ShoppingCart,
  LocalShipping,
  Security,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { getProductById } from '../../hooks/useProducts';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ProductDetailsComponents = () => {
  const { id } = useParams();
  const { product, isLoading, isError } = getProductById(id);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [fade, setFade] = useState(false);

  const reviews = [
    // {
    //   name: 'Michael Johnson',
    //   rating: 5,
    //   date: '2 weeks ago',
    //   comment: 'Excellent quality fabric. Perfect for my custom suit. The texture and feel are amazing.',
    //   avatar: 'M',
    // },
    // {
    //   name: 'David Smith',
    //   rating: 4,
    //   date: '1 month ago',
    //   comment: 'Great fabric, nice weight and drape. Delivery was quick and packaging was perfect.',
    //   avatar: 'D',
    // },
  ];


  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const discountPercentage = product?.discountPrice
    ? Math.round(((product?.discountPrice - product?.price) / product?.discountPrice) * 100)
    : 0;


  useEffect(() => {
    if (!product?.images?.length) return;

    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setSelectedImage((prev) =>
          prev === product.images.length - 1 ? 0 : prev + 1
        );
        setFade(false);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, [product?.images]);

  if (isLoading) {
    return (
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}
      >
        <CircularProgress size={60} />
      </Container>
    );
  }
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Product Images */}
        <Box sx={{ flex: 1, position: "relative" }}>
          <Card sx={{ mb: 2, overflow: "hidden", position: "relative" }}>
            {/* Main Image */}
            <CardMedia
              component="img"
              image={product?.images?.[selectedImage]?.url}
              alt={product?.productName}
              sx={{
                objectFit: "cover",
                height: "100%",
                width: "100%",
                transform: fade ? "scale(1.1)" : "scale(1)",
                transition: "transform 0.6s ease-in-out, opacity 0.6s ease-in-out",
                opacity: fade ? 0.8 : 1,
              }}
            />

            {/* White overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "white",
                opacity: fade ? 0.4 : 0,
                transition: "opacity 0.4s ease-in-out",
                pointerEvents: "none",
              }}
            />
          </Card>

          {/* Thumbnails */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {product?.images?.map((image, index) => (
              <Box key={index}>
                <Card
                  sx={{
                    cursor: "pointer",
                    border: selectedImage === index ? "2px solid" : "none",
                    borderColor:
                      selectedImage === index ? "primary.main" : "transparent",
                  }}
                  onClick={() => setSelectedImage(index)}
                >
                  <CardMedia
                    component="img"
                    height="80"
                    image={image?.url}
                    alt={`Fabric view ${index + 1}`}
                    sx={{ objectFit: "cover" }}
                  />
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Product Information */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ mb: 2 }}>
            <Chip label="Premium Quality" color={theme.palette.primary.main} size="small" sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main, fontWeight: "bold" }}>
              {product?.productName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product?.rating || 4} precision={0.1} readOnly size="small" />
              <Typography variant="body2" color={theme.palette.primary.lightmain} sx={{ ml: 1 }}>
                ({product?.reviewCount || 0} reviews)
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" color={theme.palette.primary.main} component="span" sx={{ fontWeight: 600, fontFamily: theme.palette.typography.fontFamily }}>
              ₹{product?.price}
            </Typography>
            <Typography
              variant="body1"
              color={theme.palette.primary.lightmain}
              component="span"
              sx={{ ml: 2, textDecoration: 'line-through', fontFamily: theme.palette.typography.fontFamily }}
            >
              ₹{product?.discountPrice}
            </Typography>
            <Chip label={`${discountPercentage}% OFF`} color="error" size="small" sx={{ ml: 2, fontFamily: theme.palette.typography.fontFamily }} />
          </Box>

          <Typography variant="body2" paragraph color={theme.palette.primary.lightmain} sx={{ fontFamily: theme.palette.typography.fontFamily }}>
            {product?.description}
          </Typography>

          {/* Fabric Specifications */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main, mb: 1 }}>
              Specifications
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color={theme.palette.primary.main} sx={{ fontFamily: theme.palette.typography.fontFamily }}>Fabric:</Typography>
                <Typography variant="body2" color={theme.palette.primary.lightmain} sx={{ fontFamily: theme.palette.typography.fontFamily }}>{product?.category}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color={theme.palette.primary.main} sx={{ fontFamily: theme.palette.typography.fontFamily }}>Shirt:</Typography>
                <Typography variant="body2" color={theme.palette.primary.lightmain} sx={{ fontFamily: theme.palette.typography.fontFamily }}>{product?.shirtMeter}m</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color={theme.palette.primary.main} sx={{ fontFamily: theme.palette.typography.fontFamily }}>Paint:</Typography>
                <Typography variant="body2" color={theme.palette.primary.lightmain} sx={{ fontFamily: theme.palette.typography.fontFamily }}>{product?.paintMeter}m</Typography>
              </Box>
              {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color={theme.palette.primary.main} sx={{fontFamily: theme.palette.typography.fontFamily}}>Composition:</Typography>
                <Typography variant="body2" color={theme.palette.primary.lightmain} sx={{fontFamily: theme.palette.typography.fontFamily}}>{product.composition}</Typography>
              </Box> */}
            </Box>
          </Box>

          {/* Size Selection */}
          {/* <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Cut Size (Yards)
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                <MenuItem value="Small">1 Yard</MenuItem>
                <MenuItem value="Medium">2 Yards</MenuItem>
                <MenuItem value="Large">3 Yards</MenuItem>
                <MenuItem value="XLarge">5 Yards</MenuItem>
              </Select>
            </FormControl>
          </Box> */}

          {/* Quantity Selection */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
              Quantity
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.lightmain }}>
              <IconButton onClick={() => handleQuantityChange(-1)} size="small">
                <Remove />
              </IconButton>
              <Typography variant="h6" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>{quantity}</Typography>
              <IconButton onClick={() => handleQuantityChange(1)} size="small" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.lightmain }}>
                <Add />
              </IconButton>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              size="large"
              // fullWidth
              startIcon={<ShoppingCart />}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addToCart({ ...product, quantity }));
              }}
              sx={{ width: { xs: '100%', sm: "32%", md: "43%", lg: "36%", xl: "30%" }, fontFamily: theme.palette.typography.fontFamily }}
            >
              Add to Cart
            </Button>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton>
                <FavoriteBorder />
              </IconButton>
              <IconButton>
                <Share />
              </IconButton>
            </Box>
          </Box>

          {/* Shipping Info */}
          <Paper sx={{ p: 2, backgroundColor: 'grey.50' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocalShipping color={theme.palette.primary.main} sx={{ mr: 1 }} />
              <Typography variant="body2" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.lightmain }}>Free shipping on orders over ₹2000</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Security color={theme.palette.primary.main} sx={{ mr: 1 }} />
              <Typography variant="body2" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.lightmain }}>30-day return guarantee</Typography>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Product Details Tabs */}
      <Box sx={{ mt: 6 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Features" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.lightmain }} />
          <Tab label="Reviews" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.lightmain }} />
          <Tab label="Care Instructions" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.lightmain }} />
        </Tabs>

        <TabPanel value={tabValue} index={0} sx={{ p: 0 }}>
          <List sx={{ pl: 0, pr: 0 }}>
            {product?.features.map((feature, index) => (
              <ListItem key={index}>
                <ListItemText primary={feature} primaryTypographyProps={{
                  sx: {
                    fontFamily: theme.palette.typography.fontFamily,
                    color: theme.palette.primary.lightmain,
                  },
                }}
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>
        <TabPanel value={tabValue} index={1} sx={{ p: 0 }}>
          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Box key={index} sx={{ my: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ mr: 2 }}>{review.avatar}</Avatar>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      color={theme.palette.primary.main}
                      sx={{ fontFamily: theme.palette.typography.fontFamily }}
                    >
                      {review.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating value={review.rating} size="small" readOnly />
                      <Typography
                        variant="body2"
                        color={theme.palette.primary.lightmain}
                        sx={{ ml: 1, fontFamily: theme.palette.typography.fontFamily }}
                      >
                        {review.date}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.lightmain }}
                >
                  {review.comment}
                </Typography>
                {index < reviews.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))
          ) : (
            <Typography
              variant="body2"
              align="center"
              sx={{ color: theme.palette.primary.lightmain, fontFamily: theme.palette.typography.fontFamily, my: 4 }}
            >
              No reviews yet
            </Typography>
          )}
        </TabPanel>


        <TabPanel value={tabValue} index={2}>
          <Typography variant="body1" paragraph sx={{ color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily, mt: 2, px: 2 }}>
            <strong>Washing Instructions:</strong>
          </Typography>
          <List>
            <ListItem>
              <ListItemText primaryTypographyProps={{
                sx: {
                  fontFamily: theme.palette.typography.fontFamily,
                  color: theme.palette.primary.lightmain,
                },
              }} primary="Machine wash cold water (30°C max)" />
            </ListItem>
            <ListItem>
              <ListItemText primaryTypographyProps={{
                sx: {
                  fontFamily: theme.palette.typography.fontFamily,
                  color: theme.palette.primary.lightmain,
                },
              }} primary="Use mild detergent, no bleach" />
            </ListItem>
            <ListItem>
              <ListItemText primaryTypographyProps={{
                sx: {
                  fontFamily: theme.palette.typography.fontFamily,
                  color: theme.palette.primary.lightmain,
                },
              }} primary="Tumble dry low or hang to dry" />
            </ListItem>
            <ListItem>
              <ListItemText primaryTypographyProps={{
                sx: {
                  fontFamily: theme.palette.typography.fontFamily,
                  color: theme.palette.primary.lightmain,
                },
              }} primary="Iron on low heat if needed" />
            </ListItem>
            <ListItem>
              <ListItemText primaryTypographyProps={{
                sx: {
                  fontFamily: theme.palette.typography.fontFamily,
                  color: theme.palette.primary.lightmain,
                },
              }} primary="Professional dry cleaning recommended for best results" />
            </ListItem>
          </List>
        </TabPanel>
      </Box>

      {/* Related Products */}
      {/* <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Related Products
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {relatedProducts.map((relatedProduct, index) => (
            <Box key={index} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.333% - 16px)' } }}>
              <Card sx={{ 
                cursor: 'pointer', 
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' } 
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={relatedProduct.image}
                  alt={relatedProduct.name}
                />
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" noWrap>
                    {relatedProduct.name}
                  </Typography>
                  <Typography variant="h6" color="primary.main">
                    ${relatedProduct.price}
                  </Typography>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Box> */}
    </Container>
  );
};

export default ProductDetailsComponents;