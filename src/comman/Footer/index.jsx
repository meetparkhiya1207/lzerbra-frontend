import React from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  TextField,
  Button,
  IconButton,
  useTheme,
  Container,
} from "@mui/material";
import {
  Phone,
  Mail,
  MessageCircle,
  Shield,
  Truck,
  Award,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  CreditCard,
  Lock,
} from "lucide-react";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.backgroundcolor.main ,
        color: theme.palette.text.primary,
        pt: 8,
        pb: 4,

      }}
    >
      <Container maxWidth="xl">
        {/* Main Content */}
        <Box sx={{ px: { xs: 0, md: 6 } }}>
          <Grid container spacing={6}>
            {/* Brand Section */}
            <Grid item xs={12} md={6} lg={3}>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ color: theme.palette.primary.main, mb: 2, fontFamily: theme.palette.typography.fontFamily }}
              >
                Lzebra
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.lightmain, mb: 3, fontFamily: theme.palette.typography.fontFamily }}
              >
                Premium men's fabrics crafted with elegance, and quality comfort.
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Phone size={16} color={theme.palette.primary.main} sx={{ fontFamily: theme.palette.typography.fontFamily }} />
                <Typography variant="body2" sx={{ ml: 1, fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.lightmain }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1, fontFamily: theme.palette.typography.fontFamily }}>
                <Mail size={16} color={theme.palette.primary.main} />
                <Typography variant="body2" sx={{ ml: 1, fontFamily: theme.palette.typography.fontFamily, color: theme.palette.primary.lightmain }}>
                  hello@fabriccraft.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", fontFamily: theme.palette.typography.fontFamily }}>
                <MessageCircle size={16} color={theme.palette.primary.main} />
                <Button
                  variant="text"
                  sx={{
                    ml: 1,
                    fontSize: "0.85rem",
                    fontFamily: theme.palette.typography.fontFamily,
                    color: theme.palette.primary.lightmain,
                    "&:hover": { color: theme.palette.primary.main },
                  }}
                >
                  Live Chat Support
                </Button>
              </Box>
            </Grid>

            {/* Shop Links */}
            <Grid item xs={12} md={6} lg={3}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: theme.palette.primary.main, mb: 2, fontFamily: theme.palette.typography.fontFamily }}
              >
                Shop
              </Typography>
              {[
                "Premium Suits",
                "Dress Shirts",
                "Casual Wear",
                "Accessories",
                "New Arrivals",
                "Sale Items",
              ].map((item, i) => (
                <Typography
                  key={i}
                  component="a"
                  href="#"
                  variant="body2"
                  sx={{
                    display: "block",
                    color: theme.palette.primary.lightmain,
                    mb: 1,
                    textDecoration: "none",
                    fontFamily: theme.palette.typography.fontFamily,
                    "&:hover": { color: theme.palette.primary.main },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Grid>

            {/* Resources */}
            <Grid item xs={12} md={6} lg={3}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: theme.palette.primary.main, mb: 2, fontFamily: theme.palette.typography.fontFamily }}
              >
                Resources
              </Typography>
              {[
                "Fabric Care Guide",
                "Size Guide",
                "Tailoring Advice",
                "Style Tips",
                "About Us",
                "FAQs",
              ].map((item, i) => (
                <Typography
                  key={i}
                  component="a"
                  href="#"
                  variant="body2"
                  sx={{
                    display: "block",
                    color: theme.palette.primary.lightmain,
                    mb: 1,
                    textDecoration: "none",
                    fontFamily: theme.palette.typography.fontFamily,
                    "&:hover": { color: theme.palette.primary.main },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Grid>

            {/* Newsletter */}
            <Grid item xs={12} md={6} lg={3}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: theme.palette.primary.main, mb: 2, fontFamily: theme.palette.typography.fontFamily }}
              >
                Stay Connected
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.lightmain, mb: 2, fontFamily: theme.palette.typography.fontFamily }}
              >
                Get the latest fabric collections and styling tips delivered to
                your inbox.
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your email"
                variant="outlined"
                size="small"
                sx={{
                  mb: 2,
                  bgcolor: theme.palette.background.paper,
                  input: { color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily },

                }}
              />
              <Button
                variant="contained"
                sx={{
                  px: 2,
                  py: 1,
                  bgcolor: theme.palette.primary.main,
                  color: "#fff",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textTransform: "none",
                  fontFamily: theme.palette.typography.fontFamily,
                  mx: 'auto'
                }}
              >
                Subscribe to Newsletter
              </Button>

              {/* Social */}
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: theme.palette.primary.main, my: 2, fontFamily: theme.palette.typography.fontFamily }}
              >
                Follow Us
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                  <IconButton
                    key={i}
                    sx={{
                      bgcolor: theme.palette.background.default,
                      color: theme.palette.primary.lightmain,
                      "&:hover": {
                        bgcolor: theme.palette.primary.lightdark,
                        color: theme.palette.primary.navy,
                      },
                      fontFamily: theme.palette.typography.fontFamily
                    }}
                  >
                    <Icon size={22} />
                  </IconButton>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ bgcolor: theme.palette.divider, my: 3 }} />

        {/* Trust Elements */}
        {/* <Box sx={{ maxWidth: "lg", mx: "auto", px: { xs: 3, md: 6 }, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} textAlign="center">
            <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
              <Lock size={18} color={theme.palette.primary.gold} />
              <Typography sx={{ ml: 1, color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily }} variant="body2">
                Secure Shopping
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              SSL Encrypted
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} textAlign="center">
            <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
              <Truck size={18} color={theme.palette.primary.gold} />
              <Typography sx={{ ml: 1, color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily }} variant="body2">
                Free Shipping
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              On orders over $200
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} textAlign="center">
            <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
              <Award size={18} color={theme.palette.primary.gold} />
              <Typography sx={{ ml: 1, color: theme.palette.primary.main, fontFamily: theme.palette.typography.fontFamily }} variant="body2">
                Quality Guarantee
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: theme.palette.text.main, fontFamily: theme.palette.typography.fontFamily }}>
              30-day return policy
            </Typography>
          </Grid>
        </Grid>
      </Box> */}

        {/* <Divider sx={{ bgcolor: theme.palette.divider, mb: 3 }} /> */}

        {/* Bottom Bar */}
        <Box
          sx={{
            maxWidth: "xl",
            mx: "auto",
            px: { xs: 3, md: 6 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: theme.palette.primary.lightmain, fontFamily: theme.palette.typography.fontFamily }}>
            © {new Date().getFullYear()} Lzebra. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            {["Privacy Policy", "Terms of Service"].map(
              (item, i) => (
                <Typography
                  key={i}
                  component="a"
                  href="#"
                  variant="caption"
                  sx={{
                    color: theme.palette.primary.lightmain,
                    fontFamily: theme.palette.typography.fontFamily,
                    textDecoration: "none",
                    "&:hover": { color: theme.palette.primary.main },
                  }}
                >
                  {item}
                </Typography>
              )
            )}
          </Box>
        </Box>

      </Container>
    </Box>
  );
}
