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
    CircularProgress,
} from '@mui/material';
import { Home, FilterList } from '@mui/icons-material';
import ProductCard from '../../comman/ProductCard';
import FilterSidebar from '../../comman/FilterSidebar/FilterSidebar';
import { MenuIcon, SearchIcon } from 'lucide-react';
import { getAllProducts } from '../../hooks/useProducts';

const Shop = () => {

    // Api Calling
    const { products, isLoading, isError } = getAllProducts();

    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('price-high');
    const [cartItemCount, setCartItemCount] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [filters, setFilters] = useState({
        category: [],
        priceRange: [0, 200000],
        rating: 0,
        inStock: false,
    });


    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = (products || []).filter(product => {
            if (searchQuery && !product.productName?.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }

            if (filters?.category?.length > 0 && !filters.category.includes(product.category)) {
                return false;
            }

            return true;
        });

        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'newest':
                    return 0;
                default:
                    return b.reviewCount - a.reviewCount;
            }
        });
        return filtered;
    }, [searchQuery, sortBy, filters, products]);


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
                    category: filters.category?.filter(c => c !== value),
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
    console.log("filteredAndSortedProductsfilteredAndSortedProducts", filteredAndSortedProducts);

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.backgroundcolor.main }}>
            <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3 } }}>

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
                        {(filters?.category?.length > 0 || filters?.rating > 0 || filters?.priceRange[0] > 0 || filters?.priceRange[1] < 200000) && (
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" sx={{
                                    mb: 1, fontFamily: theme.palette.typography.fontFamily,
                                    color: theme.palette.primary.main
                                }}>
                                    Active Filters:
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {filters?.category?.map(category => (
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
                                            sx={{
                                                fontFamily: theme.palette.typography.fontFamily,
                                                color: theme.palette.primary.main
                                            }}
                                        />
                                    )}
                                    {(filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) && (
                                        <Chip
                                            label={`₹${(filters.priceRange[0]).toFixed(0)} - ₹${(filters.priceRange[1]).toFixed(0)}`}
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
                                Showing {filteredAndSortedProducts?.length} results
                                {searchQuery && ` for "${searchQuery}"`}
                            </Typography>
                            <Box sx={{ display: "flex", gap: { xs: 4, sm: 2 }, flexDirection: { xs: 'column', sm: 'row' }, width: { xs: "100%", sm: "60%" } }}>

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
                            {isLoading && (
                                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                                    <CircularProgress />
                                </Box>
                            )}

                            {!isLoading && filteredAndSortedProducts?.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={handleAddToCart}
                                    onAddToWishlist={handleAddToWishlist}
                                />
                            ))}
                        </Box>

                        {!isLoading && filteredAndSortedProducts?.length === 0 && (
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
                                    sx={{
                                        color: theme.palette.primary.lightmain,
                                        textAlign: "center",
                                        fontFamily: theme.palette.typography.fontFamily,
                                    }}
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