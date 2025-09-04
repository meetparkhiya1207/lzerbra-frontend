import React from 'react'
import Header from '../../comman/Header'
import HeroSection from '../../components/HeroSection'
import OfferSection from '../../components/OfferSection'
import ProductListing from '../../components/ProductListing'
import ProductDetails from '../../components/ProductDetails'
import ServiceSection from '../../components/ServiceSection'
import Footer from '../../comman/Footer'
import Testimonials from '../../components/Testimonials'
import CategorySlider from '../../components/CategorySlider'

const Home = () => {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <OfferSection/>
      <CategorySlider/>
      <ProductListing/>
      {/* <ProductDetails/> */}
      <ServiceSection/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}

export default Home
