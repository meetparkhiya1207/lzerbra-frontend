import React, { useEffect, useState } from 'react'
import Header from '../../comman/Header'
import HeroSection from '../../components/HeroSection'
import OfferSection from '../../components/OfferSection'
import ProductListing from '../../components/ProductListing'
import ProductDetails from '../../components/ProductDetails'
import ServiceSection from '../../components/ServiceSection'
import Footer from '../../comman/Footer'
import Testimonials from '../../components/Testimonials'
import CategorySlider from '../../components/CategorySlider'
import ProductDetailsComponents from '../../components/ProductDetailsPage'
import CartPageSimple from '../../comman/CartPage'
import socket from '../../socket'

const Home = () => {
  const [count, setCount] = useState(0);
  console.log("👥 Current Visitors on Website:", count);

  useEffect(() => {
    socket.on("liveCount", (num) => {
      setCount(num);
    });

    return () => {
      socket.off("liveCount");
    };
  }, []);
  return (
    <div>
      <HeroSection />
      {/* <CartPageSimple/> */}
      <OfferSection />
      <CategorySlider />
      <ProductListing />
      {/* <ProductDetailsComponents/> */}
      {/* <ProductDetails/> */}
      <ServiceSection />
      <Testimonials />
    </div>
  )
}

export default Home
