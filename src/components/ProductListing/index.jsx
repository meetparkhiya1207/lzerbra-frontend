import React, { useCallback, useMemo, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  useTheme,
  Container,
  Pagination,
} from "@mui/material";
import { ProductFilters } from "./product-filters";
import { ProductSort } from "./product-sort";
import { ProductItem } from "./product-item";

const GENDER_OPTIONS = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'kids', label: 'Kids' },
];

const PRICE_OPTIONS = [
  { value: '250', label: 'Below ₹250' },
  { value: '250-750', label: 'Between ₹250 - ₹750' },
  { value: '750', label: 'Above ₹750' },
];
const products = [
  {
    id: 1,
    productid: "P001",
    productname: "Striped Line Cotton Fabric",
    category: "Cotton Fabric",
    subcategory: "Line Cotton",
    price: 1200,
    discountprice: 900,
    pantmeter: 2.2,
    shirtmeter: 1.6,
    rating: 4.5,
    instock: true,
    image: "/images/Slider1.jpg"
  },
  {
    id: 2,
    productid: "P002",
    productname: "Classic Plain Cotton Fabric",
    category: "Cotton Fabric",
    subcategory: "Plain Cotton",
    price: 1400,
    discountprice: 1000,
    pantmeter: 2.3,
    shirtmeter: 1.7,
    rating: 4.2,
    instock: true,
    image: "/images/Slider2.jpg"
  },
  {
    id: 3,
    productid: "P003",
    productname: "Soft Touch Linen Fabric",
    category: "Linen Fabric",
    subcategory: "Soft Linen",
    price: 1800,
    discountprice: 1350,
    pantmeter: 2.4,
    shirtmeter: 1.8,
    rating: 4.7,
    instock: true,
    image: "/images/Slider1.jpg"
  },
  {
    id: 4,
    productid: "P004",
    productname: "Elegant Pure Silk Fabric",
    category: "Silk Fabric",
    subcategory: "Pure Silk",
    price: 249,
    discountprice: 2000,
    pantmeter: 2.0,
    shirtmeter: 1.5,
    rating: 4.8,
    instock: false,
    image: "/images/Slider2.jpg"
  },
  {
    id: 5,
    productid: "P005",
    productname: "Printed Cotton Dress Fabric",
    category: "Cotton Fabric",
    subcategory: "Printed Cotton",
    price: 500,
    discountprice: 1200,
    pantmeter: 2.1,
    shirtmeter: 1.6,
    rating: 4.1,
    instock: true,
    image: "/images/Slider1.jpg"
  },
  {
    id: 6,
    productid: "P006",
    productname: "Premium Linen Suit Fabric",
    category: "Linen Fabric",
    subcategory: "Premium Linen",
    price: 240,
    discountprice: 1500,
    pantmeter: 2.2,
    shirtmeter: 1.7,
    rating: 4.4,
    instock: true,
    image: "/images/Slider2.jpg"
  },
  {
    id: 7,
    productid: "P007",
    productname: "Traditional Khadi Cotton Fabric",
    category: "Cotton Fabric",
    subcategory: "Khadi Cotton",
    price: 450,
    discountprice: 950,
    pantmeter: 2.3,
    shirtmeter: 1.5,
    rating: 3.9,
    instock: false,
    image: "/images/Slider1.jpg"
  },
  {
    id: 8,
    productid: "P008",
    productname: "Royal Banarasi Silk Fabric",
    category: "Silk Fabric",
    subcategory: "Banarasi Silk",
    price: 3000,
    discountprice: 2400,
    pantmeter: 2.0,
    shirtmeter: 1.4,
    rating: 4.9,
    instock: true,
    image: "/images/Slider2.jpg"
  },
  {
    id: 9,
    productid: "P009",
    productname: "Organic Cotton Fabric",
    category: "Cotton Fabric",
    subcategory: "Organic Cotton",
    price: 1500,
    discountprice: 1100,
    pantmeter: 2.1,
    shirtmeter: 1.6,
    rating: 4.3,
    instock: true,
    image: "/images/Slider1.jpg"
  },
  {
    id: 10,
    productid: "P010",
    productname: "Casual Wear Linen Fabric",
    category: "Linen Fabric",
    subcategory: "Casual Linen",
    price: 1700,
    discountprice: 1300,
    pantmeter: 2.4,
    shirtmeter: 1.8,
    rating: 4.0,
    instock: true,
    image: "/images/Slider2.jpg"
  }
]
  ;

const getUniqueValues = (array, key) => {
  return [...new Set(array.map((item) => item[key]))];
};

// Generate Options
const CATEGORY_OPTIONS = getUniqueValues(products, "category").map((cat) => ({
  value: cat,
  label: cat,
}));

const SUBCATEGORY_OPTIONS = getUniqueValues(products, "subcategory").map(
  (sub) => ({
    value: sub,
    label: sub,
  })
);

const defaultFilters = {
  price: "",
  category: [],
  subcategory: [],
};

const PRODUCTS_PER_PAGE = 4;

const ProductListing = () => {
  const theme = useTheme();
  const [sortBy, setSortBy] = useState('featured');

  const [openFilter, setOpenFilter] = useState(false);

  const [filters, setFilters] = useState(defaultFilters);
  console.log("filtersfilters", filters);

  const [page, setPage] = useState(1);

  const handleOpenFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  const handleSort = useCallback((newSort) => {
    setSortBy(newSort);
  }, []);

  const handleSetFilters = useCallback((updateState) => {
    console.log("updateState", updateState);

    setFilters((prevValue) => ({ ...prevValue, ...updateState }));
  }, []);

  const canReset = Object.keys(filters).some(
    (key) => filters[key] !== defaultFilters[key]
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };


  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const hasCategory = filters.category.length > 0;
      const hasSubcategory = filters.subcategory.length > 0;
      const hasPrice = !!filters.price;

      const matchCategory = hasCategory ? filters.category.includes(p.category) : false;
      const matchSubcategory = hasSubcategory ? filters.subcategory.includes(p.subcategory) : false;

      // Price logic
      let matchPrice = true;
      if (hasPrice && filters.price.includes("-")) {
        const [min, max] = filters.price.split("-").map(Number);
        matchPrice = p.price >= min && p.price <= max;
      } else {
        if (filters.price === "250") {
          matchPrice = p.price < 250;
        } else if (filters.price === "750") {
          matchPrice = p.price > 750;
        }
      }

      // CATEGORY + SUBCATEGORY Logic
      if (hasCategory && hasSubcategory) {
        return (matchCategory || matchSubcategory) && matchPrice;
      }

      if (hasCategory && !hasSubcategory) {
        return matchCategory && matchPrice;
      }

      if (!hasCategory && hasSubcategory) {
        return matchSubcategory && matchPrice;
      }

      // koi filter na hoy to price match check thase
      return matchPrice;
    });
  }, [filters]);


  console.log("filteredProducts", filteredProducts);

  const startIdx = (page - 1) * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIdx, endIdx);
  const pageCount = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  return (
    <>
      <Container maxWidth="xl" >
        <Box sx={{ py: 10 }}>
          <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily, textAlign: 'center', }}>
            Our Products
          </Typography>
          <Box
            sx={{
              width: 140,
              height: 3,
              backgroundColor: theme.palette.primary.maindark,
              mx: "auto",
              borderRadius: 2,
              mb: 5
            }}
          />
          <Box
            sx={{
              mb: 5,
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap-reverse',
              justifyContent: 'flex-end',
            }}
          >
            <Box
              sx={{
                my: 1,
                gap: 1,
                flexShrink: 0,
                display: 'flex',
              }}
            >
              <ProductFilters
                canReset={canReset}
                filters={filters}
                onSetFilters={handleSetFilters}
                openFilter={openFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
                onResetFilter={() => setFilters(defaultFilters)}
                options={{
                  categories: CATEGORY_OPTIONS,
                  subcategories: SUBCATEGORY_OPTIONS,
                  price: PRICE_OPTIONS,
                }}
              />

              <ProductSort
                sortBy={sortBy}
                onSort={handleSort}
                options={[
                  { value: 'featured', label: 'Featured' },
                  { value: 'newest', label: 'Newest' },
                  { value: 'priceDesc', label: 'Price: High-Low' },
                  { value: 'priceAsc', label: 'Price: Low-High' },
                ]}
              />
            </Box>
          </Box>

          <Grid container spacing={3}>
            {paginatedProducts.map((product) => (
              <Grid key={product?.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <ProductItem product={product} />
              </Grid>
            ))}
          </Grid>

          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{ mt: 8, mx: 'auto', display: 'flex', justifyContent: 'center' }}
          />
        </Box>
      </Container>
    </>
  );
};

export default ProductListing;
