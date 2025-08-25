import React from "react";
import { Box, Grid, Typography, IconButton, Link, Divider, Container } from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube, Email, Phone } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        // backgroundColor: theme.palette.primary.maindark,
        color: "#fff",
        mt: 5,
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Logo + About */}
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" alignItems="center" mb={2}>
              <img src="/images/LZEBRA_LOGO.png" alt="Logo" />
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Your trusted store for premium fabrics with fast delivery,
              secure payments, and hassle-free returns.
            </Typography>
            <Box mt={2}>
              <IconButton href="#" sx={{ color: "#fff" }}>
                <Facebook />
              </IconButton>
              <IconButton href="#" sx={{ color: "#fff" }}>
                <Twitter />
              </IconButton>
              <IconButton href="#" sx={{ color: "#fff" }}>
                <Instagram />
              </IconButton>
              <IconButton href="#" sx={{ color: "#fff" }}>
                <YouTube />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="#" color="inherit" underline="hover" display="block">
                Home
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block">
                Shop
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block">
                About Us
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block">
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={6} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Customer Service
            </Typography>
            <Box>
              <Link href="#" color="inherit" underline="hover" display="block">
                FAQs
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block">
                Shipping
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block">
                Returns
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block">
                Privacy Policy
              </Link>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={12} md={5}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <Phone sx={{ mr: 1 }} /> 
              <Typography variant="body2">+91 98765 43210</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Email sx={{ mr: 1 }} /> 
              <Typography variant="body2">support@example.com</Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, backgroundColor: "rgba(255,255,255,0.3)" }} />

        {/* Bottom Section */}
        <Box textAlign="center">
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} Example.com | All Rights Reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
