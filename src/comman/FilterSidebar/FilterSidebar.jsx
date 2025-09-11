import React from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Slider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Rating,
    Divider,
    Drawer,
    IconButton,
    useMediaQuery,
    useTheme,
    Button,
} from '@mui/material';
import { ExpandMore, Close as CloseIcon, FilterList } from '@mui/icons-material';

const category = [
    'Electronics',
    'Computers',
    'Audio',
    'Cameras',
    'Gaming',
    'Accessories',
];

const FilterContent = ({ filters, onFiltersChange, isMobile = false }) => {
    const theme = useTheme();
    const handleCategoryChange = (category, checked) => {
        const newcategory = checked
            ? [...filters.category, category]
            : filters.category.filter(c => c !== category);

        onFiltersChange({
            ...filters,
            category: newcategory,
        });
    };

    const handlePriceChange = (event, newValue) => {
        onFiltersChange({
            ...filters,
            priceRange: newValue,
        });
    };

    const handleRatingChange = (event, newValue) => {
        onFiltersChange({
            ...filters,
            rating: newValue || 0,
        });
    };

    const handleStockChange = (event) => {
        onFiltersChange({
            ...filters,
            inStock: event.target.checked,
        });
    };

    const clearAllFilters = () => {
        onFiltersChange({
            category: [],
            priceRange: [0, 200000],
            rating: 0,
            inStock: false,
        });
    };

    return (
        <Box sx={{
            width: isMobile ? '90%' : 280,
            p: 2,
            backgroundColor: isMobile ? 'white' : "transparent",
            height: isMobile ? 'auto' : 'fit-content',
            maxHeight: isMobile ? 'calc(100vh - 120px)' : 'none',
            overflowY: isMobile ? 'auto' : 'visible',
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                    Filters
                </Typography>
                {isMobile && (
                    <Button
                        size="small"
                        onClick={clearAllFilters}
                        sx={{
                            textTransform: 'none', fontFamily: theme.palette.typography.fontFamily,
                            color: theme.palette.primary.main
                        }}
                    >
                        Clear All
                    </Button>
                )}
            </Box>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="subtitle1" fontWeight={600} sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                        Category
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        {category.map((category) => (
                            <FormControlLabel
                                key={category}
                                sx={{ mb: 0.5, fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.lightmain }}
                                control={
                                    <Checkbox
                                        sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}
                                        checked={filters.category.includes(category)}
                                        onChange={(e) => handleCategoryChange(category, e.target.checked)}
                                        size="small"
                                    />
                                }
                                label={category}
                            />
                        ))}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="subtitle1" fontWeight={600} sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                        Price Range
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ px: 1 }}>
                        <Slider
                            value={filters.priceRange}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={200000}
                            step={1000}
                            marks={[
                                { value: 0, label: '₹0' },
                                { value: 50000, label: '₹50K' },
                                { value: 100000, label: '₹1L' },
                                { value: 200000, label: '₹2L' },
                            ]}
                            valueLabelFormat={(value) => `₹${(value / 1000).toFixed(0)}K`}
                            sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="subtitle1" fontWeight={600} sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                        Rating
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                            Minimum Rating
                        </Typography>
                        <Rating
                            value={filters.rating}
                            onChange={handleRatingChange}
                            precision={1}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Divider sx={{ my: 2 }} />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={filters.inStock}
                        onChange={handleStockChange}
                        sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.lightmain }}
                    />
                }
                sx={{ fontFamily: `${theme.palette.typography.fontFamily} !important`, color: theme.palette.primary.main }}
                label="In Stock Only"
            />
        </Box>
    );
};

const FilterSidebar = ({
    filters,
    onFiltersChange,
    open = false,
    onClose
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    if (isMobile) {
        return (
            <Drawer
                anchor="left"
                open={open}
                onClose={onClose}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: '85%',
                        maxWidth: 320,
                    },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FilterList />
                        <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.main }}>
                            Filters
                        </Typography>
                    </Box>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <FilterContent
                    filters={filters}
                    onFiltersChange={onFiltersChange}
                    isMobile={true}
                />
            </Drawer>
        );
    }

    return (
        <FilterContent filters={filters} onFiltersChange={onFiltersChange} />
    );
};

export default FilterSidebar;