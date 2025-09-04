import React, { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../comman/Header";
import HeroSection from "../../components/HeroSection";
import OfferSection from "../../components/OfferSection";
import ProductListing from "../../components/ProductListing";
import ServiceSection from "../../components/ServiceSection";
import Footer from "../../comman/Footer";
import CategorySlider from "../../components/CategorySlider";

// ✅ Lazy load heavy sections
const Testimonials = React.lazy(() =>
  import("../../components/Testimonials")
);
const ProductDetails = React.lazy(() =>
  import("../../components/ProductDetails")
);

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Premium Men's Fabrics | Khodiyar Fashion</title>
        <meta
          name="description"
          content="Shop premium men's fabrics – cotton, linen, and more. Best quality fabrics crafted for comfort & style. Free shipping & exclusive offers."
        />
        <meta
          name="keywords"
          content="men's fabric, cotton fabric, linen fabric, suit fabric, premium fabrics online"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jaykhodiyarfashion.in/" />

        <meta property="og:title" content="Premium Men's Fabrics | Khodiyar Fashion" />
        <meta property="og:description" content="Shop premium men's fabrics crafted for comfort & style." />
        <meta property="og:image" content="https://jaykhodiyarfashion.in/images/hero-banner.jpg" />
        <meta property="og:url" content="https://jaykhodiyarfashion.in/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Premium Men's Fabrics | Khodiyar Fashion" />
        <meta name="twitter:description" content="Shop premium men's fabrics crafted for comfort & style." />
        <meta name="twitter:image" content="https://jaykhodiyarfashion.in/images/hero-banner.jpg" />
      </Helmet>

      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org/",
          "@type": "Store",
          "name": "Khodiyar Fashion",
          "url": "https://jaykhodiyarfashion.in",
          "logo": "https://jaykhodiyarfashion.in/logo.png",
          "sameAs": [
            "https://www.facebook.com/",
            "https://www.instagram.com/",
            "https://twitter.com/"
          ],
          "description": "Premium men's fabrics – cotton, linen, and more. Stylish and durable fabrics for every occasion.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ahmedabad",
            "addressLocality": "Ahmedabad",
            "addressRegion": "GJ",
            "postalCode": "380001",
            "addressCountry": "IN"
          },
          "openingHours": "Mo-Sa 09:00-21:00"
        }
        `}
      </script>

      <Header />
        <HeroSection />

        <OfferSection />
        <CategorySlider />
        <ProductListing />

        <Suspense fallback={<div>Loading product details...</div>}>
          {/* <ProductDetails /> */}
        </Suspense>

        <ServiceSection />

        <Suspense fallback={<div>Loading testimonials...</div>}>
          <Testimonials />
        </Suspense>
      <Footer />
    </>
  );
};

export default Home;
