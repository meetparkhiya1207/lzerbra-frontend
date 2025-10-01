import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { ProductFilters } from "./product-filters";
import { ProductSort } from "./product-sort";
import { ProductItem } from "./product-item";
import CommonHeading from "../../comman/CommonHeading";
import ProductCard from "../../comman/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../hooks/useProducts";
import { addAllProductData } from "../../features/products/productsSlice";

const PRICE_OPTIONS = [
  { value: '250', label: 'Below ₹250' },
  { value: '250-750', label: 'Between ₹250 - ₹750' },
  { value: '750', label: 'Above ₹750' },
];
const defaultFilters = {
  price: "",
  category: [],
  subcategory: [],
};

const PRODUCTS_PER_PAGE = 8;

const ProductListing = () => {
  const { productsList } = useSelector((state) => state.products);
  const { products, isLoading } = getAllProducts(productsList?.length === 0);

  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (products && productsList.length === 0) {
      dispatch(addAllProductData(products));
    }
  }, [products, productsList, dispatch]);

  const [sortBy, setSortBy] = useState("featured");
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [page, setPage] = useState(1);

  const getUniqueValues = (array, key) => {
    return [...new Set(array.map((item) => item[key]))];
  };

  const handleOpenFilter = () => setOpenFilter(true);
  const handleCloseFilter = () => setOpenFilter(false);
  const handleSort = (newSort) => setSortBy(newSort);
  const handleSetFilters = (updateState) =>
    setFilters((prevValue) => ({ ...prevValue, ...updateState }));

  const canReset = Object.keys(filters).some(
    (key) => filters[key] !== defaultFilters[key]
  );

  const handlePageChange = (event, value) => setPage(value);

  const filteredProducts = useMemo(() => {
    return productsList?.filter((p) => {
      const hasCategory = filters.category.length > 0;
      const hasSubcategory = filters.subcategory.length > 0;
      const hasPrice = !!filters.price;

      const matchCategory = hasCategory
        ? filters.category.includes(p.category)
        : false;
      const matchSubcategory = hasSubcategory
        ? filters.subcategory.includes(p.subcategory)
        : false;

      let matchPrice = true;
      if (hasPrice && filters.price.includes("-")) {
        const [min, max] = filters.price.split("-").map(Number);
        matchPrice = p.price >= min && p.price <= max;
      } else {
        if (filters.price === "250") matchPrice = p.price < 250;
        else if (filters.price === "750") matchPrice = p.price > 750;
      }

      if (hasCategory && hasSubcategory)
        return (matchCategory || matchSubcategory) && matchPrice;
      if (hasCategory && !hasSubcategory) return matchCategory && matchPrice;
      if (!hasCategory && hasSubcategory) return matchSubcategory && matchPrice;

      return matchPrice;
    });
  }, [productsList, filters]);

  const startIdx = (page - 1) * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts?.slice(startIdx, endIdx);
  const pageCount = Math.ceil(filteredProducts?.length / PRODUCTS_PER_PAGE);


  return (
    <>
      <Box sx={{backgroundColor: theme.palette.backgroundcolor.main}}>

        <Container maxWidth="xl" >
          <Box sx={{ py: { xs: 4, sm: 10 } }}>
            <CommonHeading
              title="Our Products"
              lineWidth={140}
              align="center"
            />
            {/* <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily, textAlign: 'center', }}>
            Our Products
          </Typography> */}
            {/* <Box
            sx={{
              width: 140,
              height: 3,
              backgroundColor: theme.palette.primary.maindark,
              mx: "auto",
              borderRadius: 2,
              mb: 5
            }}
          /> */}
            <Box
              sx={{
                mb: 5,
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap-reverse',
                justifyContent: 'flex-end',
              }}
            >
              {/* <Box
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
            </Box> */}
            </Box>

            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <CircularProgress />
              </Box>
            ) : paginatedProducts?.length === 0 ? (
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
            ) : (
              <Grid container spacing={3}>
                {paginatedProducts?.map((product) => (
                  <Grid key={product?.id} item size={{ xs: 6, sm: 6, md: 3 }}>
                    <ProductCard
                      product={product}
                    />

                  </Grid>
                ))}
              </Grid>
            )}


            < Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                mt: { xs: 4, sm: 6, md: 8 }, // spacing responsive
                mx: "auto",
                display: "flex",
                justifyContent: "center",
                "& .MuiPaginationItem-root": {
                  fontSize: { xs: "1rem", sm: "0.875rem", md: "1rem" },
                  minWidth: { xs: 30, sm: 32, md: 36 },
                  height: { xs: 30, sm: 32, md: 36 },
                  fontFamily: theme.palette.typography.fontFamily,
                },
              }}
            />
          </Box>
        </Container>
      </Box>

    </>
  );
};

export default ProductListing;
