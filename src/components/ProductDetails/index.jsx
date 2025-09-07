import React, { useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { ProductInfo } from "./ProductInfo";
import { ProductImages } from "./ProductImages";
import { Close as CloseIcon } from '@mui/icons-material';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
};

export default function ProductDetailsPage({product, isOpen, onClose}) {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  }
  console.log("isOpenisOpen", isOpen);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: '500px',
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
        }}
      >
        <Typography variant="h5" component="div" fontWeight={600} sx={{fontFamily: theme.palette.typography.fontFamily}}>
          Product Details
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="product details tabs"
            variant="fullWidth"
          >
            <Tab label="Details" id="product-tab-0" aria-controls="product-tabpanel-0" sx={{fontFamily: theme.palette.typography.fontFamily}}/>
            <Tab label="Images" id="product-tab-1" aria-controls="product-tabpanel-1" sx={{fontFamily: theme.palette.typography.fontFamily}}/>
          </Tabs>
        </Box>

        <Box sx={{ minHeight: '300px' }}>
          <TabPanel value={tabValue} index={0}>
            <ProductInfo product={product} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ProductImages images={product?.images} productName={product?.productName} />
          </TabPanel>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button onClick={onClose} variant="outlined"
          sx={{ border: "1px solid #5A3A1B", color: "#5A3A1B" , fontFamily: theme.palette.typography.fontFamily}}>
          Close
        </Button>
        <Button variant="contained" sx={{ bgcolor: "#5A3A1B", color: "#fff", fontFamily: theme.palette.typography.fontFamily }}>
          Add to Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
}
