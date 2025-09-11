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
import { getProducts } from '../../api/productApi';

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
  console.log("runnnnnnnn", id);

  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [tabValue, setTabValue] = useState(0);
  const [products, setProducts] = useState([]);

  const [selectedProduct] = products?.filter((val) => val?.product_id == id);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // setLoading(true);
        const res = await getProducts();
        // dispatch(insertAllProductList(res))

        setProducts(res);
      } catch (err) {
        console.error("❌ Failed to fetch products", err);
      } finally {
        // setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  console.log("selectedProduct", selectedProduct);

  const productImages = [
    `${import.meta.env.VITE_BACKEND_API}/uploads/${selectedProduct?.images[0]?.filename}`,
    `${import.meta.env.VITE_BACKEND_API}/uploads/${selectedProduct?.images[1]?.filename}`,
    `${import.meta.env.VITE_BACKEND_API}/uploads/${selectedProduct?.images[2]?.filename}`,
    `${import.meta.env.VITE_BACKEND_API}/uploads/${selectedProduct?.images[3]?.filename}`,
    // "/images/Product2.jpg",
    // "/images/Product3.jpg",
    // "/images/Product4.jpg",
  ];

  const product = {
    productName: 'Premium Navy Wool Suiting Fabric',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewCount: 127,
    fabric: 'Italian Wool Blend',
    weight: '280gsm',
    width: '58 inches',
    composition: '70% Wool, 25% Polyester, 5% Elastane',
    description: 'Luxurious Italian wool blend fabric perfect for tailored suits and formal wear. Features a smooth finish with excellent drape and wrinkle resistance.',
    features: [
      'Premium Italian wool blend',
      'Wrinkle resistant finish',
      'Excellent drape and structure',
      'Suitable for year-round wear',
      'Machine washable',
    ],
  };

  const reviews = [
    {
      name: 'Michael Johnson',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Excellent quality fabric. Perfect for my custom suit. The texture and feel are amazing.',
      avatar: 'M',
    },
    {
      name: 'David Smith',
      rating: 4,
      date: '1 month ago',
      comment: 'Great fabric, nice weight and drape. Delivery was quick and packaging was perfect.',
      avatar: 'D',
    },
  ];


  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Product Images */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ mb: 2 }}>
            <CardMedia
              component="img"
              image={productImages[selectedImage]}
              alt={product.name}
              sx={{
                objectFit: 'cover',
                height: { xs: 500, sm: 700 }, // responsive height
              }}
            />

          </Card>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {productImages.map((image, index) => (
              <Box key={index} sx={{ flex: 1 }}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border: selectedImage === index ? '2px solid' : 'none',
                    borderColor: selectedImage === index ? 'primary.main' : 'transparent',
                  }}
                  onClick={() => setSelectedImage(index)}
                >
                  <CardMedia
                    component="img"
                    height="80"
                    image={image}
                    alt={`Fabric view ${index + 1}`}
                    sx={{ objectFit: 'cover' }}
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
              {product.productName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.1} readOnly size="small" />
              <Typography variant="body2" color={theme.palette.primary.lightmain} sx={{ ml: 1 }}>
                ({product.reviewCount} reviews)
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" color={theme.palette.primary.main} component="span" sx={{ fontWeight: 600, fontFamily: theme.palette.typography.fontFamily }}>
              ₹{product.price}
            </Typography>
            <Typography
              variant="body1"
              color={theme.palette.primary.lightmain}
              component="span"
              sx={{ ml: 2, textDecoration: 'line-through', fontFamily: theme.palette.typography.fontFamily }}
            >
              ₹{product.originalPrice}
            </Typography>
            <Chip label="25% OFF" color="error" size="small" sx={{ ml: 2, fontFamily: theme.palette.typography.fontFamily }} />
          </Box>

          <Typography variant="body2" paragraph color={theme.palette.primary.lightmain} sx={{ fontFamily: theme.palette.typography.fontFamily }}>
            {product.description}
          </Typography>

          {/* Fabric Specifications */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main, mb: 1 }}>
              Specifications
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color={theme.palette.primary.main} sx={{ fontFamily: theme.palette.typography.fontFamily }}>Fabric:</Typography>
                <Typography variant="body2" color={theme.palette.primary.lightmain} sx={{ fontFamily: theme.palette.typography.fontFamily }}>{product.fabric}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color={theme.palette.primary.main} sx={{ fontFamily: theme.palette.typography.fontFamily }}>Weight:</Typography>
                <Typography variant="body2" color={theme.palette.primary.lightmain} sx={{ fontFamily: theme.palette.typography.fontFamily }}>{product.weight}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color={theme.palette.primary.main} sx={{ fontFamily: theme.palette.typography.fontFamily }}>Width:</Typography>
                <Typography variant="body2" color={theme.palette.primary.lightmain} sx={{ fontFamily: theme.palette.typography.fontFamily }}>{product.width}</Typography>
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
              fullWidth
              startIcon={<ShoppingCart />}
            //   sx={{ mb: 2 }}
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

        <TabPanel value={tabValue} index={0}>
          <List>
            {product.features.map((feature, index) => (
              <ListItem key={index}>
                <ListItemText primary={feature} sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.lightmain }} />
              </ListItem>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {reviews?.map((review, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ mr: 2 }}>{review.avatar}</Avatar>
                <Box>
                  <Typography variant="subtitle1" color={theme.palette.primary.main} sx={{ fontFamily: theme.palette.typography.fontFamily }}>{review.name}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating value={review.rating} size="small" readOnly />
                    <Typography variant="body2" color={theme.palette.primary.lightmain} sx={{ ml: 1, fontFamily: theme.palette.typography.fontFamily }}>
                      {review.date}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.lightmain }}>{review.comment}</Typography>
              {index < reviews.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="body1" paragraph sx={{ color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily }}>
            <strong>Washing Instructions:</strong>
          </Typography>
          <List>
            <ListItem>
              <ListItemText sx={{ color: theme.palette.primary.lightmain, fontFamily: theme.palette.typography.fontFamily }} primary="Machine wash cold water (30°C max)" />
            </ListItem>
            <ListItem>
              <ListItemText sx={{ color: theme.palette.primary.lightmain, fontFamily: theme.palette.typography.fontFamily }} primary="Use mild detergent, no bleach" />
            </ListItem>
            <ListItem>
              <ListItemText sx={{ color: theme.palette.primary.lightmain, fontFamily: theme.palette.typography.fontFamily }} primary="Tumble dry low or hang to dry" />
            </ListItem>
            <ListItem>
              <ListItemText sx={{ color: theme.palette.primary.lightmain, fontFamily: theme.palette.typography.fontFamily }} primary="Iron on low heat if needed" />
            </ListItem>
            <ListItem>
              <ListItemText sx={{ color: theme.palette.primary.lightmain, fontFamily: theme.palette.typography.fontFamily }} primary="Professional dry cleaning recommended for best results" />
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