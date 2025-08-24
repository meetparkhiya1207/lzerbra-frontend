import React from 'react'
import Header from '../../comman/Header'
import HeroSection from '../../components/HeroSection'
import OfferSection from '../../components/OfferSection'
import ProductListing from '../../components/ProductListing'
import ProductDetails from '../../components/ProductDetails'

const Home = () => {
  return (
    <div>
      <Header/>
      <HeroSection/>
      {/* <OfferSection/> */}
      <ProductListing/>
      {/* <ProductDetails/> */}
    </div>
  )
}

export default Home
