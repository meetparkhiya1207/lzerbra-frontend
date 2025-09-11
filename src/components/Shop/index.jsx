import React, { useState, useMemo, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Chip,
    Snackbar,
    Alert,
    Breadcrumbs,
    Link,
    useMediaQuery,
    useTheme,
    Fab,
    IconButton,
    styled,
    InputBase,
    alpha,
    TextField,
    InputAdornment,
} from '@mui/material';
import { Home, FilterList } from '@mui/icons-material';
import ProductCard from '../../comman/ProductCard';
import FilterSidebar from '../../comman/FilterSidebar/FilterSidebar';
import { MenuIcon, SearchIcon } from 'lucide-react';
import { getProducts } from '../../api/productApi';

// Sample product data
const sampleProducts = [
    {
        id: '1',
        name: 'Premium Smartphone - Latest Model with Advanced Camera',
        price: 45999,
        originalPrice: 54999,
        image: "/images/Product1.jpg",
        rating: 4.5,
        reviewCount: 1234,
        discount: 16,
        category: 'Electronics',
        inStock: true,
    },
    {
        id: '2',
        name: 'Wireless Bluetooth Headphones - Premium Sound Quality',
        price: 12999,
        originalPrice: 16999,
        image: "/images/Product2.jpg",
        rating: 4.3,
        reviewCount: 856,
        discount: 24,
        category: 'Audio',
        inStock: true,
    },
    {
        id: '3',
        name: 'Gaming Laptop - High Performance with RGB Keyboard',
        price: 89999,
        originalPrice: 109999,
        image: "/images/Product3.jpg",
        rating: 4.7,
        reviewCount: 542,
        discount: 18,
        category: 'Computers',
        inStock: true,
    },
    {
        id: '4',
        name: 'Smart Watch with Fitness Tracking and Health Monitor',
        price: 8999,
        originalPrice: 12999,
        image: "/images/Product4.jpg",
        rating: 4.2,
        reviewCount: 2156,
        discount: 31,
        category: 'Electronics',
        inStock: true,
    },
    {
        id: '5',
        name: 'Professional DSLR Camera with Telephoto Lens',
        price: 65999,
        originalPrice: 79999,
        image: "/images/Product5.jpg",
        rating: 4.8,
        reviewCount: 389,
        discount: 18,
        category: 'Cameras',
        inStock: false,
    },
    {
        id: '6',
        name: 'Ergonomic Gaming Chair with Lumbar Support',
        price: 15999,
        originalPrice: 19999,
        image: "/images/Product1.jpg",
        rating: 4.4,
        reviewCount: 678,
        discount: 20,
        category: 'Gaming',
        inStock: true,
    },
];

const Shop = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('popularity');
    const [cartItemCount, setCartItemCount] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [filters, setFilters] = useState({
        categories: [],
        priceRange: [0, 200000],
        rating: 0,
        inStock: false,
    });

      // ✅ Hooks inside component
  const [products, setProducts] = useState([]);
  console.log("productsproducts",products);
  

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        // dispatch(insertAllProductList(res))

        setProducts(res);
      } catch (err) {
        console.error("❌ Failed to fetch products", err);
      } finally {
      }
    };
    fetchProducts();
  }, []);

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products.filter(product => {
            // Search filter
            if (searchQuery && !product.productName.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }

            // Category filter
            if (filters.categories.length > 0 && !filters.category.includes(product.category)) {
                return false;
            }

            // Price filter
            // if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
            //     return false;
            // }

            // // Rating filter
            // if (product.rating < filters.rating) {
            //     return false;
            // }

            // // Stock filter
            // if (filters.inStock && !product.inStock) {
            //     return false;
            // }

            return true;
        });

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'newest':
                    return 0; // Would sort by date in real app
                default:
                    return b.reviewCount - a.reviewCount; // popularity
            }
        });

        return filtered;
    }, [searchQuery, sortBy, filters]);

    const handleAddToCart = (product) => {
        setCartItemCount(prev => prev + 1);
        setSnackbar({
            open: true,
            message: `${product.name} added to cart!`,
            severity: 'success',
        });
    };

    const handleAddToWishlist = (product) => {
        setSnackbar({
            open: true,
            message: `${product.name} added to wishlist!`,
            severity: 'success',
        });
    };

    const clearFilter = (filterType, value) => {
        switch (filterType) {
            case 'category':
                setFilters({
                    ...filters,
                    categories: filters.categories.filter(c => c !== value),
                });
                break;
            case 'price':
                setFilters({ ...filters, priceRange: [0, 200000] });
                break;
            case 'rating':
                setFilters({ ...filters, rating: 0 });
                break;
        }
    };

    const toggleFilterDrawer = () => {
        setFilterDrawerOpen(!filterDrawerOpen);
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.backgroundcolor.main }}>
            <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3 } }}>
                {/* Breadcrumbs */}
                {/* <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2, display: { xs: 'none', sm: 'flex' } }}>
                    <Link color="inherit" href="/" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                        Home
                    </Link>
                    <Typography color="text.primary">Shop</Typography>
                </Breadcrumbs> */}

                <Box sx={{ display: 'flex', gap: { xs: 0, md: 3 } }}>
                    {/* Desktop Sidebar Filters */}
                    {!isMobile && (
                        <Box sx={{ width: 300, flexShrink: 0 }}>
                            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
                        </Box>
                    )}

                    {/* Mobile Filter Drawer */}
                    {isMobile && (
                        <FilterSidebar
                            filters={filters}
                            onFiltersChange={setFilters}
                            // open={true}
                            open={filterDrawerOpen}
                            onClose={toggleFilterDrawer}
                        />
                    )}

                    {/* Main Content */}
                    <Box sx={{ flexGrow: 1 }}>
                        {/* Active Filters */}
                        {(filters.categories.length > 0 || filters.rating > 0 || filters.priceRange[0] > 0 || filters.priceRange[1] < 200000) && (
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    Active Filters:
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {filters.categories.map(category => (
                                        <Chip
                                            key={category}
                                            label={category}
                                            size="small"
                                            onDelete={() => clearFilter('category', category)}
                                        />
                                    ))}
                                    {filters.rating > 0 && (
                                        <Chip
                                            label={`Rating: ${filters.rating}+`}
                                            size="small"
                                            onDelete={() => clearFilter('rating')}
                                        />
                                    )}
                                    {(filters.priceRange[0] > 0 || filters.priceRange[1] < 200000) && (
                                        <Chip
                                            label={`₹${(filters.priceRange[0] / 1000).toFixed(0)}K - ₹${(filters.priceRange[1] / 1000).toFixed(0)}K`}
                                            size="small"
                                            onDelete={() => clearFilter('price')}
                                        />
                                    )}
                                </Box>
                            </Box>
                        )}

                        {/* Sort and Results Count */}
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: { xs: 2, sm: 3 },
                            p: { xs: 1.5, sm: 2 },
                            borderRadius: 1,
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: { xs: 2, sm: 0 },
                            boxSizing: "border-box"
                        }}>
                            <Typography variant="body1" sx={{
                                fontSize: { xs: '0.9rem', sm: '1rem' }, fontFamily: theme.palette.typography.fontFamily,
                                color: theme.palette.primary.main
                            }}>
                                Showing {products.length} results
                                {searchQuery && ` for "${searchQuery}"`}
                            </Typography>
                            <Box sx={{ display: "flex", gap: {xs:4, sm:2}, flexDirection: { xs: 'column', sm: 'row' }, width: { xs: "100%", sm: "60%" } }}>

                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Search Peoduct"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    size="small"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon color={theme.palette.primary.main} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {/* <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    width:"100%",
                                    gap: 1.5, // 👈 spacing between icon and select
                                    }}
                                    > */}
                                {/* {isMobile && (
                                    <IconButton
                                    size="small"
                                    color={"primary"}
                                    onClick={toggleFilterDrawer}
                                    sx={{ display: { xs: 'inline-flex', md: 'none' } }}
                                    >
                                    <MenuIcon size={20} />
                                    </IconButton>
                                    )} */}

                                <FormControl
                                    size="small"
                                    sx={{ minWidth: { xs: '100%', sm: 150 } }}
                                >
                                    <InputLabel
                                        sx={{
                                            fontFamily: theme.palette.typography.fontFamily,
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        Sort by
                                    </InputLabel>
                                    <Select
                                        value={sortBy}
                                        label="Sort by"
                                        sx={{
                                            fontFamily: theme.palette.typography.fontFamily,
                                            color: theme.palette.primary.main,
                                        }}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <MenuItem value="popularity">Popularity</MenuItem>
                                        <MenuItem value="price-low">Price: Low to High</MenuItem>
                                        <MenuItem value="price-high">Price: High to Low</MenuItem>
                                        <MenuItem value="rating">Customer Rating</MenuItem>
                                        <MenuItem value="newest">Newest First</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            {/* </Box> */}


                        </Box>

                        {/* Products Grid */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: 'repeat(2, 1fr)',
                                    sm: 'repeat(2, 1fr)',
                                    md: 'repeat(3, 1fr)',
                                    lg: 'repeat(4, 1fr)',
                                    xl: 'repeat(4, 1fr)',
                                },
                                gap: { xs: 1, sm: 2 },
                            }}
                        >
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={handleAddToCart}
                                    onAddToWishlist={handleAddToWishlist}
                                />
                            ))}
                        </Box>

                        {products.length === 0 && (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mt: 5,
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/images/package.png"
                                    alt="No Products"
                                    sx={{ width: { xs: 100, sm: 200 }, height: "auto", mb: 2, opacity: 0.7 }}
                                />
                                <Typography
                                    variant="h6"
                                    sx={{ color: theme.palette.primary.lightmain, textAlign: "center", fontFamily: theme.palette.typography.fontFamily, }}
                                >
                                    No Products Found
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>

                {/* Mobile Filter Fab */}
                {isMobile && (
                    <Fab
                        color="primary"
                        aria-label="filter"
                        onClick={toggleFilterDrawer}
                        sx={{
                            position: 'fixed',
                            bottom: 16,
                            right: 16,
                            zIndex: 1000,
                        }}
                    >
                        <FilterList />
                    </Fab>
                )}
            </Container>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Shop;